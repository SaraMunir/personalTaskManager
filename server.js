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
    // console.log('in server is login working')
    const userData = req.body;
    const loginResult = await orm.loginUser( userData.email, userData.password );
    loginResult.rememberMe = req.body.rememberMe;
    res.send( loginResult );
});
//Login
app.post('/api/user/passCode', async function( req,res ){
    // console.log('in server is login working')
    const userData = req.body;
    const loginPassCode = await orm.loginPassCode( userData.passCode, userData.userId );
    res.send( loginPassCode );
});

app.post('/api/addTask', async function( req,res ){
    // const userId = req.params.userId;
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
//get buckets
app.get('/api/getBuckets/:userId', async function( req,res ){
    const userId = req.params.userId;
    const getBuckets = await orm.getBuckets( userId );
    res.send(getBuckets);
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
    const bucketStatus = await orm.bucketStatus( bucketId );
    res.send(bucketStatus);
})
app.get('/api/memberBuckets/:memberId', async function( req,res ){
    const memberId = req.params.memberId;
    // const userTasks = req.body;
    const memberBucket = await orm.memberBucket( memberId );
    res.send(memberBucket);
})
app.get('/api/bucketActivetoFalse/:userId/:bucketId', async function( req,res ){
    const userId = req.params.userId;
    const bucketId = req.params.bucketId;
    // const userTasks = req.body;
    const bucketStatus = await orm.bucketStatusToFalse( bucketId );
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
//DELETE MEMBER
app.get('/api/deleteMember/:memberId', async (req,res)=>{
    const memberId = req.params.memberId;
    const deleteMember = await orm.deleteMember(memberId);
    res.json(deleteMember);
})
//track MEMBER
app.get('/api/trackMember/:memberId', async (req,res)=>{
    const memberId = req.params.memberId;
    const trackMember = await orm.trackMember(memberId);
    res.json(trackMember);
})
//cancelMemberTracking
app.get('/api/cancelMemberTracking/:memberId', async (req,res)=>{
    const memberId = req.params.memberId;
    const cancelTrackMember = await orm.cancelTrackMember(memberId);
    res.json(cancelTrackMember);
})
app.get('/api/getMember/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const fetchMemberList2 = await orm.getMemberList2(userId);
    res.json(fetchMemberList2);
})
app.get('/api/memberDetail/:membId', async (req,res)=>{
    const membId = req.params.membId;
    const fetchMembersDetail = await orm.getMemberDetail(membId);
    res.json(fetchMembersDetail);
})
app.post('/api/addPersonaltsk/:membId', async function( req,res ){
    const membId = req.params.membId;
    const PersnltaskObj = req.body;
    const postPersonalTsk = await orm.postPersonalTsk( PersnltaskObj, membId );
    res.send(postPersonalTsk);
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



/////moving task from do to doing:
app.put("/api/completePrsnlTsk/:memberId/:prsnlTskId", async (req, res) => {
    const memberId = req.params.memberId;
    const prsnlTskId = req.params.prsnlTskId;
    const completePrsnlTsk = await orm.completePrsnlTsk(memberId, prsnlTskId);
    res.send(completePrsnlTsk);
    });


//updating admin passcode:
// /api/updateAdminPassCode/

app.put("/api/updateAdminPassCode/:userId", async (req, res) => {
    const passWordData = req.body;
    const userId = req.params.userId;
    const updatePassCode = await orm.updatePassCode(userId, passWordData);
    res.send(updatePassCode);
    });
//add to dashboard
app.put("/api/addToDashboard/:userId", async (req, res) => {
    const bucketId = req.body;
    const userId = req.params.userId;
    const addBucketToDashboard = await orm.addBucketToDashboard(userId, bucketId);
    res.send(addBucketToDashboard);
    });
//remove From Dashboard
app.put("/api/removeFromDashboard/:userId", async (req, res) => {
    const bucketId = req.body;
    const userId = req.params.userId;
    const removeFromDashboard = await orm.removeFromDashboard(userId, bucketId);
    res.send(removeFromDashboard);
    });

app.put("/api/logMemberIn/:membId", async (req, res) => {
    const logInData = req.body;
    const membId = req.params.membId;
    const logMemberIn = await orm.logMemberIn(membId, logInData);
    res.send(logMemberIn);
    });
app.put("/api/logMemberOut/:membId", async (req, res) => {
    const logOutData = req.body;
    const membId = req.params.membId;
    const logMemberOut = await orm.logMemberOut(membId, logOutData);
    res.send(logMemberOut);
    });

// /api/addToMyList
app.post("/api/addToMyList", async (req, res) => {
    const listData = req.body;
    const addItemToMyList = await orm.addItemToMyList(listData);
    res.send(addItemToMyList);
    });

    // /api/loadMyList/${userId}
app.get('/api/loadMyList/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const getMyGroceryItms = await orm.getMyGroceryItms(userId);
    // console.log('in servers: ')
    res.json(getMyGroceryItms);
})