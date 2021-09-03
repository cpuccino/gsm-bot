import { Command, CommandMessage, Description, Guard, Infos } from '@typeit/discord';
import { info, start, stop } from '../aws/instance';
import { skipBot } from '../guards/bot';

export abstract class Server {
  @Command()
  @Guard(skipBot)
  @Description('Start game server')
  @Infos({ admin: true })
  async start(command: CommandMessage): Promise<void> {
    try {
      const instances = await start();

      if (!instances.StartingInstances?.length) {
        command.channel.send(`Game server not found`);
        return;
      }

      const { InstanceId, CurrentState, PreviousState } = instances.StartingInstances[0];

      command.channel.send(
        `\`\`\`# Starting game server\ninstance_id: ${InstanceId}\ncurrent_state: ${
          CurrentState?.Name || 'N/A'
        }\nprevious_state: ${PreviousState?.Name || 'N/A'}\`\`\``
      );
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      command.channel.send(`Failed to start game server`);
    }
  }

  @Command()
  @Guard(skipBot)
  @Description('Stop game server')
  @Infos({ admin: true })
  async stop(command: CommandMessage): Promise<void> {
    try {
      const instances = await stop();

      if (!instances.StoppingInstances?.length) {
        command.channel.send(`Game server not found`);
        return;
      }

      const { InstanceId, CurrentState, PreviousState } = instances.StoppingInstances[0];

      command.channel.send(
        `\`\`\`# Stopping game server\ninstance_id: ${InstanceId}\ncurrent_state: ${
          CurrentState?.Name || 'N/A'
        }\nprevious_state: ${PreviousState?.Name || 'N/A'}\`\`\``
      );
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      command.channel.send(`Failed to stop game server`);
    }
  }

  @Command()
  @Guard(skipBot)
  @Description('Fetch game server status')
  async status(command: CommandMessage): Promise<void> {
    try {
      const instances = await info();

      if (!instances.Reservations?.length || !instances.Reservations[0].Instances?.length) {
        command.channel.send(`Game server not found`);
        return;
      }

      const { InstanceId, PublicIpAddress, State } = instances.Reservations[0]?.Instances[0];

      command.channel.send(
        `\`\`\`# Fetching game server info\ninstance id: ${InstanceId}\nip address: ${
          PublicIpAddress || 'N/A'
        }\nstate: ${State?.Name}\n\`\`\``
      );
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      command.channel.send(`Failed to fetch game server info`);
    }
  }
}
