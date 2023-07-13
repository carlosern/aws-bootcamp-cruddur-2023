const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  console.log('## EVENT');
  console.log(event);

  // Return CORS headers for preflight check
  if (event.routeKey === "OPTIONS /{proxy+}") {
    console.log(JSON.stringify({step: 'preflight', message: 'preflight CORS check'}));

    return {
      headers: {
        "Access-Control-Allow-Headers": "*, Authorization",
        "Access-Control-Allow-Origin": "https://3000-carlosern-awsbootcampcr-dyakeu68os3.ws-us101.gitpod.io",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
      },
      statusCode: 200
    };
  } else {
    console.log("BODY", event.body)
    const token = event.headers.authorization.split(' ')[1];
    console.log(JSON.stringify({step: 'presignedurl', access_token: token}));

    const bodyHash = JSON.parse(event.body);
    const extension = bodyHash.extension;

    const decodedToken = jwt.decode(token);
    const cognitoUserUuid = decodedToken.sub;

    const s3 = new AWS.S3();
    const bucketName = process.env.UPLOADS_BUCKET_NAME;
    const objectKey = `${cognitoUserUuid}.${extension}`;

    console.log(JSON.stringify({object_key: objectKey}));

    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 300 // 5 minutes
    };

    const url = await s3.getSignedUrlPromise('putObject', params);
    const body = JSON.stringify({url: url});

    return {
      headers: {
        "Access-Control-Allow-Headers": "*, Authorization",
        "Access-Control-Allow-Origin": "https://3000-carlosern-awsbootcampcr-dyakeu68os3.ws-us101.gitpod.io",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
      },
      statusCode: 200,
      body: body
    };
  }
};