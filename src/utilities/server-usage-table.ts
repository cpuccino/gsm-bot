import table from 'text-table';
import { CpuLoad, DiskUsage, MemoryUsage } from 'server-usage';

export function generateCPULoadTable(cpuLoad: CpuLoad[]): string {
  const header = ['Process', 'Usage', 'Idle'];
  const columns = cpuLoad.map(
    ({ name, usage, idle }: { name: string; usage: number; idle: number }) => [
      name !== 'all' ? `core#${name}` : name,
      `${usage}%`,
      `${idle}%`
    ]
  );

  return table([header, ...columns]);
}

export function generateMemoryUsageTable(memoryUsage: MemoryUsage): string {
  const header = ['Total', 'Free', 'Used'];
  const columns = [[memoryUsage.total, memoryUsage.free, memoryUsage.used]];

  return table([header, ...columns]);
}

export function generateDiskUsageTable(diskUsage: DiskUsage[]): string {
  const header = ['Partition', 'Type', 'Size', 'Available', 'Used'];
  const columns = diskUsage.map(disk => [
    disk.partition,
    disk.type,
    disk.size,
    disk.available,
    disk.used
  ]);

  return table([header, ...columns]);
}
