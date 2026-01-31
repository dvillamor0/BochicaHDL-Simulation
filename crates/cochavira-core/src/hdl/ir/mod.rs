//! HDL Intermediate Representation (IR)
//!
//! Responsabilidad:
//! - Representación estable
//! - Independiente de SystemVerilog

mod module;
mod net;
mod node;

pub(crate) use module::IrModule;
pub(crate) use net::IrNet;
pub(crate) use node::IrNode;
