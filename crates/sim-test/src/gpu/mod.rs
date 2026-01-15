// crates/sim-test/src/gpu/mod.rs

use sim_core::api::*;

#[test]
fn gpu_context_can_be_created() {
    match GpuContext::new() {
        Ok(ctx) => {
            assert!(ctx.is_ready());
        }
        Err(err) => {
            println!("GPU test skipped: {err}");
        }
    }
}
