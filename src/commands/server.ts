import { Command, CommandMessage, Description, Guard, Infos } from '@typeit/discord';
import { instanceInfo, instanceStart, instanceStop } from '../aws/instance';
import { nonBotAuthor } from '../guards/author';

export abstract class Server {
  @Command()
  @Guard(nonBotAuthor)
  @Description('Start game server')
  async start(command: CommandMessage): Promise<void> {
    try {
      const instance = await instanceStart();

      if (!instance) {
        command.channel.send(`Game server not found`);
        return;
      }

      const { InstanceId, CurrentState, PreviousState } = instance;

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
  @Guard(nonBotAuthor)
  @Description('Stop game server')
  async stop(command: CommandMessage): Promise<void> {
    try {
      const instance = await instanceStop();

      if (!instance) {
        command.channel.send(`Game server not found`);
        return;
      }

      const { InstanceId, CurrentState, PreviousState } = instance;

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
  @Guard(nonBotAuthor)
  @Description('Fetch game server status')
  async status(command: CommandMessage): Promise<void> {
    try {
      const instance = await instanceInfo();

      if (!instance) {
        command.channel.send(`Game server not found`);
        return;
      }

      const { InstanceId, PublicIpAddress, State } = instance;

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