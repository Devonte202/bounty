const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname ,'public/views' , 'index.html'))
})

app.listen(port, () => {
	console.log(`Now listening on port ${port}`)
})