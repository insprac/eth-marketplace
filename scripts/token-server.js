const http = require('http');
const items = require('../data/items.json');

const PORT = 8000;
const PATH_REGEX = /\/items\/\d+\.json/

const server = http.createServer((req, res) => {
  const id = verifyPath(req);
  const item = id ? items.find((item) => item.id === id) : null;

  if (!item) {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(item, null, 2));
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const verifyPath = (req) => {
  if (req.url && PATH_REGEX.test(req.url)) {
    const id = req.url.split('/')[2].split('.')[0];
    return parseInt(id);
  }
  return null;
}
