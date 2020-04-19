const path = require('path');
const Bounty = require('../methods/Bounty');

const createBounty =  async (req,res) =>{
	try{
    const userID = req.userId
    const location = req.user.state
		const { name, img, cost, info, category} = req.body;
		Bounty.createBounty( name, userID , img, cost, info, category, location);
	 	res.redirect('/bounty-board');
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error: Could not create bounty. Please try again.' });
  }
};

const getUsersBounties = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await Bounty.getUsersBounties(userId);
    if (result.length === 0) {
      return res.json('There are no bounties yet.');
    }
    return res.send(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error: Could not get all bounties from the user.' });
  }
};

const updateBounty = async (req, res) => {
  const { bounty } = req.params;
  const { id, cost, category, info, location} = req.body;
  try {
    await Bounty.updateBounty(id, cost, category, info, location);
    return res.redirect('/home');
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error: Bounty could not be updated.' });
  }
};

const deleteBounty = (req, res) => {
  const bountyId = req.params.id;
  console.log(bountyId)
  const userId = req.userId;
  console.log(userId)
  Bounty.deleteBounty(bountyId, userId)
    .then(() => res.redirect('/account'))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Bounty could not be deleted.' }));
};

const getAllBounties = async (req, res) =>{
	const bounties = await Bounty.getAllBounties()
	res.send(bounties)
}
	
module.exports = {
  createBounty,
  getUsersBounties,
  updateBounty,
  deleteBounty,
  getAllBounties,
};