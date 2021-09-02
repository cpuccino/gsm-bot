import dotenv from 'dotenv';
import { Client } from '@typeit/discord';

dotenv.config();

export class Main {
  private static client: Client;

  static get Client(): Client {
    return this.client;
  }

  static start() {
    this.client = new Client();

    if (!process.env.GSM_BOT_TOKEN) {
      throw 'GSM_BOT_TOKEN env required';
    }

    this.client.login(
      process.env.GSM_BOT_TOKEN, 
      `${__dirname}/services/*.[jt]s`
    );

    console.log(Client.getCommands());
  }
}

Main.start();
