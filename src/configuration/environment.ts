import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GSM_BOT_TOKEN) {
  throw 'GSM_BOT_TOKEN env required';
}

if (!process.env.GSM_SERVER_ID) {
  throw 'GSM_SERVER_ID env required';
}

export const GSM_BOT_TOKEN = process.env.GSM_BOT_TOKEN;
export const GSM_SERVER_ID = process.env.GSM_SERVER_ID;