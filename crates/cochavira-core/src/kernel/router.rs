use super::Kernel;
use super::syscall::*;
use crate::model::simulation::Simulation;

pub(crate) struct KernelRouter {
    kernel: Kernel,
}

impl KernelRouter {
    pub fn new_gpu() -> Result<Self, crate::api::GpuError> {
        Ok(Self {
            kernel: Kernel::new_gpu()?,
        })
    }

    pub fn handle(
        &mut self,
        sim: &mut Simulation,
        req: EngineRequest,
    ) -> EngineResponse {
        match req {
            EngineRequest::GetDeviceName => {
                EngineResponse::DeviceName(self.kernel.device_name().to_string())
            }
            EngineRequest::StepSimulation => {
                self.kernel.step(sim);
                EngineResponse::Ok
            }
        }
    }
}
