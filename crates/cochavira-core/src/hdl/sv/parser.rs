use std::collections::HashMap;
use std::path::Path;
use sv_parser::{parse_sv, Define};
use crate::hdl::sv::SvAst;

pub(crate) struct SvSource {
    ast: SvAst,
}

impl SvSource {
    pub(crate) fn from_file(path: impl AsRef<Path>) -> Result<Self, String> {
        let pre_defines: HashMap<String, Option<Define>> = HashMap::new();
        let include_paths: &[&Path] = &[];

        let (syntax, _defines) = parse_sv(
            path.as_ref(),
            &pre_defines,
            include_paths,
            false,    // ignore_include: bool - 4to parámetro
            false,    // allow_incomplete: bool - 5to parámetro
        )
        .map_err(|e| e.to_string())?;

        let ast = SvAst::new(syntax);

        Ok(Self { ast })
    }

    pub(crate) fn ast(&self) -> &SvAst {
        &self.ast
    }
}