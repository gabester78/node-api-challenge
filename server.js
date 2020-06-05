const express = require("express");
const server = express();
const actionsRouter = require("./data/actionsRouter.js");
const projectsRouter = require("./data/projectsRouter.js");

server.use(express.json());
server.use("/actions", actionsRouter);
server.use("/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(logger);
//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

module.exports = server;
