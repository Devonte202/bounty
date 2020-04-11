const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(port, () => {
	console.log(`Now listening on port ${port}`)
})