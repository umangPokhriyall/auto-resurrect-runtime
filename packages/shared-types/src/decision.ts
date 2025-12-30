// decision.ts

import type { FaultSignature } from "./fault";

// Allowed recovery actions
export type RecoveryActionType =
    | "RESTART_MODULE"
    | "ISOLATE_MODULE"
    | "SWITCH_REDUNDANT_PATH"
    | "DEGRADE_MODE"
    | "NO_ACTION";

// What the decision engine outputs
export interface RecoveryDecision {
    action: RecoveryActionType;
    target: string;              // module name or system
    reason: string;              // human-readable justification
    signature: FaultSignature;
    priority: number;            // higher = executed first
    timestamp: number;
}
