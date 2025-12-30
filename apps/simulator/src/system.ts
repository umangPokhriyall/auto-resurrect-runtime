// system.ts

import { Sensor } from "./modules/sensor";
import { Processor } from "./modules/processor";
import { Transmitter } from "./modules/transmitter";

export class EmbeddedSystem {
    private sensor = new Sensor();
    private processor = new Processor();
    private transmitter = new Transmitter();

    start(): void {
        console.log("[SYSTEM] Starting embedded pipeline...");

        setInterval(() => {
            // 1. Read sensor
            const sensorData = this.sensor.read();

            // 2. Process data
            const processed = this.processor.process(sensorData);

            // 3. Transmit result
            this.transmitter.transmit(processed);

            // Telemetry (for later runtime)
            console.log(
                `[TELEMETRY] sensor_heartbeat=${this.sensor.heartbeat()}`
            );
        }, 1000);
    }
}
