const fs = require('fs')
const express = require('express');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
  fs.readdir('./files',(err,files)=>{
    err ? console.log(err) :  res.render('index',{files:files})
  })
})

app.post('/create',(req,res)=>{
  console.log(req.body)
  fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`,req.body.details,(err)=>{
    console.log(err)
  })
  res.redirect('/')
})

app.get('/file/:filename',(req,res)=>{
  fs.readFile(`./files/${req.params.filename}.txt`,'utf-8',(err,data)=>{
    res.render('file',{filename:req.params.filename,data:data})
  })
})

app.post('/save',(req,res)=>{
  console.log(req.body)
  fs.writeFile(`./files/${req.body.file}.txt`,req.body.data,'utf-8',(err)=>{
    console.log(err)
  })
  res.redirect(`/file/${req.body.file}`)
})

app.listen(3000,()=>console.log("Server running...."))