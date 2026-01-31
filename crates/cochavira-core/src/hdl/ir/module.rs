use super::{IrNet, IrNode};

/// HDL module in canonical IR form
#[derive(Debug)]
pub(crate) struct IrModule {
    name: String,
    nodes: Vec<IrNode>,
    nets: Vec<IrNet>,
}

impl IrModule {
    pub(crate) fn new(name: impl Into<String>) -> Self {
        Self {
            name: name.into(),
            nodes: Vec::new(),
            nets: Vec::new(),
        }
    }

    pub(crate) fn add_node(&mut self, node: IrNode) {
        self.nodes.push(node);
    }

    pub(crate) fn add_net(&mut self, net: IrNet) {
        self.nets.push(net);
    }
}
