use tree_sitter::Parser;
use tree_sitter::Language;
use tree_sitter_systemverilog::LANGUAGE;
use super::types::SemanticToken;

/// Produce tokens (kind, byte span) using the tree-sitter SystemVerilog grammar.
///
/// Returns Vec<SemanticToken> on success, String on error.
pub fn lex(code: &str) -> Result<Vec<SemanticToken>, String> {
    let mut parser = Parser::new();
    parser
    .set_language(&Language::from(LANGUAGE))
    .map_err(|e| format!("tree-sitter set_language error: {:?}", e))?;

    let tree = parser
        .parse(code, None)
        .ok_or_else(|| "tree-sitter parse failed".to_string())?;

    let root = tree.root_node();

    let mut out = Vec::new();
    collect_leaves(&root, code.as_bytes(), &mut out);

    // Sort by start byte to guarantee order for frontend
    out.sort_by_key(|t| t.span.0);

    Ok(out)
}

fn collect_leaves(node: &tree_sitter::Node, src: &[u8], out: &mut Vec<SemanticToken>) {
    if node.child_count() == 0 {
        if let Some(kind_str) = classify_node(node, src) {
            let start = node.start_byte();
            let end = node.end_byte();
            if end > start {
                out.push(SemanticToken {
                    kind: kind_str.to_string(),
                    span: (start as usize, end as usize),
                });
            }
        }
    } else {
        for i in 0..node.child_count() {
            if let Some(child) = node.child(i as u32) {
                collect_leaves(&child, src, out);
            }
        }
    }
}

/// Heuristic mapping from tree-sitter node.kind() to string token kinds that the JS
/// highlighter expects (e.g. "keyword", "identifier", "number", "string", "comment", "operator", "punctuation").
/// This is intentionally conservative: we return None for structural nodes.
fn classify_node(node: &tree_sitter::Node, src: &[u8]) -> Option<&'static str> {
    let kind = node.kind();

    // identifiers: puede ser "identifier", "simple_identifier", "escaped_identifier", etc.
    if kind.contains("identifier") {
        return Some("identifier");
    }

    // numbers: grammar variants may include "number", "decimal_number", etc.
    if kind.contains("number") {
        return Some("number");
    }

    if kind.contains("string") {
        return Some("string");
    }

    if kind.contains("comment") {
        return Some("comment");
    }

    // punctuation / operators are usually single-char tokens (not named),
    // try to read the text and check for keyword / operator / punctuation.
    if let Ok(text) = node.utf8_text(src) {
        // small keyword set — extend as needed
        const KEYWORDS: &[&str] = &[
            "module", "endmodule", "wire", "reg", "logic", "assign", "always", "begin", "end",
            "input", "output", "inout", "parameter", "localparam", "integer", "real", "time",
            "and", "or", "not", "nand", "nor", "xor", "xnor", "if", "else", "for", "while",
            "case", "endcase", "default", "posedge", "negedge", "initial", "forever", "repeat",
            "task", "endtask", "function", "endfunction", "package", "endpackage",
            "interface", "endinterface", "modport", "typedef", "struct", "endstruct", "union",
            "endunion", "enum", "import", "export", "genvar", "generate", "endgenerate",
        ];

        if KEYWORDS.contains(&text) {
            return Some("keyword");
        }

        // single-char punctuation
        if text.chars().all(|c| c.is_ascii_punctuation()) {
            // separate punctuation vs operator by characters
            let punct_chars = "(){}[];,:.#@";
            let operator_chars = "=+-*/%&|^~!<>?";
            
            if text.chars().all(|c| punct_chars.contains(c)) {
                return Some("punctuation");
            } else if text.chars().all(|c| operator_chars.contains(c)) {
                return Some("operator");
            } else {
                return Some("punctuation"); // fallback
            }
        }
    }

    None
}
