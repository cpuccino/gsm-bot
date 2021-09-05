import https from 'https';
import axios from 'axios';
import { Command, CommandMessage, Description, Guard } from '@typeit/discord';
import { SysInfo } from 'server-usage';
import { GSM_SERVER_MONITORING_PORT } from '../configuration/environment';
import { instanceInfo } from '../aws/instance';
import { nonBotAuthor } from '../guards/author';
import {
  generateCPULoadTable,
  generateDiskUsageTable,
  generateMemoryUsageTable
} from '../utilities/server-usage-table';
import { generateUptimeTable } from '../utilities/uptime-table';

export abstract class System {
  @Command()
  @Guard(nonBotAuthor)
  @Description('Fetch game server usage')
  async usage(command: CommandMessage): Promise<void> {
    try {
      const instance = await instanceInfo();

      if (!instance) {
        command.channel.send(`Game server not found`);
        return;
      }

      const { PublicIpAddress, State, InstanceType } = instance;

      if (State?.Name !== 'running') {
        command.channel.send(`Game server is not running`);
        return;
      }

      const { data } = await axios(`http://${PublicIpAddress}:${GSM_SERVER_MONITORING_PORT}/`, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      });

      const { cpuLoad, release, arch, sysname, diskUsage, memoryUsage, uptime } = data as SysInfo;

      const cpuLoadTable = generateCPULoadTable(cpuLoad);
      const memoryUsageTable = generateMemoryUsageTable(memoryUsage);
      const diskUsageTable = generateDiskUsageTable(diskUsage);
      const uptimeTable = generateUptimeTable(uptime, InstanceType);

      command.channel.send(`\`\`\`Sysname: ${sysname}\nArch: ${arch}\nKernel: ${release}\`\`\``);
      command.channel.send(`\`\`\`${cpuLoadTable}\`\`\``);
      command.channel.send(`\`\`\`${memoryUsageTable}\`\`\``);
      command.channel.send(`\`\`\`${diskUsageTable}\`\`\``);
      command.channel.send(`\`\`\`${uptimeTable}\`\`\``);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      command.channel.send(`Failed to fetch game server status`);
    }
  }
}
