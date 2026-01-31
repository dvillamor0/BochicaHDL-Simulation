/// Connection between IR nodes
#[derive(Debug)]
pub(crate) struct IrNet {
    from: usize,
    to: usize,
}

impl IrNet {
    pub(crate) fn new(from: usize, to: usize) -> Self {
        Self { from, to }
    }
}
