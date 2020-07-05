require('dotenv').config(); // --> process.env
const express = require( 'express' );
const fs = require('fs');
const path = require("path");
const orm = require( './db/orm.mongoose' );

const PORT = process.env.PORT || 8080;
const app = express();

var server = app.listen( PORT, function(){ console.log( `[MyFamilyTask], http://localhost:${PORT}` ); });
// app.use( express.static('client/build/') );
// app.use(express.static(path.join(__dirname, "client/src/components/Genre")));
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );

app.use(express.static(path.join(__dirname, "client/src/components/assets")));
//Registration: 
app.post('/api/user/registration', async function( req,res ){
    console.log('in server file: ', req.body)
    const userData = req.body;
    const registerResult = await orm.registerUser( userData );
    res.send(registerResult);
})

//Login
app.post('/api/user/login', async function( req,res ){

    console.log('in server is login working')

    const userData = req.body;
    const loginResult = await orm.loginUser( userData.email, userData.password );
    loginResult.rememberMe = req.body.rememberMe;
    res.send( loginResult );
});

app.post('/api/addTask', async function( req,res ){
    // const userId = req.params.userId;
    console.log('in server why is it not working second time', req.body)
    const userTasks = req.body;
    const postTasks = await orm.postTasks( userTasks);
    res.send(postTasks);
})
app.get('/api/tasksList/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchTasks = await orm.getTasks(userId);
    res.json(fetchTasks);
})
app.get('/api/userInfo/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchUser = await orm.getUserInfo(userId);
    res.json(fetchUser);
})
app.get('/api/doList/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchDoList = await orm.getDoLists(userId);
    console.log('in servers: ')
    res.json(fetchDoList);
})