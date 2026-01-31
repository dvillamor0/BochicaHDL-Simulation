// Responsibilities: types for analysis layer (semantic spans exposed to kernel)
#[derive(Debug, Clone)]
pub(crate) struct SemanticToken {
    pub kind: String,
    pub span: (usize, usize),
}

#[derive(Debug)]
pub(crate) struct SemanticResult {
    pub tokens: Vec<SemanticToken>,
}
