import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const secretManagerClient = new SecretManagerServiceClient();

export const getSecretValue = async (
  name: string,
  projectId: string,
): Promise<string> => {
  let secret: any;
  try {
    [secret] = await secretManagerClient.accessSecretVersion({
      name: `projects/${projectId}/secrets/${name}/versions/latest`,
    });
  } catch (error) {
    throw new Error('Unable to get secret');
  }

  return secret.payload.data.toString();
};
