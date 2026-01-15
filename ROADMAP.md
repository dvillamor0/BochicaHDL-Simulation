# Roadmap

This roadmap defines the planned evolution of the project with the primary goal of delivering a **fully functional, physically faithful photonic hardware simulator** suitable for experimental and academic use.
Development is driven by **physical accuracy, configurability, and usability**, rather than feature count.

---

## v0.1-alpha — Functional Photonic Verilog Simulator

### Primary Goal

Deliver a **fully usable desktop application** that allows users to:

- Write and simulate **basic but complete Verilog designs**
- Configure **physically accurate photonic parameters**
- Run **GPU-accelerated simulations**
- Visualize **2D optical signal propagation**
- Iterate designs prior to laboratory fabrication

This version must work end-to-end.

---

### Verilog Support (Alpha Scope)

#### Combinational Logic

- `module` / `endmodule`
- `input`, `output`, `wire`, `reg`
- `assign`
- `always @(*)`
- Arithmetic and logical operators
- Module instantiation
- Parameterized modules

Supported designs include:

- half adders
- full adders
- multiplexers
- comparators

#### Sequential Logic

- `always @(posedge clk)`
- registers
- flip-flops
- synchronous and asynchronous reset
- counters
- basic finite state machines

---

### Input and Test Definition

- Text-based Verilog editor inside the application
- Text-based definition of test stimuli
- Explicit clock and reset definition
- Clear syntax and semantic error reporting

---

### Photonic Physical Model (Core Requirement)

All physical parameters must be **explicitly defined and configurable**.

#### Material Properties

- refractive index
- loss coefficients
- dispersion parameters
- optional anisotropy

#### Photonic Waveguides

- length
- width
- curvature
- spacing
- coupling coefficients

#### Optical Source (Laser)

- wavelength
- power
- phase
- coherence

#### Environment

- temperature effects (when applicable)
- noise sources
- fabrication tolerances

No implicit defaults are allowed without being visible to the user.

---

### Simulation Engine

#### Requirements

- GPU-accelerated simulation using compute shaders
- Headless execution
- Deterministic and reproducible results
- Explicit modeling of:

  - propagation delays
  - interference
  - attenuation
  - phase evolution

#### Priorities

1. Physical fidelity
2. Configurability
3. Numerical stability
4. Performance

---

### Visualization (2D)

#### Alpha Visualization Features

- 2D layout of photonic waveguides
- Real-time visualization of optical signal propagation
- Color/intensity mapping for optical power and phase
- Layer-based visibility control
- Time-step playback and inspection

Visualization is analytical, not decorative.

---

### User Interface

#### Goals

- Minimal friction for experimentation
- Fast iteration of designs and parameters
- Clear feedback during simulation

#### Features

- Text editor for Verilog and test cases
- Parameter panels for physical configuration
- Simulation controls (run, pause, reset)
- Technical logs and diagnostics

---

### Packaging and Distribution

- Desktop application built with Tauri
- Distribution formats:

  - `.AppImage` (Linux)
  - `.exe` (Windows)

- No external runtime dependencies required

---

### Testing (Mandatory)

#### Logical Tests

- half adder
- full adder
- flip-flop
- counter

#### Simulation Tests

- determinism across runs
- sensitivity to physical parameters
- regression tests for known behaviors

#### GPU Tests

- automatic detection of GPU availability
- graceful skipping when unavailable

---

### Exit Criteria for v0.1-alpha

v0.1-alpha is considered complete when:

- A full adder can be written in Verilog
- Physical parameters can be modified
- The simulation runs on the GPU
- Optical propagation is visible in 2D
- The application can be distributed as a desktop binary

---

## v0.2 — Physical Validation and Stability

### Goals

- Improve physical accuracy
- Validate models against simplified analytical cases
- Improve numerical robustness

### Scope

- Refined material and propagation models
- Stability under parameter extremes
- Improved simulation diagnostics
- Validation test suites

---

## v0.3 — Workflow and Usability Improvements

### Goals

- Improve experimental workflow
- Reduce iteration time

### Scope

- Preset configurations
- Parameter sweep support
- Simulation comparison tools
- Improved visualization controls

---

## v0.4 — Advanced Architectures

### Goals

- Enable larger and more complex designs

### Scope

- Photonic FPGA fabrics
- Photonic CPU building blocks
- Reconfigurable interconnects
- Large-scale simulation support

---

## Long-Term Vision

The long-term objective is to establish this project as a **reference platform for physically faithful photonic hardware simulation**, enabling researchers to design, test, and validate photonic computing systems prior to physical fabrication.
