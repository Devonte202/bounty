const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userController = require('./controllers/users')
const path = require('path')
const port = process.env.PORT || 8080
const api = require('./methods/Users')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', userController.loadHomePage)

app.get('/login', userController.getLoginPage)

app.get('/register', userController.getRegisterPage)

app.get('/api/users', api.getLastCreatedUser)

app.listen(port, () => {
	console.log(`Now listening on port ${port}`)
})