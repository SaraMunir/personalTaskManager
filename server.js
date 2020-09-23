require('dotenv').config(); // --> process.env
const express = require( 'express' );
const fs = require('fs');
const path = require("path");
const orm = require( './db/orm.mongoose' );

const PORT = process.env.PORT || 8080;
const app = express();

var server = app.listen( PORT, function(){ console.log( `[MyFamilyTask], http://localhost:${PORT}` ); });
// app.use( express.static('client/build/') );
app.use(express.static(path.join(__dirname, "client/src/components/Grocery")));
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
app.post('/api/addBacklogTask', async function( req,res ){
    // const userId = req.params.userId;
    const userTasks = req.body;
    const postBackLogTask = await orm.postBackLogTask( userTasks);
    res.send(postBackLogTask);
})
app.post('/api/addBucket', async function( req,res ){
    // const userId = req.params.userId;
    const userTasks = req.body;
    const postBucket = await orm.postBucket( userTasks);
    res.send(postBucket);
})
app.post('/api/addMembersBucket', async function( req,res ){
    // const userId = req.params.userId;
    const userBucket = req.body;
    const postMembersBucket = await orm.postMembersBucket( userBucket);
    res.send(postMembersBucket);
})
app.post('/api/completingTask', async function( req,res ){
    // const userId = req.params.userId;
    const userTasks = req.body;
    const completeBucketTask = await orm.completeBuckTask( userTasks);
    res.send(completeBucketTask);
})
app.get('/api/bucketActiveList/:userId/:bucketId', async function( req,res ){
    const userId = req.params.userId;
    const bucketId = req.params.bucketId;
    // const userTasks = req.body;
    const bucketStatus = await orm.bucketStatus( userId, bucketId );
    res.send(bucketStatus);
})
app.get('/api/memberBuckets/:userId/:memberId', async function( req,res ){
    const userId = req.params.userId;
    const memberId = req.params.memberId;
    // const userTasks = req.body;
    const memberBucket = await orm.memberBucket( userId, memberId );
    res.send(memberBucket);
})
app.get('/api/bucketActivetoFalse/:userId/:bucketId', async function( req,res ){
    const userId = req.params.userId;
    const bucketId = req.params.bucketId;
    // const userTasks = req.body;
    const bucketStatus = await orm.bucketStatusToFalse( userId, bucketId );
    res.send(bucketStatus);
})

app.get('/api/backlogList/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchBacklogList = await orm.getBacklogLists(userId);
    // console.log('in servers: ')
    res.json(fetchBacklogList);
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
//creating members
app.post('/api/member', async function( req,res ){
    const userEmployee = req.body;
    // console.log('in server:', userEmployee)
    const postMember = await orm.postMember( userEmployee );
    res.send(postMember);
})
app.post('/api/bucketTaskList', async function( req,res ){
    const userEmployee = req.body;
    const postBucketList = await orm.postBucketList( userEmployee );
    res.send(postBucketList);
})
app.post('/api/bucketTaskList/Recurring', async function( req,res ){
    const userEmployee = req.body;
    // console.log('in server:', userEmployee)
    const postBucketListWithoutDelete = await orm.postBucketListWithoutDelete( userEmployee );
    res.send(postBucketListWithoutDelete);
})
app.post('/api/assignOwnertoTask', async function( req,res ){
    const taskObj = req.body;
    console.log('in server assigning obj received is:', taskObj)
    const assignOwnertoTask = await orm.assignOwnertoTask( taskObj );
    res.send(assignOwnertoTask);
})
app.get('/api/member/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchMemberList = await orm.getMemberList(userId);
    res.json(fetchMemberList);
})



app.get('/api/doList/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchDoList = await orm.getDoLists(userId);
    // console.log('in servers: ')
    res.json(fetchDoList);
})
app.get('/api/doingList/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchDoingList = await orm.getDoingLists(userId);
    // console.log('in servers: ')
    res.json(fetchDoingList);
})
app.get('/api/doneList/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchDoneList = await orm.getDoneLists(userId);
    // console.log('in servers: ')
    res.json(fetchDoneList);
})
//moving task from do to doing:
app.put("/api/moveToDoing/:userId/:taskId", async (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const moveDoToDoing = await orm.moveDoToDoing(userId, taskId);
    res.send(moveDoToDoing);
    });
app.put("/api/moveToDone/:userId/:taskId", async (req, res) => {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const moveDoingToDone = await orm.moveDoingToDone(userId, taskId);
    res.send(moveDoingToDone);
    });

//   /api/moveToDoing/${userId}/${taskId}