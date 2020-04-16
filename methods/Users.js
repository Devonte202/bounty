const db = require('../db');

class User {
  static createUser(username, email, password, address, state, zip, phone_number) {
    const queryText = 
    'INSERT INTO users (username, email, hashed_password, address, state, zip, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7);';
    return db.query(queryText, [ username, email, password, address, state, zip, phone_number]);
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