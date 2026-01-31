//! SystemVerilog frontend
//!
//! Responsabilidad:
//! - Encapsular sv-parser
//! - No exponer AST externo

mod parser;
mod ast;

pub(crate) use parser::SvSource;
pub(crate) use ast::SvAst;
