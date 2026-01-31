
#[derive(Debug, Clone, PartialEq, Eq)]
pub(crate) enum SemanticTokenKind {
    Keyword,
    Identifier,
    Number,
    String,
    Operator,
    Comment,
    Type,
    Module,
    Port,
    Unknown,
}

#[derive(Debug, Clone)]
pub(crate) struct SemanticToken {
    pub(crate) kind: SemanticTokenKind,
    pub(crate) span: (usize, usize),
}

impl SemanticToken {
    pub(crate) fn new(
        kind: SemanticTokenKind,
        start: usize,
        end: usize,
    ) -> Self {
        Self {
            kind,
            span: (start, end),
        }
    }
}
