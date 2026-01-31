#[derive(Debug)]
pub enum EngineRequest {
    GetDeviceName,
    StepSimulation,
    AnalyzeSv(String),
}

#[derive(Debug)]
pub enum EngineResponse {
    DeviceName(String),
    Ok,
    Semantic(crate::api::SemanticResult),
    SemanticError,
    NotSupported,
}
