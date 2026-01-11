import type { InvariantViolation, TelemetrySignal }
    from "shared-types/client";

export interface TelemetrySnapshot {
    now: number;
    heartbeatTs: number;
    latencyMs: number;
}

let backlogScore = 0;
const BACKLOG_DECAY = 0.8;


const INVARIANTS = {
    HEARTBEAT_MAX_GAP_MS: 2000,
    MAX_ALLOWED_LATENCY_MS: 500,
    MAX_BACKLOG_SCORE: 1500,
};

export function checkInvariants(
    telemetry: TelemetrySnapshot
): InvariantViolation[] {
    const violations: InvariantViolation[] = [];

    // Heartbeat Invariant 

    const heartbeatGap = telemetry.now - telemetry.heartbeatTs;

    if (heartbeatGap > INVARIANTS.HEARTBEAT_MAX_GAP_MS) {
        const signal: TelemetrySignal = {
            name: "processor.heartbeat_gap",
            value: heartbeatGap,
            timestamp: telemetry.now,
        };

        violations.push({
            invariantId: "HEARTBEAT_TIMEOUT",
            signal,
            expected: `< ${INVARIANTS.HEARTBEAT_MAX_GAP_MS}ms`,
            actual: heartbeatGap,
            timestamp: telemetry.now,
        });
    }

    // Latency Invariant 

    if (telemetry.latencyMs > INVARIANTS.MAX_ALLOWED_LATENCY_MS) {
        const signal: TelemetrySignal = {
            name: "processor.latency",
            value: telemetry.latencyMs,
            timestamp: telemetry.now,
        };

        violations.push({
            invariantId: "LATENCY_VIOLATION",
            signal,
            expected: `< ${INVARIANTS.MAX_ALLOWED_LATENCY_MS}ms`,
            actual: telemetry.latencyMs,
            timestamp: telemetry.now,
        });
    }

    // Backlog Growth Invariant
    backlogScore =
        backlogScore * BACKLOG_DECAY + telemetry.latencyMs;

    if (backlogScore > INVARIANTS.MAX_BACKLOG_SCORE) {
        const signal: TelemetrySignal = {
            name: "system.backlog_score",
            value: backlogScore,
            timestamp: telemetry.now,
        };

        violations.push({
            invariantId: "BACKLOG_GROWTH",
            signal,
            expected: `< ${INVARIANTS.MAX_BACKLOG_SCORE}`,
            actual: backlogScore,
            timestamp: telemetry.now,
        });
    }


    return violations;
}

export function resetBacklog() {
    backlogScore = 0;
}
