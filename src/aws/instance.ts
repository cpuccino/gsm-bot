import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { GSM_SERVER_ID } from '../configuration/environment';

dotenv.config();

export async function instanceStart(): Promise<AWS.EC2.InstanceStateChange | null> {
  const ec2 = new AWS.EC2();
  const { StartingInstances } = await ec2
    .startInstances({
      InstanceIds: [GSM_SERVER_ID || '']
    })
    .promise();

  return Array.isArray(StartingInstances) ? StartingInstances[0] : null;
}

export async function instanceStop(): Promise<AWS.EC2.InstanceStateChange | null> {
  const ec2 = new AWS.EC2();
  const { StoppingInstances } = await ec2
    .stopInstances({
      InstanceIds: [GSM_SERVER_ID || '']
    })
    .promise();

  return Array.isArray(StoppingInstances) ? StoppingInstances[0] : null;
}

export async function instanceInfo(): Promise<AWS.EC2.Instance | null> {
  const ec2 = new AWS.EC2();
  const { Reservations } = await ec2
    .describeInstances({
      InstanceIds: [GSM_SERVER_ID || '']
    })
    .promise();

  return Array.isArray(Reservations) && Array.isArray(Reservations[0].Instances)
    ? Reservations[0].Instances[0]
    : null;
}
