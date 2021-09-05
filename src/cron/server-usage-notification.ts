import https from 'https';
import axios from 'axios';
import cron from 'node-cron';
import { Client } from '@typeit/discord';
import { GSM_CHANNEL_IDS, GSM_SERVER_MONITORING_PORT } from '../configuration/environment';
import { TextChannel } from 'discord.js';
import { instanceInfo } from '../aws/instance';
import { SysInfo } from 'server-usage';
import { generateUptimeTable } from '../utilities/uptime-table';

export async function scheduleServerUsageNotifications(client: Client): Promise<void> {
  cron.schedule('*/30 * * * *', async () => {
    const instance = await instanceInfo();

    if (!instance) return;

    const { PublicIpAddress, State, InstanceId, InstanceType } = instance;

    if (State?.Name !== 'running') return;

    const { data } = await axios(`http://${PublicIpAddress}:${GSM_SERVER_MONITORING_PORT}/`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });

    const { uptime } = data as SysInfo;
    const uptimeTable = generateUptimeTable(uptime, InstanceType);

    const channels = await Promise.all(GSM_CHANNEL_IDS.map(id => client.channels.fetch(id)));
    await Promise.all(
      channels.map(async c =>
        (c as TextChannel).send(
          `\`\`\`\nInstance ID: ${InstanceId}\nInstance Type: ${InstanceType}\nIP Address: ${
            PublicIpAddress || 'N/A'
          }\n\n${uptimeTable}\`\`\``
        )
      )
    );
  });
}
