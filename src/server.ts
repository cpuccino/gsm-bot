import 'reflect-metadata';
import path from 'path';

import express from 'express';
import { Client } from '@typeit/discord';
import { PORT, GSM_BOT_TOKEN } from './configuration/environment';

async function main() {
  const app = express();

  const client = new Client();
  await client.login(GSM_BOT_TOKEN, path.join(__dirname, 'discords', '*.[jt]s'));
  console.log('Initializing discord client', Client.getCommands());
  
  app.get('/', (_, res) => res.status(200).json({ message: 'GSM Discord Bot' }));

  app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
}

main();