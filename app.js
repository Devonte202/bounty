const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userController = require('./controllers/users')
const path = require('path')
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', userController.getHomePage)

app.get('/login', userController.getLoginPage)

app.get('/register', userController.getRegisterPage)

app.post('/api/register', userController.createUser)

app.post('/api/login', userController.verifyUser)


app.listen(port, () => {
	console.log(`Now listening on port ${port}`)
})