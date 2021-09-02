import { Client } from '@typeit/discord';
import { GSM_BOT_TOKEN } from './configuration/environment';

export class Server {
  private static client: Client;

  static get Client(): Client {
    return this.client;
  }

  static start() {
    this.client = new Client();
    this.client.login(GSM_BOT_TOKEN, `${__dirname}/services/*.[jt]s`);
    console.log(Client.getCommands());
  }
}

Server.start();
