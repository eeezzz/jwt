// const http = require("http");

// const server = http.createServer(function(req, res) {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello World");
// });

// server.listen("3000", function() {
//   console.log("server start on 3000 port");
// });

import config from "./config/config";
import app from "./config/express";

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(
      `server started on  port http://127.0.0.1:${config.port} (${config.env})`
    );
  });
}

export default app;