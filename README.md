# Bochica

**A Verilog Interpreter for GPU-Accelerated Photonic Hardware Design and Simulation**

## Overview

This project implements a complete software platform for the **design, simulation, and analysis of photonic hardware**, using **Verilog** as a high-level hardware description language and a **GPU-accelerated physical and logical simulation engine**.

The system translates Verilog descriptions into **photonic circuit structures**, allowing explicit definition of **material properties**, **laser source parameters**, and **geometric configurations**. Simulations model both logical behavior and relevant physical effects in the photonic domain.

The platform supports the creation and validation of **fully programmable photonic hardware**, including combinational circuits, sequential circuits, complete photonic CPUs, and photonic FPGAs.

---

## Purpose

The primary purpose of this project is to provide a unified workflow to:

- Interpret **Verilog HDL** in a photonic computing context
- Generate coherent physical and logical photonic models
- Execute high-complexity simulations using **massively parallel GPU computation**
- Visualize and analyze simulation results interactively
- Support research and development of programmable photonic hardware

---

## System Architecture

The system is composed of two main components: a **simulation backend** and a **visualization frontend**, with a strict separation of responsibilities.

```
[ Verilog HDL ]
      ↓
[ HDL Interpreter ]
      ↓
[ Photonic Intermediate Model ]
      ↓
[ Physical & Logical Simulation (GPU) ]
      ↓
[ Structured Results ]
      ↓
[ Desktop Application ]
```

---

## cochavira: Interpretation and Simulation

### Implementation

The backend is implemented in **Rust**, providing memory safety, explicit concurrency control, and high performance.

### Responsibilities

- Verilog interpretation
- Photonic topology generation
- Material and optical source modeling
- Physical and logical simulation
- Large-scale mathematical computation on the GPU
- Data preparation for visualization

### GPU Computing

The simulation engine uses **wgpu** to execute compute shaders in **headless mode**, without reliance on graphics rendering pipelines.

---

## Suamox: Visualization and Control

### Implementation

The frontend is delivered as a **desktop application** built with **Tauri**, using web technologies for the user interface.

### Responsibilities

- 2D, 2.5D, and 3D visualization of photonic circuits
- Layer-based inspection
- Editing of physical properties and simulation parameters
- Simulation control and execution management
- Analysis of simulation outputs

The frontend performs no heavy computation and acts strictly as a visualization and interaction layer.

---

## Design Principles

### Strict Separation

- Backend: all computation and simulation
- Frontend: interaction and visualization
- Communication via explicit and well-defined interfaces

### Performance and Scalability

- GPU-optimized simulation pipeline
- Efficient use of computational resources
- Responsive and stable user interface during long simulations

---

## System Capabilities

- Definition of photonic material properties
- Configuration of laser sources (frequency, power, phase)
- Optical propagation simulation
- Logical behavior evaluation
- Design and simulation of:

  - photonic combinational circuits
  - photonic sequential circuits
  - complete photonic CPUs
  - photonic FPGAs

---

## Use Cases

- Photonic computing research
- Experimental photonic hardware design
- Validation of programmable photonic architectures
- Integrated physical-logical simulation
- Academic research and advanced prototyping

---

## Project Status

The project is under **active development**.

Currently implemented:

- Core system architecture and module boundaries
- Verilog interpretation pipeline
- Photonic intermediate representation
- GPU-accelerated simulation backend (headless)
- Encapsulated public API
- External test infrastructure

Work in progress:

- Extended physical models and material libraries
- Advanced simulation scenarios
- Desktop application UI integration
- Visualization and interaction workflows

## License

This project is released under the **MIT License** and is intended to be used, modified, and extended as an **open-source research and development platform**.

---

## Scope and Future Work

This project establishes a solid foundation for the development of **photonic hardware design tools**, enabling future extensions such as automated optimization, advanced physical synthesis, and large-scale architectural exploration.
