const Bounty = require('../methods/Bounty')

const createBounty =  async (req,res) =>{
	try{
		const userID = req.userId
		const userEmail = req.user.email
		const location = req.user.state
		const { name, img, cost, info, category} = req.body
		Bounty.createBounty( name, userID , img, cost, info, category, location, userEmail)
		res.redirect('/bounty-board')
	} catch(err)  {
		res.status(500).json({ error: 'Internal Server Error: Could not create bounty. Please try again.' })
	}
}

const getUsersBounties = async (req, res) => {
	try {
		const userId = req.userId
		const result = await Bounty.getUsersBounties(userId)
		if (result.length === 0) {
			return res.json('There are no bounties yet.')
		}
		result.push(req.user.username)
		
		return res.send(result)
	} catch (err) {
		return res.status(500).json({ error: 'Internal Server Error: Could not get all bounties from the user.' })
	}
}

const updateBounty = async (req, res) => {
	const bountyId = req.params.id
	const userId = req.userId
	const {cost, category, info, name} = req.body
	try {
		await Bounty.updateBounty(userId, bountyId, cost, category, info, name)
		return res.redirect('/account')
	} catch (err) {
		return res.status(500).json({ error: 'Internal Server Error: Bounty could not be updated.' })
	}
}

const deleteBounty = (req, res) => {
	const bountyId = req.params.id
	const userId = req.userId
	Bounty.deleteBounty(bountyId, userId)
		.then(() => res.redirect('/account'))
		.catch(() => res.status(500).json({ error: 'Internal Server Error: Bounty could not be deleted.' }))
}

const getAllBounties = async (req, res) =>{
	const bounties = await Bounty.getAllBounties()
	res.send(bounties)
}

const claimBounty = async (req,res) =>{
	const bountyId = req.params.id
	const userId = req.userId
	Bounty.claimBounty(bountyId,userId)
		.then(() =>res.redirect('/account'))
		.catch(() =>res.status(500).json({error:'Bounty is being crazy'}))
}
	
module.exports = {
	createBounty,
	getUsersBounties,
	updateBounty,
	deleteBounty,
	getAllBounties,
	claimBounty,
}