use super::context::GpuContextImpl;
use crate::api::GpuError;
use crate::model::simulation::Simulation;

pub(crate) struct GpuBackend {
    pub ctx: GpuContextImpl,
    device_name: String,
}

impl GpuBackend {
    pub fn new() -> Result<Self, GpuError> {
        let ctx = pollster::block_on(GpuContextImpl::new_async())
            .map_err(|_| GpuError::InitFailed)?;

        let name = ctx.adapter_info.name.clone();

        Ok(Self {
            ctx,
            device_name: name,
        })
    }

    pub fn solve(&mut self, _sim: &mut Simulation) {
        // TODO deterministic GPU compute pipeline
    }

    pub fn device_name(&self) -> &str {
        &self.device_name
    }
}
