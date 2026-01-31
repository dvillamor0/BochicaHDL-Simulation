use sv_parser::SyntaxTree;

/// Internal wrapper over sv-parser AST
///
/// This type never leaves the HDL layer.
pub(crate) struct SvAst {
    syntax: SyntaxTree,
}

impl SvAst {
    pub(crate) fn new(syntax: SyntaxTree) -> Self {
        Self { syntax }
    }

    pub(crate) fn syntax(&self) -> &SyntaxTree {
        &self.syntax
    }
}
