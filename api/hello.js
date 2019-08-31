const name = "HELLO";
const port = 9001;

//////////////////////////////////////

const http = require("http");

const server = http.createServer(handler);
server.listen(port);

function handler(req, res) {
  console.log(`${name}:: request recieved from ${req.url}`);
  res.end("hello");
}
