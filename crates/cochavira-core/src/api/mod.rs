mod semantic;
pub use semantic::*;

use crate::kernel::router::KernelRouter;
use crate::model::simulation::Simulation;
pub use crate::kernel::syscall::*;

pub mod error;
pub use error::GpuError;

pub struct CochaviraEngine {
    kernel: KernelRouter,
    sim: Simulation,
}

impl CochaviraEngine {
    pub fn new_gpu() -> Result<Self, GpuError> {
        Ok(Self {
            kernel: KernelRouter::new_gpu()?,
            sim: Simulation::new(),
        })
    }

    pub fn request(&mut self, req: EngineRequest) -> EngineResponse {
        self.kernel.handle(&mut self.sim, req)
    }
}
