import { SecretsManager } from 'aws-sdk';

interface ISecret {
  secretToken: string;
  secretTime: string;
}

const secretsManager = new SecretsManager({
    region: 'us-east-2'
})


export const getSecretKey = async (secretName: string): Promise<ISecret> => {
    try {
      const data = await secretsManager
        .getSecretValue({
          SecretId: secretName,
        })
        .promise();
      console.log("Secret manager OK")
      return JSON.parse(data.SecretString) as ISecret;
    } catch (error) {
      throw new Error(error);
    }
  }