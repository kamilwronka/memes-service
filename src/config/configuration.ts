import { Logger } from '@nestjs/common';
import { getSecretValue } from 'src/utils/getSecret.util';

const projectId = process.env.PROJECT_ID;

let config = null;

export default () => {
  return config;
};

export const initializeConfig = async () => {
  config = {
    port: parseInt(process.env.PORT, 10) || 4000,
    project: {
      projectId,
    },
    storage: {
      bucketName: await getSecretValue('memes-service-bucket-name', projectId),
    },
    datastore: {
      memesKind: await getSecretValue(
        'memes-service-datastore-kind',
        projectId,
      ),
      memesKindTemp: await getSecretValue(
        'memes-service-datastore-kind-temp',
        projectId,
      ),
    },
    isGlobal: true,
  };

  Logger.log('Config initialized');
};
