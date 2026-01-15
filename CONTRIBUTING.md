# Contributing Guide

Thank you for your interest in contributing to this project.
This document defines the **technical, architectural, and procedural rules** required to ensure long-term scalability, correctness, and maintainability.

Contributions that do not follow these rules may be rejected, even if they work functionally.

---

## Project Philosophy

This project is designed as a **long-term, research-grade, open-source tool**.

Key principles:

- Correctness over convenience
- Explicit architecture over implicit behavior
- Separation of concerns at all levels
- Deterministic behavior
- Reproducibility
- Scalability of both code and contributors

---

## Architecture Rules (MANDATORY)

### 1. Strict Layer Separation

The project is divided into clearly defined layers:

- **Core / Backend**

  - Verilog interpretation
  - Photonic intermediate representation
  - Physical and logical simulation
  - GPU computation

- **API Layer**

  - Public, stable interface
  - No implementation details exposed

- **Frontend**

  - Visualization and interaction only
  - No simulation logic
  - No heavy computation

❌ Cross-layer dependencies are not allowed
❌ Frontend logic must never leak into the backend
❌ GPU code must never depend on UI state

---

### 2. Public API Rules

- All public types must be exposed **only** through the API layer
- Internal modules must remain private
- Public APIs must be:

  - Minimal
  - Explicit
  - Forward-compatible

- Breaking changes require discussion and justification

---

## Rust Coding Standards

### General

- Rust edition: **latest stable**
- No unsafe code unless strictly required and documented
- No global mutable state
- Explicit ownership and lifetimes preferred over shared mutability

### Error Handling

- No `unwrap()` or `expect()` in library code
- Errors must be:

  - Typed
  - Meaningful
  - Propagated explicitly

- User-facing errors must be recoverable where possible

---

## GPU and Simulation Rules

- GPU code must run in **headless mode**
- No rendering APIs in the simulation backend
- All GPU computation must be:

  - Deterministic
  - Reproducible
  - Isolated from UI concerns

- Compute shaders must be documented with:

  - Input assumptions
  - Output guarantees
  - Numerical stability notes

---

## Verilog and HDL Rules

- Verilog interpretation must be:

  - Deterministic
  - Specification-driven
  - Independent of simulation backend

- Extensions to the language must:

  - Be explicitly documented
  - Avoid breaking standard Verilog semantics

- No implicit behavior or magic defaults

---

## Testing Requirements (NON-NEGOTIABLE)

### Test Types

All contributions must include appropriate tests:

1. **Unit Tests**

   - Small, deterministic
   - No GPU required unless explicitly testing GPU logic

2. **Integration Tests**

   - API-level tests
   - Validate behavior across modules

3. **Simulation Tests**

   - Validate physical and logical correctness
   - Must be reproducible across runs

---

### Test Rules

- Tests must be:

  - Deterministic
  - Isolated
  - Independent of execution order

- GPU tests must:

  - Gracefully skip if hardware is unavailable
  - Never fail due to missing GPU support

- No flaky tests are allowed

Run all tests with:

```bash
cargo test --workspace
```

---

## Code Style and Formatting

- `rustfmt` is mandatory
- `clippy` warnings must be addressed
- No unused code, imports, or dead modules
- Meaningful names over short names

---

## Documentation Requirements

Every contribution must include:

- Inline documentation for public items
- Clear comments for non-obvious logic
- Updates to relevant documentation files when behavior changes

Public-facing changes without documentation will not be accepted.

---

## Commit Guidelines

- Commits must be small and focused
- One logical change per commit
- Clear, descriptive commit messages

Recommended format:

```
<module>: <short description>

Detailed explanation if necessary.
```

---

## Pull Request Process

1. Fork the repository
2. Create a feature or fix branch
3. Ensure all tests pass
4. Ensure formatting and linting are clean
5. Open a pull request with:

   - Clear description
   - Motivation
   - Testing strategy
   - Any architectural impact

Pull requests may be rejected if they introduce:

- Architectural violations
- Undocumented behavior
- Performance regressions
- Unnecessary complexity

---

## Backward Compatibility

- The public API is treated as a contract
- Breaking changes require:

  - Strong justification
  - Documentation
  - Version bump

---

## Scope of Contributions

### Encouraged

- Simulation accuracy improvements
- Performance optimizations
- Physical model extensions
- Verilog feature support
- Testing and validation
- Documentation improvements

### Discouraged

- UI redesign without architectural discussion
- Experimental features without tests
- Large refactors without prior agreement

---

## Licensing

By contributing, you agree that your contributions will be licensed under the **MIT License**, consistent with the rest of the project.

---

## Final Note

This project prioritizes **correctness, clarity, and long-term maintainability** over rapid iteration.

If you are unsure whether a contribution fits the project direction, open an issue before submitting a pull request.
