/// Computational or logical element in the IR
#[derive(Debug)]
pub(crate) struct IrNode {
    id: usize,
}

impl IrNode {
    pub(crate) fn new(id: usize) -> Self {
        Self { id }
    }
}
