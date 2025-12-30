// fault.ts

// Where the fault originated
export type FaultSource =
    | "sensor"
    | "processor"
    | "transmitter"
    | "system"
    | "runtime";

// Severity is important for decision priority
export type FaultSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

// Atomic fault event emitted by detection engine
export interface FaultEvent {
    id: string;               // unique id
    type: string;             // e.g. HEARTBEAT_TIMEOUT, LATENCY_VIOLATION
    source: FaultSource;      // which module
    severity: FaultSeverity;
    timestamp: number;        // epoch ms
    details?: Record<string, any>; // optional diagnostic data
}

// Higher-level interpreted fault pattern
export interface FaultSignature {
    name: string;             // e.g. PROCESSOR_STALL
    contributingFaults: FaultEvent[];
    confidence: number;       // 0.0 – 1.0 (rule-based, not ML)
}
