//! HDL layer
//!
//! Responsabilidad:
//! - Parsear HDL (SystemVerilog)
//! - Bajar a un IR propio estable
//! - No ejecutar, no simular

mod sv;
mod ir;
mod lower;

pub(crate) use sv::SvSource;
pub(crate) use ir::*;
pub(crate) use lower::*;
