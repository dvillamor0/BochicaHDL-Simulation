use wgpu::*;

pub(crate) struct GpuContextImpl {
    instance: Instance,
    adapter: Adapter,
    device: Device,
    queue: Queue,
}

impl GpuContextImpl {
    pub(crate) async fn new_async() -> Result<Self, ()> {
        // Crear instancia (Vulkan / Metal / DX12 / GL)
        let instance = Instance::new(InstanceDescriptor {
            backends: Backends::PRIMARY,
            flags: InstanceFlags::default(),
            gles_minor_version: Gles3MinorVersion::Automatic,
            dx12_shader_compiler: Default::default(),
        });


        // Elegir adaptador (GPU física si existe)
        let adapter = instance
            .request_adapter(&RequestAdapterOptions {
                power_preference: PowerPreference::HighPerformance,
                compatible_surface: None, // headless
                force_fallback_adapter: false,
            })
            .await
            .ok_or(())?;

        // Pedir device + queue
        let (device, queue) = adapter
            .request_device(
                &DeviceDescriptor {
                    label: Some("sim-core device"),
                    required_features: Features::empty(),
                    required_limits: Limits::default(),
                },
                None,
            )
            .await
            .map_err(|_| ())?;

        Ok(Self {
            instance,
            adapter,
            device,
            queue,
        })
    }

    pub(crate) fn is_ready(&self) -> bool {
        true
    }
}