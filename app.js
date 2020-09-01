const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
//connect to DB
const DBURI = "mongodb+srv://nodepj:nodepj@nodetuts.uuwpi.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(DBURI,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(data=>console.log('success to connect'))
.catch(err=>console.log(err));


// express app
const app = express();


//register view engine
app.set("view engine","ejs");

//require
const PORT = process.env.PORT || 3000;


//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))

//static 
app.use(express.static('public'))

//home page route
app.get('/',(req,res)=>{
    res.redirect('/blogs');
})

//about page route
app.get('/about',(req,res)=>{
   res.render('about',{title:"About"})
})

//for blogs
app.use('/blogs',blogRoutes)

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})


//listen app for request
app.listen(PORT,()=>{
    console.log(`Your App is running at ${PORT}`);
})
