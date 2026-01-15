#[derive(Debug)]
pub struct GpuError {
    kind: GpuErrorKind,
}

#[derive(Debug)]
enum GpuErrorKind {
    NotAvailable,
}

impl GpuError {
    pub(crate) fn not_available() -> Self {
        Self {
            kind: GpuErrorKind::NotAvailable,
        }
    }
}

impl std::fmt::Display for GpuError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self.kind {
            GpuErrorKind::NotAvailable => write!(f, "GPU not available"),
        }
    }
}

impl std::error::Error for GpuError {}
