use std::path::Path;
use sv_parser::{parse_sv, SyntaxTree};

use super::ast::SvAst;

/// Parsed SystemVerilog source (opaque)
pub(crate) struct SvSource {
    ast: SvAst,
}

impl SvSource {
    pub(crate) fn from_file(path: impl AsRef<Path>) -> Result<Self, String> {
        let syntax = parse_sv(path.as_ref())
            .map_err(|e| format!("SV parse error: {e:?}"))?;

        Ok(Self {
            ast: SvAst::new(syntax),
        })
    }

    pub(crate) fn ast(&self) -> &SvAst {
        &self.ast
    }
}
