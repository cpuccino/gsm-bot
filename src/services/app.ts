import path from 'path';

import { CommandMessage, CommandNotFound, Discord, Rule } from '@typeit/discord';

@Discord(Rule().startWith('> gsm').space(), {
  import: [
    path.join(__dirname, 'commands', '*.ts')
  ]
})
export abstract class DiscordApp {
  @CommandNotFound()
  commandNotFound(command: CommandMessage) {
    command.reply('Invalid command');
  }
}
