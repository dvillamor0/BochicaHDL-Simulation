#[derive(Debug)]
pub enum EngineRequest {
    GetDeviceName,
    StepSimulation,
}

#[derive(Debug)]
pub enum EngineResponse {
    DeviceName(String),
    Ok,
    Error(String),
}
