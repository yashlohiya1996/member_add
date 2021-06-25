const { json } = require('express');
const express = require('express')
const path= require('path')
const members= require('./Members')
const exphbs= require('express-handlebars')
const logger= require('./middleware/logger')
const app= express();

//HandleBars MiddleWare
app.engine('handlebars', exphbs({defaultLayout: 'main'}));      //setting defaultlayout of name 'main'.
app.set('view engine', 'handlebars');

//Body Parser Middleware    
app.use(express.json());
app.use(express.urlencoded({extended: false})) //Handle Form Submission and Data

//HomePage Route    
app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Member App',
        members
    })
})

//Setting static folder
app.use(express.static(path.join(__dirname,'public')));

//Initializing Middleware
app.use(logger) 

//Members API Routes
app.use('/api/members',require('./routes/api/members'))

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));











// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))       Passing single file at once
// })


// var server= app.listen(6000, function(){
//     var host= server.address().address
//     var port= server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
// })

// const logger=(req,res,next)=>{
//     //     console.log('Hello');
//     //     next();
//     // };


// //Get All Member API fetch
// app.get('/api/members', (req,res)=>{
//     res.json(members);
// });

// //Get single member API fetch
// app.get('/api/members/:id',(req,res)=>{
//     //res.send(req.params.id);
//     const found= members.some(member => member.id===parseInt(req.params.id));  //some() will check if any element of array passes a test

//     if(found){
//         res.json(members.filter(member=>member.id===parseInt(req.params.id)));  //It will filter members arrya based on condn 
//     }else{
//         res.status(400).json({msg:`Member Not Found on id:${req.params.id}`})
//     }

// });