# Decision Matrix

This document defines the **deterministic decision policy** used by
Auto-Resurrect Runtime.

All recovery actions are selected using **explicit rules**.
There is no learning, no probability, and no hidden behavior.

---

## 1. Decision Philosophy

**Design Principle: Determinism Over Optimization**

Auto-Resurrect Runtime follows three strict principles:

- **Classification before recovery**
- **Minimal intervention**
- **Stability over aggressiveness**

A recovery action must never be more disruptive than the fault it addresses.

---

## 2. Fault Signature → Action Mapping

Persistence reflects whether a fault has exceeded defined temporal thresholds.

| Fault Signature | Persistence | Recovery Action | Rationale |
|---------------|------------|-----------------|-----------|
| **THREAD_STALL** | Transient | Restart module | Likely recoverable execution stall |
| **THREAD_STALL** | Persistent | Degrade execution | Prevent repeated restart loops |
| **BACKLOG_PRESSURE** | Persistent | Reduce throughput / degrade | Stabilize system under sustained load |
| **LATENCY_DEGRADATION** | Persistent | Degrade execution | Preserve real-time guarantees |
| **UNKNOWN** | Any | No-op | Safety first — observe before acting |

*Degrade execution may include reduced throughput, bypassing non-critical logic,
or operating in a constrained mode.*

---

## 3. Why This Is Safe

- Actions are **bounded and deterministic**
- No global restarts are triggered
- No cascading recovery effects
- Recovery is applied only to the affected module

Persistent faults are emitted **once** to avoid oscillation
between restart and degrade actions.

---

## 4. What This Is Not

- ❌ No machine learning
- ❌ No heuristic guessing
- ❌ No probabilistic decisions
- ❌ No blind retries

All decisions are explainable by design.

---

## Summary

The decision matrix ensures that:
- Transient faults are handled quickly
- Persistent faults are handled conservatively
- System continuity is always prioritized

This deterministic policy is what allows Auto-Resurrect Runtime
to remain predictable under failure and load growth.
