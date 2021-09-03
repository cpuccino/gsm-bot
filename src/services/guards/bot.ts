import { Client, Next, CommandMessage } from '@typeit/discord';

export async function skipBot(commands: CommandMessage[], client: Client, next: Next) {
  if (client.user?.id === commands[0].author.id) return;
  await next();
}
