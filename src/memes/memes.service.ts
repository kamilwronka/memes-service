import { Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';
import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import { v4 as uuid } from 'uuid';

const projectId = 'decent-line-296513';

const datastore = new Datastore({ projectId });
const storage = new Storage({ projectId });

@Injectable()
export class MemesService {
  async find() {
    const memesQuery = await datastore.createQuery('Memes');

    const memes = await datastore.runQuery(memesQuery);

    return memes[0];
  }

  async getPresignedUrl(name = 'meme') {
    const config: GetSignedUrlConfig = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: 'image/jpeg',
    };

    const uniqueId = uuid();

    const data = await storage
      .bucket('memes-dev')
      .file(`${name}/${uniqueId}.jpg`)
      .getSignedUrl(config);

    return data;
  }
}
