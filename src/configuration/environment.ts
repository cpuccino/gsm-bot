import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GSM_BOT_TOKEN) {
  throw 'GSM_BOT_TOKEN env required';
}

export const GSM_BOT_TOKEN = process.env.GSM_BOT_TOKEN;