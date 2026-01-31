#[derive(Debug)]
pub struct SemanticToken {
    pub kind: String,
    pub span: (usize, usize),
}

#[derive(Debug)]
pub struct SemanticResult {
    pub tokens: Vec<SemanticToken>,
}

impl SemanticResult {
    pub fn new(tokens: Vec<SemanticToken>) -> Self {
        Self { tokens }
    }
}
