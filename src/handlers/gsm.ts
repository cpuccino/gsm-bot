import path from 'path';

import { Client } from '@typeit/discord';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { GSM_BOT_TOKEN } from '../configuration/environment';
import { AsyncLambdaResponse } from '../utilities/response';

const client = new Client();

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<AsyncLambdaResponse> {
  client.login(GSM_BOT_TOKEN, path.join(__dirname, '..', 'discords', '*.ts'));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Discord event received'
    })
  };
}
