use crate::backend::Backend;
use crate::model::simulation::Simulation;
pub(crate) mod router;
pub(crate) mod semantics;
pub(crate) mod syscall;
pub(crate) mod scheduler;
pub(crate) mod topology;


pub(crate) struct Kernel {
    backend: Backend,
}

impl Kernel {
    pub fn new_gpu() -> Result<Self, crate::api::GpuError> {
        let gpu = crate::backend::gpu::backend::GpuBackend::new()?;
        Ok(Self {
            backend: Backend::Gpu(gpu),
        })
    }

    pub fn step(&mut self, sim: &mut Simulation) {
        match &mut self.backend {
            Backend::Gpu(b) => b.solve(sim),
        }
    }

    pub fn device_name(&self) -> &str {
        match &self.backend {
            Backend::Gpu(b) => b.device_name(),
        }
    }
}
