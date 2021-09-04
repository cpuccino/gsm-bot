import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GSM_BOT_TOKEN) {
  throw 'GSM_BOT_TOKEN env required';
}

if (!process.env.GSM_SERVER_ID) {
  throw 'GSM_SERVER_ID env required';
}

if (!process.env.GSM_SERVER_MONITORING_PORT) {
  throw 'GSM_SERVER_MONITORING_PORT required';
}

export const GSM_BOT_TOKEN = process.env.GSM_BOT_TOKEN;
export const GSM_SERVER_ID = process.env.GSM_SERVER_ID;
export const GSM_SERVER_MONITORING_PORT = process.env.GSM_SERVER_MONITORING_PORT;
export const GSM_CHANNEL_IDS = (process.env.GSM_CHANNEL_IDS || '').split(',').map(id => id.trim());
export const PORT = process.env.PORT || 5679;
