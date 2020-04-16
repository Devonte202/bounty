const path = require('path');
const Bounty = require('../methods/bounty');

const createBounty =  async (req,res) =>{
	try{
		const { thumbnail, cost, info, category, location} = req.body;
		await Bounty.createBounty(thumbnail, cost, info, category, location);
	 	res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error: Could not create bounty. Please try again.' });
  }
};

const getUsersBounties = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await Bounty.getUsersBounties(userId);
    if (result.length === 0) {
      return res.json('There are no bounties yet.');
    }
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error: Could not get all bounties from the user.' });
  }
};

const updateBounty = async (req, res) => {
  const { bounty } = req.params;
  const { id, cost, category, info, location} = req.body;
  try {
    await Bounty.updateBounty(id, cost, category, info, location);
    return res.redirect('/');
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error: Bounty could not be updated.' });
  }
};

const deleteBounty = (req, res) => {
  const { bountyId } = req.params;
  const { userId } = req.body;
  Bounty.deleteBounty(bountyId, userId)
    .then(() => res.status(204).json({ message: 'Bounty successfully deleted.' }))
    .then(() => res.redirect('/'))
    .catch(() => res.status(500).json({ error: 'Internal Server Error: Bounty could not be deleted.' }));
};
const getAllBounties = () =>{
	console.log(Bounty.getAllBounties())
}
	
module.exports = {
  createBounty,
  getUsersBounties,
  updateBounty,
  deleteBounty,
  getAllBounties,
};