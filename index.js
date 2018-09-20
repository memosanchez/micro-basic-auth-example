const { send } = require("micro");
const cors = require("micro-cors")();
const auth = require("basic-auth");
const compare = require("tsscmp");

const authenticate = (name, pass) => {
  const valid =
    compare(name, "machoman-randysavage") && compare(pass, "CreamOfTheCr0p!");
  return valid;
};

const authRequest = req => {
  const credentials = auth(req);
  return credentials && authenticate(credentials.name, credentials.pass);
};

const handler = (req, res) => {
  if (!authRequest(req)) {
    res.setHeader("WWW-Authenticate", 'Basic realm="example"');
    return send(res, 401, "Access Denied");
  }

  send(res, 200, {
    msg: "🔑",
    echo: req.headers
  });
};

module.exports = cors(handler);
