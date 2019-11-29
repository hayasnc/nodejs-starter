const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('hello');
    res.write(JSON.Stringify([1, 2, 3, 4]));
    res.end();
  }
});
server.listen(3000);
console.log('Listening on 3000');
