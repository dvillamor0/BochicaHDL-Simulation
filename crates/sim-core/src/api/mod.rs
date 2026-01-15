mod error;
pub use self::error::GpuError;

pub struct GpuContext {
    inner: crate::gpu::context::GpuContextImpl,
}

impl GpuContext {
    pub fn new() -> Result<Self, GpuError> {
        let inner = pollster::block_on(crate::gpu::context::GpuContextImpl::new_async())
            .map_err(|_| GpuError::not_available())?;

        Ok(Self { inner })
    }

    pub fn is_ready(&self) -> bool {
        self.inner.is_ready()
    }
}
