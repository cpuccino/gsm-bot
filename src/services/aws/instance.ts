import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

export async function start() {
    const ec2 = new AWS.EC2();
    const instances = await ec2.startInstances({
        InstanceIds: [process.env.GSM_SERVER_ID || '']
    }).promise();

    return instances;
}

export async function stop() {
    const ec2 = new AWS.EC2();
    const instances = await ec2.stopInstances({
        InstanceIds: [process.env.GSM_SERVER_ID || '']
    }).promise();

    return instances;
}

export async function info() {
    const ec2 = new AWS.EC2();
    const instances = await ec2.describeInstances({
        InstanceIds: [process.env.GSM_SERVER_ID || '']
    }).promise();

    return instances;
}