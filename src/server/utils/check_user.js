const request = require('request');

exports.checkUser = token => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: 'https://api.github.com/user',
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
          'User-Agent':
            'oauth-login by https://github.com/yuzulabo/image-uploader-now'
        }
      },
      (error, response, body) => {
        if (error) return reject(error);
        body = JSON.parse(body);

        if (body.id === parseInt(process.env.GITHUB_USER_ID)) {
          return resolve(body);
        }
        reject(body);
      }
    );
  });
};
