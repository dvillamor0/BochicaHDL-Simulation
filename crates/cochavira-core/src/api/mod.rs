use crate::kernel::router::KernelRouter;
pub use crate::kernel::syscall::*;
use crate::model::simulation::Simulation;
pub use crate::hdl::analysis::analyze_sv;
pub mod error;
pub use error::GpuError;

pub struct CochaviraEngine {
    kernel: KernelRouter,
    sim: Simulation,
}

impl CochaviraEngine {
    pub fn new_gpu() -> Result<Self, crate::api::GpuError> {
        Ok(Self {
            kernel: KernelRouter::new_gpu()?,
            sim: Simulation::new(),
        })
    }

    pub fn request(&mut self, req: EngineRequest) -> EngineResponse {
        self.kernel.handle(&mut self.sim, req)
    }
}
