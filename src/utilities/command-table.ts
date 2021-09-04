import { Client } from '@typeit/discord';
import table from 'text-table';

export function generateCommandTable(): string {
  const columns = Client.getCommands().map(({ commandName, description }) => [
    commandName,
    description
  ]);
  return table([...columns]);
}
