const db = require('../db');

class Bounty {
  static createBounty(name, user_id, img, cost, info, category , location) {
    const queryText = 'INSERT INTO bounties (owner, thumbnail, cost, info, category, location, name) VALUES ($1, $2, $3, $4, $5, $6, $7);';
    return db.query(queryText, [user_id, img, cost, info, category, location, name]);
  }
  static updateBounty(user_id, bountyId, cost, category, info, name){
  	const queryText = 'UPDATE bounties SET cost = $3, category = $4, info = $5, name = $6 WHERE owner = $1 AND bounty_id = $2;';
  	return db.query(queryText,[user_id, bountyId, cost, category, info, name])
  		.then((data) => data.rows)
  }
  static deleteBounty(bountyId, user_id){
  	const queryText = 'DELETE FROM bounties WHERE bounty_id = $1 AND owner = $2;';
  	return db.query(queryText, [bountyId, user_id]);
  }

  static getUsersBounties(user_id) {
    const queryText = 'SELECT * FROM bounties WHERE owner = $1;';
    return db.query(queryText, [user_id])
    	.then((data) => data.rows);
  }

  static getAllBounties() {
    const queryText = 'SELECT * FROM bounties;';
    return db.query(queryText)
    	.then((data) => data.rows);
  }
  
  static claimBounty(bountyId, user_id){
    const queryText = 'UPDATE  bounties SET is_claimed = NOT is_claimed WHERE bounty_id = $1 AND owner = $2;';
    return db.query(queryText, [bountyId, user_id]);
  }
}

module.exports = Bounty;
