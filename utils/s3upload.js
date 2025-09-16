import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Configure S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload file to S3
export const uploadFile = async (key, fileBuffer, mimetype) => {
  const params = {
    Bucket: 'ckcharan123',
    Key: key, 
    Body: fileBuffer,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

// Delete file from S3
export const deleteFile = async (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);

  return true;
};
 