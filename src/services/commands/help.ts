import { Client, Command, CommandMessage, Description } from '@typeit/discord';
import table from 'text-table';

function generateCommandTable(): string {
  const columns = Client.getCommands().map(({ commandName, description }) => [commandName, description]);
  return table([...columns]);
}

export abstract class Help {
  @Command()
  @Description('Show commands')
  async commands(command: CommandMessage): Promise<void> {
    const commandTable = generateCommandTable();
    command.channel.send(`\`\`\`${commandTable}\`\`\``);
  }
}
