const users = require("../data/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configService = require("./config-service");

class LoginService {
  async login(username, password) {
    const user = users[username];
    const isMatch = await bcrypt.compare(password, user?.hashedPassword);
    return [
      isMatch,
      isMatch ? this.#signJwt({ username, type: user.type }, "2d") : null,
    ];
  }

  #signJwt = (payload, expiresIn) => {
    const token = jwt.sign(payload, configService.get("MM_BFF_SECRET_KEY"), {
      expiresIn,
    });
    return token;
  };

  #verifyJwt = (token) => {
    const decodedData = jwt.verify(
      token,
      configService.get("MM_BFF_SECRET_KEY")
    );
    return decodedData;
  };

  validateToken(token) {
    const { username } = this.#verifyJwt(token);
    const user = users[username];
    return [!!user, { username, type: user.type }];
  }
}

module.exports = new LoginService();
