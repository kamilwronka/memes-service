import { Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';
import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import { v4 as uuid } from 'uuid';
import { GetPresignedUrlDto } from './dto/getPresignedUrl.dto';
import { ConfigService } from '@nestjs/config';
import { GetMemesQueryDto } from './dto/getMemesQuery.dto';
import { CreateMemeDto } from './dto/createMeme.dto';

const projectId = 'decent-line-296513';

const datastore = new Datastore({ projectId });
const storage = new Storage({ projectId });

@Injectable()
export class MemesService {
  datastore: Datastore;
  storage: Storage;
  memesKind: string;
  memesKindTemp: string;
  memesBucket: string;

  constructor(private configService: ConfigService) {
    this.datastore = new Datastore({
      projectId: this.configService.get<string>('project.projectId'),
    });
    this.storage = new Storage({
      projectId: this.configService.get<string>('project.projectId'),
    });
    this.memesBucket = this.configService.get<string>('storage.bucketName');
    this.memesKind = this.configService.get<string>('datastore.memesKind');
    this.memesKindTemp = this.configService.get<string>(
      'datastore.memesKindTemp',
    );
  }

  async find({ pageSize, page }: GetMemesQueryDto) {
    const memesQuery = datastore
      .createQuery(this.memesKind)
      .order('timestamp', { descending: true })
      .limit(parseInt(pageSize));

    const memes = await this.datastore.runQuery(memesQuery);

    return memes;
  }

  async create({ title, imgUrl, tags }: CreateMemeDto) {
    const entity = [
      {
        key: this.datastore.key([this.memesKind]),
        data: {
          timestamp: new Date(),
          uuid: uuid(),
          title,
          imgUrl,
          tags,
        },
      },
    ];

    console.log(entity);

    const response = await datastore.save(entity);

    return response;
  }

  async getPresignedUrl({ contentType }: GetPresignedUrlDto): Promise<string> {
    const config: GetSignedUrlConfig = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType,
    };

    const uniqueId = uuid();

    const [url] = await this.storage
      .bucket(this.memesBucket)
      .file(`temporaryName/${uniqueId}.jpg`)
      .getSignedUrl(config);

    return url;
  }
}
