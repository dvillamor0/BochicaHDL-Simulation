# Bochica

**A research platform for Verilog-based photonic hardware modeling and GPU-accelerated simulation**

---

## Overview

Bochica is an experimental software platform for **designing, simulating, and analyzing photonic hardware** using **Verilog** as a high-level description language and a **GPU-accelerated simulation backend**.

The project explores how digital hardware description languages can be extended to **photonic computing architectures**, enabling structured experimentation with optical devices, materials, and circuit topologies.

Verilog descriptions are translated into **photonic circuit representations**, combining logical abstractions with simplified physical modeling.

---

## Purpose

This project is research-oriented and aims to:

- Explore **Verilog as a front-end for photonic hardware modeling**
- Build an intermediate representation for **photonic circuit structures**
- Implement a **scalable GPU-based simulation kernel**
- Provide tools for visualization and interaction with photonic designs
- Enable experimentation with **programmable photonic architectures**

Bochica is **not intended to replace professional EDA tools**, but to serve as a **research and prototyping framework**.

---

## System Architecture

Bochica follows a layered architecture with strict separation of concerns:

```
[ Verilog HDL ]
↓
[ HDL Interpreter ]
↓
[ Photonic Intermediate Model ]
↓
[ Physical & Logical Simulation Kernel (GPU) ]
↓
[ Structured Results / API ]
↓
[ Desktop Visualization Client ]
```

---

## cochavira: Core Interpretation and Simulation

### Implementation

The backend is implemented in **Rust**, focusing on:

- memory safety  
- deterministic architecture boundaries  
- explicit APIs between layers  

### Responsibilities

- Verilog parsing and interpretation  
- Photonic topology and structure modeling  
- Material and optical source abstractions  
- Logical and simplified physical simulation  
- GPU compute execution via **wgpu**  
- Data serialization for external consumers  

### GPU Computing

The simulation kernel uses **wgpu in compute mode**, running headless without graphics pipelines.  
Backends are **feature-gated**, allowing future CPU or alternative accelerator implementations.

---

## Suamox: Visualization and Control Layer

### Implementation

The visualization layer is implemented as a **Tauri-based desktop application**, using web technologies for UI.

### Responsibilities

- Visualization of photonic circuits (2D / 2.5D / 3D)  
- Layer inspection and parameter editing  
- Simulation control and orchestration  
- Interactive analysis of simulation outputs  

All heavy computation remains in the backend; the frontend is intentionally lightweight.

---

## Design Principles

### Layered Architecture

- **API layer**: stable external interface  
- **Kernel layer**: routing and execution semantics  
- **Backend layer**: hardware-specific drivers (GPU, future CPU)  
- **Model layer**: mathematical and geometric representations  

### Black-Box Engine Philosophy

The engine exposes **request/response APIs**, not internal structures.  
Consumers (tests, UI, external tools) interact through **explicit syscall-like APIs**.

### Research-Oriented Modularity

- Feature-gated backends  
- Minimal coupling between layers  
- Deterministic and inspectable architecture  

---

## Current Capabilities

- Verilog-based circuit description  
- Photonic intermediate representation  
- GPU compute backend (headless)  
- Public request/response engine API  
- Structured test infrastructure  
- Modular Rust crate architecture  

---

## Intended Use Cases

- Academic research in photonic computing  
- Experimental hardware architecture design  
- Simulation of hybrid logical–physical systems  
- Prototyping of photonic CPUs / FPGAs concepts  
- Teaching and exploration of photonic computation models  

---

## Project Status

**Early research-stage project.**

Implemented:

- Layered core architecture (`api`, `kernel`, `backend`, `model`)  
- Kernel router and syscall-like engine interface  
- GPU backend abstraction  
- Verilog interpretation pipeline (baseline)  
- External test harness  

In progress:

- Extended physical optical models  
- Numerical solvers and PDE kernels  
- Material and device libraries  
- Visualization workflows in Suamox  
- Documentation and reproducible experiments  

---
## License

This project is released under the **MIT License** and is intended to be used, modified, and extended as an **open-source research and development platform**.

---

## Scope and Future Work

This project establishes a solid foundation for the development of **photonic hardware design tools**, enabling future extensions such as automated optimization, advanced physical synthesis, and large-scale architectural exploration.