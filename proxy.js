const name = "PROXY";
const port = 3001;

////////////////////////////////////////

const http = require("http");

const server = http.createServer(handler);
server.listen(port);

function handler(req, res) {
  console.log(`${name}:: request recieved from ${req.url}`);

  http.get("http://localhost:9001", resp => {
    let data = "";
    resp.on("data", chunk => {
      data += chunk;
    });
    resp.on("end", () => {
      res.end(data);
    });
  });
}
