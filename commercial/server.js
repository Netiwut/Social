const express = require("express")
const path = require("path");
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require("passport")
const http = require('http')
const mongoose = require('mongoose')
const config = require('./config/database')


mongoose.connect(config.database)

mongoose.connection.on('connected',()=>{
    console.log("Database Conntects" + config.database);
    
})

mongoose.connection.on('error',(err)=>{
    console.log('error' + err);
    
})

const app = express();

const users = require('./routes/user')

const port = 3080;

app.use(cors())

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.get('/',(req,res)=>{

})

app.use('/user',users)

app.listen(port,()=>{
    console.log("Server started on port " + port);
    
})


