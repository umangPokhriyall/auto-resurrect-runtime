
import type { FaultEvent, FaultSignature } from "shared-types/client";

export function matchSignature(
    faults: FaultEvent[]
): FaultSignature {

    const backlogPressure = faults.some(
        f =>
            f.invariantId === "BACKLOG_GROWTH" &&
            f.nature === "PERSISTENT"
    );

    if (backlogPressure) {
        console.log(
            "[SIGNATURE] BACKLOG_PRESSURE → system under sustained load growth"
        );
        return "BACKLOG_PRESSURE";
    }


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
