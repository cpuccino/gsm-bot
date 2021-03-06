import { Client, Next, CommandMessage } from '@typeit/discord';

export async function nonBotAuthor(
  commands: CommandMessage[],
  client: Client,
  next: Next
): Promise<void> {
  if (client.user?.id === commands[0].author.id) return;
  await next();
}
