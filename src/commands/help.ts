import { Command, CommandMessage, Description } from '@typeit/discord';
import { generateCommandTable } from '../utilities/command-table';

export abstract class Help {
  @Command()
  @Description('Show commands')
  async commands(command: CommandMessage): Promise<void> {
    const commandTable = generateCommandTable();
    command.channel.send(`\`\`\`${commandTable}\`\`\``);
  }
}
