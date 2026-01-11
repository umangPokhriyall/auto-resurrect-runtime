
import type { FaultEvent, FaultSignature } from "shared-types/client";

export function matchSignature(
    faults: FaultEvent[]
): FaultSignature {
    const persistentProcessorStall = faults.some(
        f =>
            f.invariantId === "LATENCY_VIOLATION" &&
            f.source.includes("processor") &&
            f.nature === "PERSISTENT"
    );

    if (persistentProcessorStall) {
        return "THREAD_STALL";
    }

    return "UNKNOWN";
}

