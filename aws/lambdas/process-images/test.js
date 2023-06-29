const {getClient, getOriginalImage, processImage, uploadProcessedImage} = require('./s3-image-processing.js')

console.log("WTF!")

async function main(){
  console.log('TESTING S3 IMAGE PROCESSING')
  client = getClient()
  const srcBucket = 'assets.carloserncloud.online'
  const srcKey = 'avatars/original/data.jpg'
  const dstBucket = srcBucket
  const dstKey = 'avatars/processed/data.png'
  const width = 256
  const height = 256

  const originalImage = await getOriginalImage(client,srcBucket,srcKey)
  console.log(originalImage)
  const processedImage = await processImage(originalImage,width,height)
  await uploadProcessedImage(client,dstBucket,dstKey,processedImage)
}

main().then(() => {
    console.log('Proceso completado');
  }).catch((error) => {
    console.error(error);
  });