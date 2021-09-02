import { Command, CommandMessage, Description } from '@typeit/discord';

export abstract class Hello {
  @Command()
  @Description('Introducing myself')
  async hello(command: CommandMessage) {
    command.reply('Hello World');
  }
}