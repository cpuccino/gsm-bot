import path from 'path';

import { Client, CommandMessage, CommandNotFound, Discord } from '@typeit/discord';
import { Message } from 'discord.js';

@Discord('!', {
  import: [
    path.join(__dirname, './commands', '*.ts')
  ]
})
export abstract class DiscordApp {
  @CommandNotFound()
  commandNotFound(command: CommandMessage) {
    command.reply('Invalid command');
  }
}
