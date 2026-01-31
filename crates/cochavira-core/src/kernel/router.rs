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
            EngineRequest::AnalyzeSv(source) => {
                match crate::hdl::analyze_sv(&source) {
                    Ok(res) => {
                        let tokens = res.tokens.into_iter().map(|t| {
                            crate::api::SemanticToken {
                                kind: t.kind.to_string(),
                                span: (t.span.0, t.span.1),
                            }
                        }).collect();

                        EngineResponse::Semantic(
                            crate::api::SemanticResult { tokens }
                        )
                    }
                    Err(_) => EngineResponse::SemanticError,
                }
            }
        }
    }
}
