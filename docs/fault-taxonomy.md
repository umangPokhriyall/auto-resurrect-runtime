# Fault Taxonomy

This document explains the **fault reasoning model** used by Auto-Resurrect Runtime.

The goal is to make failure handling:
- Deterministic
- Explainable
- Hardware-agnostic
- Reusable across domains

This taxonomy defines *how raw telemetry becomes a recovery action*.

---

## 1. Why a Fault Taxonomy Is Needed

Most systems treat failure as a binary event:
- alive / dead
- responding / not responding

This is insufficient for mission-critical systems where:
- Degradation precedes failure
- Partial faults are common
- Blind restarts amplify instability

Auto-Resurrect Runtime introduces a **layered fault model** that separates
observation, interpretation, and recovery.

---

## 2. Fault Reasoning Hierarchy

**Design Principle: Separate Observation from Interpretation**

The runtime reasons about failures using the following hierarchy:

| Layer | Meaning |
|-----|--------|
| **Invariant** | A property that must always hold |
| **Violation** | A single breach of an invariant |
| **Fault** | Repeated violation over time |
| **Signature** | Interpreted failure pattern |
| **Action** | Minimal corrective response |

Each layer adds *context*, not speculation.

---

## 3. Layer Definitions

### Invariant

An invariant is a **rule about correct system behavior**.

Examples:
- Latency must remain below a defined bound
- Heartbeat must be observed within a time window
- Backlog must not grow unbounded

Invariants are:
- Deterministic
- Stateless
- Evaluated locally

---

### Violation

A violation is a **single instance** where an invariant does not hold.

Important:
> **A violation is not a failure.**

Violations may occur due to:
- Temporary load spikes
- Scheduling jitter
- External disturbances

The system does not react immediately to violations.

---

### Fault

A fault is declared when **violations persist over time**.

Fault detection is based on:
- Repeated violations
- Count-based or window-based correlation
- Explicit persistence thresholds

Transient conditions are treated as violations that do not mature into faults.

Persistent faults indicate structural problems and are emitted once to prevent
recovery oscillations.

---

### Signature

A fault signature represents a **recognized failure pattern** formed by
one or more correlated faults.

Signatures may be formed from multiple invariant violations across time.

Signatures provide semantic meaning, such as:
- Thread stall
- Backlog pressure
- Degraded execution path

Signatures allow the system to reason about *why* something is failing,
not just *that* it is failing.

---

### Action

An action is the **minimal recovery step** required to stabilize the system.

Examples:
- Targeted module restart
- Graceful degradation
- Execution bypass
- No-op (observe only)

Key rule:
> Recovery must never be more disruptive than the fault itself.

---

## 4. Concrete Examples

### Example 1: Transient Latency Spike

- Latency exceeds threshold once
- Classified as a **violation**
- No fault emitted
- No recovery action taken

This prevents unnecessary restarts under bursty load.

---

### Example 2: Persistent Latency Violation

- Latency exceeds threshold repeatedly
- Violations persist beyond threshold
- Classified as a **persistent fault**

This indicates structural degradation.

---

### Example 3: Backlog Pressure

- Latency violations occur
- Backlog accumulates across cycles
- Violations correlate over time

Resulting signature:

BACKLOG_PRESSURE

Recovery:
- Graceful degradation instead of restart

This preserves system continuity under sustained load.

---

## 5. Hardware-Agnostic Design

The fault taxonomy is intentionally independent of:
- Programming language
- Operating system
- Hardware platform

This allows the same fault reasoning model to be applied to:
- Embedded systems
- Industrial controllers
- Edge devices
- Distributed subsystems


The `fault-models` package formalizes this taxonomy so that
domain-specific fault definitions can be added without changing
the runtime core.

---

## Summary

Auto-Resurrect Runtime does not react to raw signals.

It reasons through:

Invariant → Violation → Fault → Signature → Action

This structured taxonomy enables predictable, explainable,
and resilient recovery behavior — even under sustained load
and partial failure.
