// invariant.ts

// Value produced by system telemetry
export interface TelemetrySignal {
    name: string;           // e.g. "processor.heartbeat"
    value: number;
    timestamp: number;
}

// Result of an invariant check
export interface InvariantViolation {
    invariantId: string;
    signal: TelemetrySignal;
    expected: string;       // human-readable rule
    actual: number;
    timestamp: number;
}

// Invariant definition (rule)
export interface Invariant {
    id: string;
    description: string;

    // Evaluate a single telemetry signal or window
    evaluate(signal: TelemetrySignal): boolean;

    // Optional: explain failure (used for diagnostics)
    explain?(signal: TelemetrySignal): string;
}
