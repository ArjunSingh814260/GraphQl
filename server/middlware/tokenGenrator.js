const jwt = require("jsonwebtoken");

const tokenGenrator = (id) => {
  const token = jwt.sign({ id }, "dahfkasdfdjfsdf");

  return token;
};

module.exports = tokenGenrator;
