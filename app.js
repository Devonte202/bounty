const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userController = require('./controllers/users')
const path = require('path')
const port = process.env.PORT || 8080
const cookieParser = require('cookie-parser')
const bountyController = require('./controllers/bounty')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(cookieParser())


app.get('/', userController.getHomePage)

app.get('/home', userController.authenticate, userController.getLoggedInPage)

app.get('/login', userController.getLoginPage)

app.get('/register', userController.getRegisterPage)

app.post('/api/register', userController.createUser)

app.post('/api/login', userController.verifyUser)

app.get('/api/logout', userController.logout)

app.get('/bounty-board', userController.authenticate, userController.getBountyBoard)

app.get('/account', userController.authenticate, userController.getAccount)

app.post('/add-bounty', userController.authenticate, bountyController.createBounty)

app.get('/api/get-bounties', userController.authenticate, bountyController.getAllBounties)

app.get('/api/get-user-bounties', userController.authenticate, bountyController.getUsersBounties)

app.post('/api/delete/:id', userController.authenticate, bountyController.deleteBounty)

app.post('/api/update-bounty/:id', userController.authenticate, bountyController.updateBounty)

app.post('/api/claim-bounty/:id', userController.authenticate, bountyController.claimBounty)


app.listen(port, () => {
	console.log(`Now listening on port ${port}`)
})