const express=require('express');
const hbs=require('hbs');
const fs= require('fs');
const port=process.env.PORT || 3000; //stores all your environment variables as key value pairs
var app=express();

//views is the default directory express uses for templates
app.set('view engine','hbs');
//app.use(express.static(__dirname+'/public'));


app.use((req,res,next)=>{         //express middleware
var now=new Date().toString();
var log=`${now}:${req.method} ${req.url}`;

console.log(log);
fs.appendFile('server.log',log+'\n',(err)=>{
  if(err)
  console.log('Unable to append to log file');
})
next(); //if this next() method is not executed, nothing can be seen in the browser
});

// app.use((req,res,next)=>{
// res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{

res.render('home.hbs',{
  pageTitle:'Home Page',
  welcomeMessage:'Welcome to my Website',

});

});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',

  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects',

  });
});


app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: '404'
  });
});
// /

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
