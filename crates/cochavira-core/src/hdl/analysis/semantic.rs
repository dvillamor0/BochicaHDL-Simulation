use super::SemanticToken;

#[derive(Debug)]
pub(crate) struct SemanticResult {
    tokens: Vec<SemanticToken>,
}

impl SemanticResult {
    pub(crate) fn new(tokens: Vec<SemanticToken>) -> Self {
        Self { tokens }
    }

    pub(crate) fn tokens(&self) -> &[SemanticToken] {
        &self.tokens
    }
}
