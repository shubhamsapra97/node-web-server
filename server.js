const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear' , ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text)=> {
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log' , log + '\n' , (err) => {
    if(err){
      console.log('Unable to write to file');
    }
    next();
  });
});

// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });

app.get('/' , (req,res) => {
  // res.send({
  //   name: 'Shubham',
  //   likings: [
  //     'biking',
  //     'eating'
  //   ]
  // });
  res.render('home.hbs' , {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Home page'
  })
});

app.get('/about' , (req , res) => {
  res.render('about.hbs' , {
    pageTitle: 'About Page'
  });
});

app.get('/bad' , (req , res) => {
  res.send({
    errorMessage: 'Unable to process the message'
  });
});

app.get('/projects' , (req , res)=>{
  res.render('projects.hbs');
});

app.listen(port , () => {
  console.log(`Server is up on Port ${port}`);
});
