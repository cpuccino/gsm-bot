import path from 'path';

import { CommandMessage, CommandNotFound, Discord } from '@typeit/discord';

@Discord('>>', {
  import: [
    path.join(__dirname, 'commands', '*.ts'),
  ]
})
export abstract class DiscordApp {
  @CommandNotFound()
  commandNotFound(command: CommandMessage) {
    command.reply('Invalid command');
  }
}
