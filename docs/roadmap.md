# Roadmap & Planned Extensions

This document outlines how Auto-Resurrect Runtime evolves beyond the current prototype.

The separation between **what is implemented** and **what is planned** is intentional. This ensures clarity, avoids overclaiming, and reflects real-world engineering practice.

---

## 1. Near-Term Extensions (Post Round-2)

These improvements build directly on the current architecture and require no fundamental redesign.

### 1.1 Extended Fault Models

The `fault-models` package will be expanded to formalize common failure classes:

#### CPU Faults
- Execution stalls
- Priority inversion
- Thermal throttling (conceptual)

#### Memory Faults
- Leak patterns
- Allocation pressure
- Corruption indicators

#### I/O Faults
- Dropped messages
- Slow peripherals
- Silent failures

#### Network Faults
- Packet loss
- Reordering
- Partition detection

All fault models remain **hardware-agnostic** and reusable across domains.

---

### 1.2 Subsystem-Level Monitoring

- Multiple modules per subsystem
- Escalation from module → subsystem → system
- Aggregated fault signatures within a subsystem
- Localized recovery without global impact

This enables hierarchical fault reasoning while preserving isolation.

---

### 1.3 Enhanced Degradation Strategies

- Load shedding under sustained backlog pressure
- Reduced sampling or processing fidelity
- Dynamic feature disabling
- Time-bounded recovery attempts

Degradation is treated as a **controlled operating mode**, not a failure state.

---

## 2. Future / Research Directions

> **Scope Note:** These directions are exploratory and are documented to demonstrate architectural extensibility, not current capability.

These extensions are intentionally **documented but not implemented** in the current prototype. They represent research-grade or hardware-coupled work.

---

### 2.1 Distributed Self-Healing (Multi-Node)

- Multiple Auto-Resurrect runtimes per node or device
- Node-local invariant evaluation
- Lightweight coordination via control-plane signals
- Failure isolation across nodes

**No centralized coordinator is required.**

---

### 2.2 Control-Plane Coordination

- Gossip-based health summaries
- Fault signature propagation
- Consensus-free escalation decisions
- Bounded coordination latency

**The control plane remains advisory, not authoritative.** Final recovery decisions remain local.

This ensures:
- System autonomy
- No central bottleneck
- Deterministic behavior

---

### 2.3 Distributed Fault Signature Aggregation

- Correlation of signatures across nodes
- Detection of systemic or environmental degradation
- Region-level degradation instead of node-level reset

This enables resilience at scale without global restarts.

---

### 2.4 FPGA Partial Reconfiguration Mapping

Conceptual mapping between runtime logic and hardware behavior:

| Runtime Concept | FPGA Analogy |
|-----------------|--------------|
| Invariant check | Comparator logic |
| Fault signature | LUT pattern |
| Recovery action | Partial bitstream swap |
| Degradation | Bypass / reroute logic |

This aligns the runtime's reasoning model with reconfigurable hardware systems.

---

## 3. Why These Are Not Implemented Yet

- Hardware access is outside prototype scope
- Multi-node coordination requires deployment infrastructure
- Focus of this phase is **runtime intelligence**, not scale-out mechanics

Documenting these extensions demonstrates architectural foresight without compromising clarity or correctness.

---

## Summary

The current prototype establishes a **deterministic, fault-aware runtime core**.

The roadmap shows how this core:

- **Scales** across subsystems
- **Coordinates** across nodes
- **Maps naturally** to reconfigurable hardware

This separation between **implemented intelligence** and **planned expansion** is a deliberate engineering decision.

---

## Implementation Timeline (Estimated)

### Phase 1: Current Prototype (Completed)
- ✅ Core runtime architecture
- ✅ Deterministic invariant evaluation
- ✅ Fault signature matching
- ✅ Targeted recovery actions
- ✅ Persistence classification

### Phase 2: Near-Term Extensions (Next 3-6 months)
- 🔄 Extended fault models library
- 🔄 Subsystem-level monitoring
- 🔄 Enhanced degradation strategies
- 🔄 Improved fault taxonomy

### Phase 3: Research Directions (6-12 months)
- 🔮 Distributed self-healing
- 🔮 Control-plane coordination
- 🔮 Multi-node signature aggregation
- 🔮 Hardware mapping validation

### Phase 4: Production Hardening (12+ months)
- 🔮 Formal verification
- 🔮 Real hardware integration
- 🔮 Performance optimization
- 🔮 Industry-specific adaptations

---

## Contributing to the Roadmap

We welcome feedback and suggestions for future directions:

- Open an issue to propose new fault models
- Discuss scalability strategies in the discussions section
- Share use cases from your domain
- Contribute to the fault taxonomy

---

## References

- [`docs/architecture.md`](docs/architecture.md)  - System design principles
- [`docs/fault-taxonomy.md`](docs/fault-taxonomy.md) - Current fault classifications
- [`docs/decision-matrix.md`](docs/decision-matrix.md)  - Recovery action mappings
- [`docs/growth-and-failure.md`](docs/growth-and-failure.md) - Scaling strategies