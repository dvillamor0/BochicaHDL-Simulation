#[repr(u32)]
#[derive(Debug, Clone, Copy)]
pub enum GpuError {
    NotAvailable = 1,
    InitFailed = 2,
}

impl std::fmt::Display for GpuError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            GpuError::NotAvailable => write!(f, "GPU not available"),
            GpuError::InitFailed => write!(f, "GPU init failed"),
        }
    }
}

impl std::error::Error for GpuError {}
