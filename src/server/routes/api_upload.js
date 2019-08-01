const fs = require('fs');
const filetype = require('file-type');
const aws = require('aws-sdk');
const multiparty = require('multiparty');
const tinify = require('tinify');
tinify.key = process.env.TINIFY_TOKEN;

const { checkUser } = require('../utils/check_user');

module.exports = async (req, res) => {
  let body;
  try {
    body = await parser(req);
  } catch (e) {
    return res.json({ error: 'data parse is failed' });
  }

  const slug = body.fields.slug[0];
  const auth = body.fields.auth[0];
  const filePath = body.files.file[0].path;

  if (!filePath || !slug || !auth)
    return res.json({ error: 'file / slug / auth is required' });
  if (typeof slug !== 'string')
    return res.json({ error: 'slug is not string' });

  try {
    await checkUser(auth);
  } catch (e) {
    return res.json({ error: 'authorization is failed' });
  }

  const file = await readTinyFile(filePath);
  const fileType = filetype(file);
  const ext = fileType.ext;
  const random = Math.random()
    .toString(32)
    .substring(2);
  const path = `${slug}/${random}.${ext}`;

  const spacesEndpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT);
  const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.BUCKET_KEY,
    secretAccessKey: process.env.BUCKET_SECRET
  });
  s3.putObject(
    {
      Body: file,
      Bucket: process.env.BUCKET_NAME,
      Key: path,
      ContentType: fileType.mime,
      ACL: 'public-read'
    },
    function(err, data) {
      if (err) return res.json({ error: 'unknown error' });

      return res.json({ url: `${process.env.BUCKET_URL}${path}` });
    }
  );
};

const parser = req =>
  new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });

const readTinyFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, sourceData) => {
      if (err) return reject(err);

      tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
        if (err) return reject(err);

        resolve(resultData);
      });
    });
  });
