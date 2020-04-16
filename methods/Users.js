const db = require('../db');

class User {
  static createUser(name, username, email, password, address) {
    const queryText = 'INSERT INTO users (name, username, email, password, address) VALUES ($1, $2, $3, $4, $5);';
    return db.query(queryText, [name, username, email, password, address]);
  }

  static getUserByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1;';
    return db.query(queryText, [email])
      .then((data) => data.rows[0]);
  }

  static getLastCreatedUser(req, res) {
    const queryText = 'SELECT * FROM users ORDER BY id DESC LIMIT 1;';
    return res.send(db.query(queryText));
  }
}

module.exports = User;