const db = require('../db');

class User {
  static createUser(name, username, email, hashed_password, address, state, zip, phone_number) {
    const queryText = 'INSERT INTO users (name, username, email, hashed_password, address, state, zip, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
    return db.query(queryText, [name, username, email, hashed_password, address, state, zip, phone_number]);
  }

  static getUserByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1;';
    return db.query(queryText, [email])
      .then((data) => data.rows[0]);
  }

  static getLastCreatedUser() {
    const queryText = 'SELECT * FROM users ORDER BY id DESC LIMIT 1;';
    return db.query(queryText);
  }
}

module.exports = User;