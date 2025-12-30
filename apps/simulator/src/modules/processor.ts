// processor.ts

import type { SensorOutput } from "./sensor";

export interface ProcessedData {
    processedValue: number;
    latencyMs: number;
}

export class Processor {
    process(input: SensorOutput): ProcessedData {
        const start = Date.now();

        // Dummy computation
        const processedValue = input.value * 2;

        const end = Date.now();

        return {
            processedValue,
            latencyMs: end - start,
        };
    }
}
