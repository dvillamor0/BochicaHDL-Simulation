use cochavira_core::api::CochaviraEngine;
use cochavira_core::api::*;

#[test]
fn gpu_device_name() {
    let mut engine = CochaviraEngine::new_gpu().unwrap();

    match engine.request(EngineRequest::GetDeviceName) {
        EngineResponse::DeviceName(n) => println!("GPU = {n}"),
        _ => panic!("unexpected"),
    }
}
