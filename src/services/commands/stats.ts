import https from 'https';
import axios from 'axios';
import { Command, CommandMessage, Description, Guard } from '@typeit/discord';
import { GSM_SERVER_MONITORING_PORT } from '../../configuration/environment';
import { info } from '../aws/instance';
import { skipBot } from '../guards/bot';
import table from 'text-table';
import { CpuLoad, DiskUsage, MemoryUsage, SysInfo } from 'server-usage';

function generateCPULoadTable(cpuLoad: CpuLoad[]) {
  const header = ['Process', 'Usage', 'Idle'];
  const columns = cpuLoad.map(({ name, usage, idle }: { name: string; usage: number; idle: number }) =>
    [name !== 'all' ? `core#${name}` : name, `${usage}%`, `${idle}%`]
  );

  return table([ header, ...columns ]);
}

function generateMemoryUsageTable(memoryUsage: MemoryUsage) {
  const header = ['Total', 'Free', 'Used'];
  const columns = [[memoryUsage.total, memoryUsage.free, memoryUsage.used]];

  return table([ header, ...columns ]);
}

function generateDiskUsageTable(diskUsage: DiskUsage[]) {
  const header = ['Partition','Type', 'Size', 'Available', 'Used'];
  const columns = diskUsage.map(disk =>
    [disk.partition, disk.type, disk.size, disk.available, disk.used]
  );

  return table([ header, ...columns ]);
}

export abstract class Stats {
  @Command()
  @Guard(skipBot)
  @Description('Fetch game server usage')
  async stats(command: CommandMessage) {
    try {
      const instances = await info();

      if (!instances.Reservations?.length || !instances.Reservations[0].Instances?.length) {
        command.channel.send(`Game server not found`);
        return;
      }

      const { PublicIpAddress: publicIpAddress, State: state } =
        instances.Reservations[0]?.Instances[0];

      if (state?.Name !== 'running') {
        command.channel.send(`Game server is not running`);
        return;
      }

      const { data } = await axios(`http://${publicIpAddress}:${GSM_SERVER_MONITORING_PORT}/`, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      });

      const { cpuLoad, release, arch, diskUsage, memoryUsage } = data as SysInfo;

      const cpuLoadTable = generateCPULoadTable(cpuLoad);
      const memoryUsageTable = generateMemoryUsageTable(memoryUsage);
      const diskUsageTable = generateDiskUsageTable(diskUsage);

      command.channel.send(`\`\`\`Arch: ${arch}\nKernel: ${release}\`\`\``, { allowedMentions: undefined, disableMentions: 'everyone' });
      command.channel.send(`\`\`\`${cpuLoadTable.toString()}\`\`\``);
      command.channel.send(`\`\`\`${memoryUsageTable.toString()}\`\`\``);
      command.channel.send(`\`\`\`${diskUsageTable.toString()}\`\`\``);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      command.channel.send(`Failed to fetch game server status`);
    }
  }
}
