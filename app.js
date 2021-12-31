//Load express module with `require` directive
require("dotenv").config();
const port = process.env.PORT || 3000;
var express = require("express");
const bodyParser = require("body-parser");

const app = express();

const routes = require("./routes");
const models = require("./models");
const server = require("http").Server(app);

const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "token, Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, x-chat-id"
  );
  if (req.method === "OPTIONS") {
    res.send(204);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

models.sequelize.sync().then(() => {
  server.listen(port, () => {
      console.log('API running on port',port)
  });
  routes("/api", app);
});

module.exports = {
  app,
};
