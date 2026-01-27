use wgpu::*;

pub struct GpuContextImpl {
    pub device: Device,
    pub queue: Queue,
    pub adapter_info: wgpu::AdapterInfo,
}


impl GpuContextImpl {
    pub async fn new_async() -> Result<Self, ()> {
        let instance = Instance::new(InstanceDescriptor::default());

    let adapter = instance
        .request_adapter(&RequestAdapterOptions {
            power_preference: PowerPreference::HighPerformance,
            compatible_surface: None,
            force_fallback_adapter: false,
        })
        .await
        .ok_or(())?;

    let (device, queue) = adapter
        .request_device(
            &DeviceDescriptor {
                label: None,
                required_features: Features::empty(),
                required_limits: Limits::default(),
            },
            None,
        )
        .await
        .map_err(|_| ())?;
        let adapter_info = adapter.get_info();
        Ok(Self { device, queue, adapter_info })
    }
}


