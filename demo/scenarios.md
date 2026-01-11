# Demo Scenarios

This document describes the fault scenarios demonstrated using the `apps/simulator` prototype and what observers (judges) should expect to see.

The demo focuses on **observable system behavior and reasoning**, not UI polish.

---

## Scenario 1: Processor Stall (Persistent Fault)

### Description

The processor module experiences a sustained execution stall, simulating a thread deadlock or CPU starvation condition.

The fault is injected manually using the built-in fault injector.

---

### Fault Injection

```text
FaultInjector.injectFault("PROCESSOR_STALL")
```

---

### Observed Behavior

1. System operates normally at startup
2. Processor begins stalling during execution
3. Processing latency increases sharply
4. Invariant violations are detected:
   - `LATENCY_VIOLATION`
5. Violations persist across multiple cycles
6. Fault persistence is detected
7. Fault signature is matched:
   - `THREAD_STALL` or `BACKLOG_PRESSURE`
8. Decision engine selects a recovery action
9. Processor enters safe / degraded mode
10. Latency stabilizes and execution continues

---

### Key Logs Observed

```text
[VIOLATION] [ "LATENCY_VIOLATION", "BACKLOG_GROWTH" ]
[SIGNATURE] BACKLOG_PRESSURE (PERSISTENT)
[ACTION] Degrading processor
[PROCESSOR] Entering safe mode
```

---

### Why This Matters

✔ No full system restart  
✔ No recovery oscillation  
✔ Persistent fault handled once  
✔ System continuity preserved

**This demonstrates persistence-aware recovery instead of blind resets.**

---

## Scenario 2: Load Growth & Backlog Pressure

### Description

Sustained processing delays cause backlog accumulation, representing growth-induced pressure rather than a single failure.

---

### Observed Behavior

1. Short-lived latency spikes are tolerated
2. Backlog accumulates across processing cycles
3. Persistent backlog growth is detected
4. System degrades capacity instead of restarting
5. Throughput stabilizes under reduced load

---

### Interpretation

This scenario demonstrates how the runtime:

- **Treats growth as a behavioral signal**
- **Distinguishes overload from failure**
- **Adapts execution instead of crashing**

---

## What Judges Should Notice

- Clear **cause → reasoning → recovery** flow
- Deterministic and explainable decisions
- No manual intervention required
- No system-wide restart

**This aligns with the core design goal: runtime intelligence over brute-force recovery.**

---

## Additional Scenarios (Future Extensions)

### Scenario 3: Cascading Module Failures (Planned)

Multiple modules fail in sequence, testing the runtime's ability to isolate failures and prevent system-wide collapse.

### Scenario 4: Transient vs Persistent Fault Classification (Planned)

Demonstrates how the runtime distinguishes between temporary glitches (ignore/tolerate) and persistent degradation (intervene).

### Scenario 5: Graceful Degradation Under Resource Exhaustion (Planned)

Shows how the system reduces functionality while maintaining critical operations when resources become constrained.

---

## Running the Scenarios

See `demo/how-to-run.md` for detailed instructions on executing these scenarios.

---

## Notes for Observers

- All behavior is **observable via console logs**
- Logs are intentionally **verbose for clarity**
- The focus is on **reasoning**, not reaction
- Each scenario demonstrates **deterministic decision-making**

---

## Scenario Validation Checklist

For each scenario, verify:

- [ ] Fault is detected accurately
- [ ] Violations are correlated correctly
- [ ] Persistence is classified appropriately
- [ ] Recovery action matches fault signature
- [ ] System continues operation without restart
- [ ] No recovery oscillation occurs
- [ ] Logs clearly show reasoning chain

---

## Summary

These scenarios demonstrate that Auto-Resurrect Runtime:

1. **Observes** system behavior through telemetry
2. **Detects** invariant violations deterministically
3. **Classifies** fault persistence and severity
4. **Decides** on minimal recovery actions
5. **Recovers** without full system restart
6. **Continues** operation with preserved context

This is **intelligent supervision**, not blind reaction.