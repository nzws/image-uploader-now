const request = require('request');
const { checkUser } = require('../utils/check_user');

module.exports = (req, res) => {
  if (!req.query || !req.query.code)
    return res.status(400).json({ error: 'code is required' });

  request(
    {
      url: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      json: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code
      }
    },
    async (error, response, body) => {
      if (error || !body.access_token)
        return res.status(400).json({ error: 'return error' });

      try {
        await checkUser(body.access_token);
      } catch (e) {
        return res
          .status(400)
          .json({ error: 'This account does not have a permission :(' });
      }

      return res.send(
        'Please access: ' + req.headers.host + '#' + body.access_token
      );
    }
  );
};
