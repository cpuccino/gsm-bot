import path from 'path';

import { CommandMessage, CommandNotFound, Discord, Rule } from '@typeit/discord';
import { generateCommandTable } from '../utilities/command-table';

@Discord(Rule().startWith('> gsm').space(), {
  import: [path.join(__dirname, '..', 'commands', '*.[jt]s')]
})
export abstract class Gsm {
  @CommandNotFound()
  commandNotFound(command: CommandMessage): void {
    const commandTable = generateCommandTable();
    command.channel.send(`Invalid command`);
    command.channel.send(`\`\`\`${commandTable}\`\`\``);
  }
}
