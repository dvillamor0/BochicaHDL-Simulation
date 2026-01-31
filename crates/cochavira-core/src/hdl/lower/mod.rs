//! HDL lowering passes
//!
//! Responsabilidad:
//! - Convertir SvAst → IR
//! - Resolver símbolos
//! - Elaborar jerarquía

mod resolve;
mod elaboration;

pub(crate) use resolve::resolve_symbols;
pub(crate) use elaboration::elaborate;
