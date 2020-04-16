const db = require('../db');

class Bounty {
  static createBounty(userID,img, cost, info, category , location) {
    const queryText = 'INSERT INTO bounties (owner, thumbnail, cost, info, category, location) VALUES ($1, $2, $3, $4, $5, $6);';
    return db.query(queryText, [userID, img, cost, info, category, location]);
  }
  static updateBounty(id, cost, category, info, location){
  	const queryText = 'UPDATE bounties SET cost = $2, category = $3, info = $4, location = $5 WHERE owner = $1;';
  	return db.query([id, cost, category, info, location])
  		.then((data) => data.rows)
  }
  static deleteBounty(bountyId, userId){
  	const queryText = 'DELETE FROM bounties WHERE id = $1 AND owner = $2;';
  	return db.query(queryText, [bountyId, userId]);
  }

  static getUsersBounties(id) {
    const queryText = 'SELECT * FROM bounties WHERE owner = $1;';
    return db.query(queryText, [id])
    	.then((data) => data.rows);
  }

  static getAllBounties() {
    const queryText = 'SELECT * FROM bounites;';
    return db.query(queryText)
    	.then((data) => data.rows);
  }
}

module.exports = Bounty;