const users = require("../data/users");

class LoginService {
  login(username, password) {
    const user = users[username];
    const isMatch = user?.password === password;
    return [
      isMatch,
      isMatch ? this.#constructToken(username, user.type) : null,
    ];
  }

  validateToken(token) {
    const { username } = this.#getAuthUser(token);
    const user = users[username];
    return [!!user, user];
  }

  #getAuthUser = (token) => {
    const user = {};
    const dataContents = token.split("|");
    dataContents.map((dataString) => {
      const [key, value] = dataString.split("==>");
      user[key] = value;
    });

    return { ...user };
  };

  #constructToken(username, type) {
    return `type==>${type}|username==>${username}`;
  }
}

module.exports = new LoginService();
