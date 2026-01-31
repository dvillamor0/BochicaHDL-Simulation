use super::lexer;
use super::types::SemanticResult;

/// Public API for the HDL analysis layer used by the kernel.
/// Returns SemanticResult with .tokens on success or Err(String).
pub(crate) fn analyze_sv(source: &str) -> Result<SemanticResult, String> {
    let tokens = lexer::lex(source)?;
    Ok(SemanticResult { tokens })
}
