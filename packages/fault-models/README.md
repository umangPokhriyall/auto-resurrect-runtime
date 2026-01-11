
# Fault Models

This package defines **formal, hardware-agnostic fault semantics** used by
Auto-Resurrect Runtime.

Its purpose is not execution, but **shared understanding, classification,
and reasoning**.

---

## Purpose

Fault models describe *what a fault represents*, not *how it is repaired*.

They act as a semantic bridge between:

- Low-level invariant violations
- Interpreted fault signatures
- Deterministic recovery decisions

---

## Why This Package Exists

In safety-critical systems:

- Fault definitions must be explicit
- Semantics must be shared across components
- Detection and recovery must be explainable

This package provides that common vocabulary.

---

## Fault Categories

### CPU Faults (`cpu.ts`)

Examples:
- Execution stalls
- Priority inversion
- Starvation
- Thermal throttling (conceptual)

Derived from:
- Latency invariants
- Heartbeat gaps

---

### Memory Faults (`memory.ts`)

Examples:
- Allocation pressure
- Memory leaks
- Corruption indicators

Derived from:
- Growth patterns
- Consistency invariants

---

### I/O Faults (`io.ts`)

Examples:
- Silent failures
- Slow peripherals
- Dropped messages

Derived from:
- Missing signals
- Timeout violations

---

### Network Faults (`network.ts`)

Examples:
- Packet loss
- Message reordering
- Network partitioning

Derived from:
- Communication invariants
- Throughput degradation

---

## Integration Status

- Fault models are **conceptual in the current prototype**
- `runtime-core` reasons using generic fault signatures
- Domain-specific models will be integrated incrementally

This separation is intentional to keep the prototype:
- Deterministic
- Focused
- Easy to reason about

---

## Design Philosophy

- Hardware-agnostic
- Domain-independent
- Deterministic
- Explainable
- Reusable across embedded, industrial, and defence systems

---

## Summary

This package defines the **fault vocabulary** of Auto-Resurrect Runtime.

Even when not fully executed, explicit fault semantics are essential for:

- Safety
- Explainability
- Long-term system evolution
