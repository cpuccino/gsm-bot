import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { GSM_SERVER_ID } from '../../configuration/environment';

dotenv.config();

export async function start(): Promise<AWS.EC2.StartInstancesResult> {
  const ec2 = new AWS.EC2();
  const instances = await ec2
    .startInstances({
      InstanceIds: [GSM_SERVER_ID || '']
    })
    .promise();

  return instances;
}

export async function stop(): Promise<AWS.EC2.StopInstancesResult> {
  const ec2 = new AWS.EC2();
  const instances = await ec2
    .stopInstances({
      InstanceIds: [GSM_SERVER_ID || '']
    })
    .promise();

  return instances;
}

export async function info(): Promise<AWS.EC2.DescribeInstancesResult> {
  const ec2 = new AWS.EC2();
  const instances = await ec2
    .describeInstances({
      InstanceIds: [GSM_SERVER_ID || '']
    })
    .promise();

  return instances;
}
