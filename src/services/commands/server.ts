import { Command, CommandMessage, Description, Guard, Infos } from '@typeit/discord';
import { info, start, stop } from '../aws/instance';
import { skipBot } from '../guards/bot';

export abstract class Server {
  @Command()
  @Guard(skipBot)
  @Description('Start game server')
  @Infos({ admin: true })
  async start(command: CommandMessage) {
    try {
      const instances = await start();

      if (!instances.StartingInstances?.length) {
        command.reply(`Game server not found`);
        return;
      }

      const { InstanceId, CurrentState, PreviousState } = instances.StartingInstances[0];

      command.reply(
        `\`\`\`# Starting game server\ninstance_id: ${InstanceId}\ncurrent_state: ${CurrentState?.Name || 'N/A'}\nprevious_state: ${PreviousState?.Name || 'N/A'}\`\`\``
      );
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      command.reply(`Failed to start game server`);
    }
  }

  @Command()
  @Guard(skipBot)
  @Description('Stop game server')
  @Infos({ admin: true })
  async stop(command: CommandMessage) {
    try {
      const instances = await stop();

      if (!instances.StoppingInstances?.length) {
        command.reply(`Game server not found`);
        return;
      }

      const { InstanceId, CurrentState, PreviousState } = instances.StoppingInstances[0];

      command.reply(
        `\`\`\`# Stopping game server\ninstance_id: ${InstanceId}\ncurrent_state: ${CurrentState?.Name || 'N/A'}\nprevious_state: ${PreviousState?.Name || 'N/A'}\`\`\``
      );
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      command.reply(`Failed to stop game server`);
    }
  }

  @Command()
  @Guard(skipBot)
  @Description('Start game server')
  async info(command: CommandMessage) {
    try {
      const instances = await info();
   
      if (!instances.Reservations?.length || !instances.Reservations[0].Instances?.length) {
        command.reply(`Game server not found`);
        return;
      }
  
      const { InstanceId, PublicIpAddress, State } = instances.Reservations[0]?.Instances[0];
  
      command.reply(
        `\`\`\`# Fetching game server info\ninstance id: ${InstanceId}\nip address: ${PublicIpAddress || 'N/A'}\nstate: ${State?.Name}\n\`\`\``
      );
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      command.reply(`Failed to fetch game server info`);
    }
  }
}
