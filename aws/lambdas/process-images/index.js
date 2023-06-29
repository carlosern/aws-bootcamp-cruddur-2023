const process = require('process');
const {getClient, getOriginalImage, processImage, uploadProcessedImage} = require('./s3-image-processing.js')
const path = require('path');

const bucketName = process.env.DEST_BUCKET_NAME
const folderInput = process.env.FOLDER_INPUT
const folderOutput = process.env.FOLDER_OUTPUT
const width = 512 //parseInt(process.env.PROCESS_WIDTH) NO SE PORQUE NO TOMA LOS VALORES DE LA VARIABLE DE ENTORONO!
const height = 512 //parseInt(process.env.PROCESS_HEIGHT)

client = getClient();

exports.handler = async (event) => {

  console.log('DEST_BUCKET_NAME',process.env.DEST_BUCKET_NAME)
  console.log('FOLDER_INPUT',process.env.FOLDER_INPUT)
  console.log('FOLDER_OUTPUT',process.env.FOLDER_OUTPUT)
  console.log('PROCESS_WIDTH',process.env.PROCESS_WIDTH)
  console.log('PROCESS_HEIGHT',process.env.PROCESS_HEIGHT)

  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  console.log('srcBucket',srcBucket)
  console.log('srcKey',srcKey)
  console.log(`dest image dimensions ${width}x${height}`)

  const dstBucket = bucketName;

  filename = path.parse(srcKey).name
  const dstKey = `${folderOutput}/${filename}.jpg`
  console.log('dstBucket',dstBucket)
  console.log('dstKey',dstKey)

  const originalImage = await getOriginalImage(client,srcBucket,srcKey)
  const processedImage = await processImage(originalImage,width,height)
  await uploadProcessedImage(client,dstBucket,dstKey,processedImage)
};