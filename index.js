const connectToMongo = require('./config/db.js');
const express = require('express')
require('dotenv').config()
var cors = require('cors') 

const app = express()
const port = process.env.PORT
const db_url=process.env.DATABASE_URL;
connectToMongo(db_url);

app.use(cors())
app.use(express.json())

// routes
app.use('/admin',require('./controllers/adminController')) 
app.use('/user',require('./controllers/userController.js'))
app.use(require('./controllers/jobController.js'))
// app.use(require('./controllers/patientController'))


app.listen(port, () => {
  console.log(`Test backend listening at http://localhost:${port}`)
})