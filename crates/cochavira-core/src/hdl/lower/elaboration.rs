use crate::hdl::ir::IrModule;
use crate::hdl::sv::SvAst;

/// Elaboration pass
///
/// Transforms resolved SV AST into canonical IR
pub(crate) fn elaborate(_ast: &SvAst) -> Result<IrModule, String> {
    // Placeholder: instantiate modules, flatten hierarchy
    Ok(IrModule::new("top"))
}
