const express =require("express");
const app=express();
const exphbs=require("express-handlebars");
const bodyparser=require("body-parser");
// const hbs=require("hbs");

const mysql=require("mysql");
require("dotenv").config();

// const app=express();

const port=process.env.PORT || 5000;
// parsing middleware
// parse application/ x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:false}));

// parse application/json
app.use(bodyparser.json());
app.use(express.static('public'));
app.set('view engine','hbs');
app.engine('hbs', exphbs.engine({extname:'hbs',defaultLayout:'main'}));
const routes=require('./server/routes/user');
app.use('/',routes);
app.listen(port,()=>console.log(`listening on port ${port} `));