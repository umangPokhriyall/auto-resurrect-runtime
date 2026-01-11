
import type { InvariantViolation, FaultEvent } from "shared-types/client";

const FAULT_THRESHOLD = 2;
const PERSISTENT_THRESHOLD = 3;

const activeFaults = new Map<
    string,
    FaultEvent & { emittedPersistent?: boolean }
>();

export function detectFaults(
    violations: InvariantViolation[],
    now: number
): FaultEvent[] {
    const emitted: FaultEvent[] = [];

    for (const v of violations) {
        const key = `${v.invariantId}:${v.signal.name}`;

        let fault = activeFaults.get(key);

        if (!fault) {
            activeFaults.set(key, {
                id: key,
                invariantId: v.invariantId,
                source: v.signal.name,
                severity: "MEDIUM",
                firstSeen: now,
                lastSeen: now,
                count: 1,
                emittedPersistent: false,
            });
            continue;
        }

        fault.lastSeen = now;
        fault.count += 1;

        // TRANSIENT: do nothing
        if (fault.count < PERSISTENT_THRESHOLD) {
            continue;
        }

        // PERSISTENT: emit ONCE
        if (!fault.emittedPersistent) {
            fault.nature = "PERSISTENT";
            fault.emittedPersistent = true;

            emitted.push({
                id: fault.id,
                invariantId: fault.invariantId,
                source: fault.source,
                severity: fault.severity,
                firstSeen: fault.firstSeen,
                lastSeen: fault.lastSeen,
                count: fault.count,
                nature: "PERSISTENT",
            });
        }
    }

    return emitted;
}

