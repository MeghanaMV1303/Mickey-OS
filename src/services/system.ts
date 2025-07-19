/**
 * @fileoverview A mock service for fetching system status.
 * In a real application, this would interact with actual system monitoring tools.
 */

export type SystemStatus = {
  cpuUsage: number;
  memoryUsage: {
    used: number;
    total: number;
  };
  diskUsage: {
    used: number;
    total: number;
  };
  battery: {
    level: number;
    isCharging: boolean;
  };
};

/**
 * Simulates fetching the current system status.
 * @returns A promise that resolves to the current system status.
 */
export async function getSystemStatus(): Promise<SystemStatus> {
  // These are random values to simulate real-time data.
  const cpuUsage = Math.floor(Math.random() * 100);
  const memoryUsed = Math.floor(Math.random() * 28) + 4; // 4-32 GB
  const memoryTotal = 32;
  const diskUsed = Math.floor(Math.random() * 300) + 100; // 100-400 GB
  const diskTotal = 1000;
  const batteryLevel = Math.floor(Math.random() * 100);
  const isCharging = batteryLevel < 95 && Math.random() > 0.5;

  return {
    cpuUsage,
    memoryUsage: {
      used: memoryUsed,
      total: memoryTotal,
    },
    diskUsage: {
      used: diskUsed,
      total: diskTotal,
    },
    battery: {
      level: batteryLevel,
      isCharging: isCharging,
    },
  };
}
