use super::{SemanticResult, SemanticToken, SemanticTokenKind};

use sv_parser::{parse_sv, unwrap_node, SyntaxTree};

pub(crate) fn analyze_sv(source: &str) -> Result<SemanticResult, String> {
    let syntax = parse(source)?;
    let mut tokens = Vec::new();

    collect_tokens(&syntax, &mut tokens);

    Ok(SemanticResult::new(tokens))
}

fn parse(source: &str) -> Result<SyntaxTree, String> {
    parse_sv(source)
        .map_err(|e| format!("sv parse error: {:?}", e))
}

fn collect_tokens(tree: &SyntaxTree, out: &mut Vec<SemanticToken>) {
    for node in tree {
        visit_node(node, out);
    }
}

fn visit_node(node: &sv_parser::Node, out: &mut Vec<SemanticToken>) {
    let node = unwrap_node(node);

    if let Some(token) = map_node_to_token(node) {
        out.push(token);
    }

    for child in node.children() {
        visit_node(child, out);
    }
}

fn map_node_to_token(
    node: &sv_parser::SyntaxNode,
) -> Option<SemanticToken> {
    let span = node.span();

    let kind = match node.kind().as_str() {
        "module_declaration" => SemanticTokenKind::Module,
        "identifier" => SemanticTokenKind::Identifier,
        "keyword" => SemanticTokenKind::Keyword,
        "number" => SemanticTokenKind::Number,
        "string_literal" => SemanticTokenKind::String,
        "comment" => SemanticTokenKind::Comment,
        "net_port_type" | "data_type" => SemanticTokenKind::Type,
        _ => SemanticTokenKind::Unknown,
    };

    Some(SemanticToken::new(
        kind,
        span.start,
        span.end,
    ))
}
