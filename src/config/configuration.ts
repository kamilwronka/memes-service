export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  project: {
    projectId: process.env.PROJECT_ID,
  },
  storage: {
    bucketName: process.env.MEMES_BUCKET_NAME,
  },
  datastore: {
    memesKind: process.env.MEMES_DATASTORE_KIND,
    memesKindTemp: process.env.MEMES_DATASTORE_KIND_TEMP,
  },
  isGlobal: true,
});
