import { Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore'

const datastore = new Datastore({ projectId: "decent-line-296513" })

@Injectable()
export class MemesService {
    async find() {
        const memesQuery = await datastore.createQuery('Memes')

        const memes = await datastore.runQuery(memesQuery)

        return memes[0]
    }
}
