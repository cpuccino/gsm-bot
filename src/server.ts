import 'reflect-metadata';

// import path from 'path';

// import { Client } from '@typeit/discord';
// import { GSM_BOT_TOKEN } from './configuration/environment';

// export async function main() {
//   const client = new Client();
//   await client.login(GSM_BOT_TOKEN, path.join(__dirname, 'discords', '*.[jt]s'));

//   console.log(Client.getCommands());
// }

// main();

import { Client } from '@typeit/discord';
import { GSM_BOT_TOKEN } from './configuration/environment';

export class Server {
  private static client: Client;

  static get Client(): Client {
    return this.client;
  }

  static start(): void {
    this.client = new Client();
    this.client.login(GSM_BOT_TOKEN, `${__dirname}/discords/*.[jt]s`);
    console.log(Client.getCommands());
  }
}

Server.start();
