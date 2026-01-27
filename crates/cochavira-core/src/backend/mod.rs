pub(crate) mod gpu;
// TODO pub(crate) mod cpu;

pub(crate) enum Backend {
    Gpu(gpu::backend::GpuBackend),
    //TODO Cpu(cpu::backend::CpuBackend),
}
