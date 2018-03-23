const express    = require('express');
const http       = require('http');
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');
const routes     = require('./routes/routes');
const config     = require('./config/database');
const mongoose   = require('mongoose');


var app = express();
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{

    console.log("Connected to database..." +config.database)

})
mongoose.connection.on('error',(err) => {

    console.log("Database error: "+err)


})
app.use(cors());
app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.json({limit:'50mb'}));
app.use('/routes',routes);
app.get('*',(req,res)=>{
 
    res.sendFile(path.join(__dirname,'dist/index.html'))

});
const port = process.env.PORT || '3000';
const server = http.createServer(app);
server.listen(port,"0.0.0.0",()=>console.log("Server Created at "+port))


