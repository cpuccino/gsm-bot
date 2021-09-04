import 'reflect-metadata';

import path from 'path';

import { Client } from '@typeit/discord';
import { GSM_BOT_TOKEN } from './configuration/environment';

export async function main() {
  const client = new Client();
  await client.login(GSM_BOT_TOKEN, path.join(__dirname, 'discords', '*.[jt]s'));

  console.log(Client.getCommands());
}

main();
