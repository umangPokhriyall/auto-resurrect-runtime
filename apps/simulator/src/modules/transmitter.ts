// transmitter.ts

import type { ProcessedData } from "./processor";

export class Transmitter {
    transmit(data: ProcessedData): void {
        console.log(
            `[TRANSMITTER] Output=${data.processedValue}, latency=${data.latencyMs}ms`
        );
    }
}
