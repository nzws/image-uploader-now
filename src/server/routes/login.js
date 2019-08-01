module.exports = async (req, res) => {
  res.statusCode = 307;
  res.setHeader(
    'Location',
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
  res.end();
};
