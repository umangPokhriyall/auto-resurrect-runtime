// sensor.ts

export interface SensorOutput {
    value: number;
    timestamp: number;
}

export class Sensor {
    private lastHeartbeat: number = Date.now();

    read(): SensorOutput {
        this.lastHeartbeat = Date.now();

        return {
            value: Math.random() * 100, // dummy sensor value
            timestamp: Date.now(),
        };
    }

    heartbeat(): number {
        return this.lastHeartbeat;
    }
}
