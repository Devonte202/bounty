const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userController = require('./controllers/users');
const path = require('path');
const port = process.env.PORT || 8080
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname ,'public/views' , 'index.html'))
})

app.get('/login', (req, res) =>{
  res.sendFile(path.join(__dirname ,'public/views' , 'login.html'))
})

app.get('/register', (req, res) =>{
  res.sendFile(path.join(__dirname ,'public/views' , 'register.html'))
})

app.listen(port, () => {
	console.log(`Now listening on port ${port}`)
})