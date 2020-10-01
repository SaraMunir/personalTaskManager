const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// mongoose.connect(`mongodb://${process.env.myTasks}`,{useNewUrlParser: true});

mongoose.connect(`mongodb://localhost:27017/myHubTasks`, {useNewUrlParser: true, useFindAndModify: false});

const db = require( './models' );
//registration: 
async function registerUser( userData ){
    console.log('in orm ', userData)
    if( !userData.password || !userData.firstName ||!userData.lastName || !userData.email ){
        return { message: "Invalid user data", id: "", firstName: "" };
    }
    const checkIfEmailExists = await db.users.find({ email: userData.email });
    checkIfEmailExists.map(user=>{
        if(user.email == userData.email){
            return { message: "Email address already exist. Please provide another unique email address"};
        }
    })
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);
    const passCodeHash = await bcrypt.hash(userData.passCode, saltRounds);
    const saveData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: passwordHash,
        passCode: passCodeHash
    };
    const dbUser = new db.users( saveData );
    const saveUser = await dbUser.save();
    return { 
        message: "User successfully saved", 
        id: saveUser._id,
        email: saveUser.email,
        firstName: saveUser.firstName 
    };
}
//login:
async function loginUser( email, password ) {
    // console.log('in orm.mongoose is login working')
    const userData = await db.users.findOne({ email: email });
    if( !userData ) {
        return { error: "Couldn't find that email. Register or try again!" };
    }
    const isValidPassword = await bcrypt.compare( password, userData.password );
    if( !isValidPassword ) {
        return { error: "Invalid password" };
    }
    return {
        message: "user successfully loggedin",
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        profileImg: userData.profileImg,
    };
}
//login:
async function loginPassCode( passCode, userId ) {
    const userData = await db.users.findOne({ _id: userId });
    const isValidPassCode = await bcrypt.compare( passCode, userData.passCode );
    if( !isValidPassCode ) {
        return { error: "Invalid password" };
    }
    return {
        message: "user successfully loggedin"
    };
}
async function postTasks( userTasks ){

    console.log('in orm ', userTasks)
    const taskInfo = {
        'task': `${userTasks.task}`,
        'completionDate': `${userTasks.completionDate}`
    }
    const addTask = await db.users.findOneAndUpdate({ _id: userTasks.userId }, { $push: {tasks: taskInfo} });
    return {message: "phase added successfully!!"}
}
async function getTasks(userId){
    console.log( 'in orm userId', userId)
    const getTaskLists = await db.users.findOne({ _id: userId});
    console.log('in orm: ', getTaskLists)
    return getTaskLists.tasks;
}
async function postBackLogTask( userTasks ){
    console.log('in orm ', userTasks)
    const taskInfo = {
        'taskName': `${userTasks.taskName}`,
        'taskType': `${userTasks.taskType}`,
        // 'completionDate': `${userTasks.completionDate}`
    }
    const addTask = await db.users.findOneAndUpdate({ _id: userTasks.userId }, { $push: {myBackLog: taskInfo} });
    return {message: "phase added successfully!!"}
}
async function postBucket( userTasks ){
    console.log('in orm ', userTasks)
    const bucketInfo = {
        'adminId': `${userTasks.userId}`,
        'bucketName': `${userTasks.bucketName}`,
        'bucketOwnerId': `${userTasks.bucketOwnerId}`
    }
    const dbMyBuckets = new db.myBucket( bucketInfo );
    const saveBucket = await dbMyBuckets.save();
    return {message: "bucket added successfully!!"}
}
async function getBuckets(userId){
    const getBucketList = await db.myBucket.find({ adminId: userId});
    return getBucketList;
}
async function postMembersBucket( bucketData ){
    console.log('in orm memberbucke data is: ', bucketData)
// bucketName: "", bucketOwner: memberName, bucketOwnerId: memberId, userId: localStorage.id
    const saveData = {
        bucketName: bucketData.bucketName,
        bucketOwner: bucketData.bucketOwner,
        bucketOwnerId: bucketData.bucketOwnerId
    }; 
    const dbMemberBuckets = new db.memberBuckets( saveData );
    const saveUser = await dbMemberBuckets.save();
    return {message: "bucket added successfully!!"}
}
async function postBucketList( userTasks ){
    console.log('in orm ', userTasks)
    const taskData = {
        'taskName': `${userTasks.taskName}`,
        'taskOwner': `${userTasks.taskOwner}`,
        'taskOwnerId': `${userTasks.taskOwnerId}`,
    };
    const addBucket = await db.myBucket.findOneAndUpdate(
        { _id: userTasks.bucketId}, 
        { $push: {"bucketTasks": taskData} });
    const deleteEmployee = await db.users.updateOne({_id: userTasks.userId},
        { "$pull": 
            { "myBackLog": { _id: userTasks.backlogId }}
        });
    return {message: "phase added successfully!!"}
}
async function postBucketListWithoutDelete( userTasks ){
    console.log('in orm ', userTasks);
    const taskData = {
        'taskName': `${userTasks.taskName}`,
        'taskOwner': `${userTasks.taskOwner}`,
        'taskOwnerId': `${userTasks.taskOwnerId}`,
    };
    const addBucket = await db.myBucket.findOneAndUpdate(
        { _id: userTasks.bucketId}, 
        { $push: {"bucketTasks": taskData} });
    return {message: "phase added successfully!!"}
}
async function assignOwnertoTask( userTasks ){
    console.log('in orm ', userTasks)
    const taskData = {
        'taskName': `${userTasks.taskName}`,
    };
    const assignOwner = await db.users.findOneAndUpdate(
        {   _id: userTasks.userId,  
            "myBackLog._id": userTasks.taskId  }, 
        { $set: {
            "myBackLog.$.taskOwner": userTasks.membName,
            "myBackLog.$.taskOwnerId": userTasks.membId,
    } });
    return {message: "phase added successfully!!"}
}

async function getBackLogTask(userId){
    console.log( 'in orm userId', userId)
    const getTaskLists = await db.users.findOne({ _id: userId});
    console.log('in orm: ', getTaskLists)
    return getTaskLists.tasks;
}
async function getBacklogLists(userId){
    const getBackList = await db.users.findOne({ _id: userId});
    return getBackList;
}
async function getMemberList(userId){
    const getMemberList = await db.users.findOne({ _id: userId});
    return getMemberList.myHouseMembers;
}

async function getMemberList2(userId){
    const getMemberList2 = await db.houseMembers.find({ adminId: userId});
    return getMemberList2;
}
//adding members
async function postMember( member ){
    const membData = {
        'adminId': `${member.userId}`,
        'name': `${member.membName}`,
        'membRole': `${member.membRole}`,
        'membSex': `${member.membSex}`,
        'timeTrack': `${member.timeTrack}`,
        'profileImg': `${member.profileImg}`,
    };
    const dbHouseMembers = new db.houseMembers( membData );
    const saveHouseMembers = await dbHouseMembers.save();
    return { 
        message: "member successfully created", 
    };   
}
async function postPersonalTsk( personalTsk, membId ){
    console.log('in orm ', personalTsk)
    const taskObj={
        'Task': `${personalTsk.membPersonalTasks}`,
    }
    const addPsnlTask = await db.houseMembers.findOneAndUpdate({_id: membId }, 
        { $push: {membPersonalTasks: taskObj
        } });
    return {message: "task added successfully!!"}
    //     {tasks: taskInfo}
}
//=============
async function getUserInfo(userId){
    const getUserInfo = await db.users.findOne({ _id: userId});
    return getUserInfo;
}
async function getMemberDetail(membId){
    const getMembInfo = await db.houseMembers.findOne({ _id: membId});
    return getMembInfo;
}
async function deleteMember(membId){
    const deleteMember = await db.houseMembers.deleteOne({
        "_id" : membId
    })
    return deleteMember
}
async function trackMember(membId){
    const trackMember = await db.houseMembers.findOneAndUpdate(
        { _id: membId},
            { "$set": {timeTrack: true}}
    );
    return trackMember
}
async function cancelTrackMember(membId){
    const cancelTrackMember = await db.houseMembers.findOneAndUpdate(
        { _id: membId},
            { "$set": {timeTrack: false}}
    );
    return cancelTrackMember
}
async function getDoLists(userId){
    const getDoList = await db.users.findOne({ _id: userId});
    const doListArr=[];
    getDoList.tasks.forEach(element => {
        if(element.taskDo == true){
            doListArr.push(element);
        }else return
    });
    return doListArr;
}
async function getDoingLists(userId){
    const getDoingList = await db.users.findOne({ _id: userId});
    const doingListArr=[];
    getDoingList.tasks.forEach(element => {
        if(element.taskDoing == true){
            doingListArr.push(element);
        }else return
    });
    return doingListArr;
}
async function getDoneLists(userId){
    const getDoneLists = await db.users.findOne({ _id: userId});
    const doneListArr=[];
    getDoneLists.tasks.forEach(element => {
        if(element.taskDone == true){
            doneListArr.push(element);
        }else return
    });
    return doneListArr;
}
async function completeBuckTask(bucketTask){
    const bucketId = bucketTask.bucketId
    const bucketTaskId = bucketTask.bucketTaskId
    console.log("bucketTask: ", bucketTask)
    const completeTask = await db.myBucket.findOneAndUpdate(
        { _id: bucketId, "bucketTasks._id": bucketTaskId}, 
        { $set: {"bucketTasks.$.complete": true} });

    return { message: "changes to Do"};
}
async function bucketStatus(bucketId){
    const changeBucketStatus = await db.myBucket.findOneAndUpdate(
        { _id: bucketId}, 
        { "$set": { "active": true }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is the error? ',err)
    }
    );
    return { message: "changes to Do"};
}
async function bucketStatusToFalse(bucketId){
    const changeBucketStatus = await db.myBucket.findOneAndUpdate(
        { _id: bucketId}, 
        { "$set": { "active": false }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is the error? ',err)
    }
    );
    return { message: "changes to Do"};
}
async function memberBucket(memberId){
    const memberBucket = await db.memberBuckets.find({ bucketOwnerId: memberId});
    return(memberBucket);
}

async function moveDoToDoing(userId, taskId){
    const changeDoToFalse = await db.users.updateOne(
        { _id:  userId, "tasks._id": taskId}, 
        { "$set": { "tasks.$.taskDo": "false" }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is it? ',err)
    });
    const changeDoingToTrue = await db.users.updateOne(
        { _id:  userId, "tasks._id": taskId}, 
        { "$set": { "tasks.$.taskDoing": "true" }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is it? ',err)
    });
    return { message: "Task Moved to Do"};
}
async function moveDoingToDone(userId, taskId){
    const changeDoingToFalse = await db.users.updateOne(
        { _id:  userId, "tasks._id": taskId}, 
        { "$set": { "tasks.$.taskDoing": "false" }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is it? ',err)
    });
    const changeDoneToTrue = await db.users.updateOne(
        { _id:  userId, "tasks._id": taskId}, 
        { "$set": { "tasks.$.taskDone": "true" }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is it? ',err)
    });
    return { message: "Task Moved to Do"};

}


//complete personal task
async function completePrsnlTsk(membId, personalTskId){
    const changeBucketStatus = await db.houseMembers.updateOne(
        { _id: membId, "membPersonalTasks._id": personalTskId}, 
        { "$set": { "membPersonalTasks.$.taskDone": "true" }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is it? ',err)
    })
    return { message: "changes to Do"};
}
async function updatePassCode( userId, passWordData  ){
    const saltRounds = 10;
    console.log('passWordData: ', passWordData.passCode)
    const passCodeHash = await bcrypt.hash(passWordData.passCode, saltRounds);
    console.log('passCodeHash: ', passCodeHash)
    const updatePassCode = await db.users.findOneAndUpdate(
        { _id: userId},
            { "$set": {passCode: passCodeHash}}
    );
    return { 
        message: "Member Password successfully Updated", 
    };
}

async function addBucketToDashboard(userId, bucketId){

    const addBucketToDashbrd = await db.users.findOneAndUpdate(
        { _id: userId},
            { "$push": {myDashboarBuckets: {bucketId: bucketId.bckId}}}
    );
    return { 
        message: "Member Password successfully Updated", 
    };
}
async function logMemberIn(membId, logInData){
    const loggedInData= {
        present: true,
        date: logInData.date,
    }
    const logMemberIn = await db.houseMembers.findOneAndUpdate(
        { _id: membId},
            { "$push": {timeLogIns: loggedInData}}
    );
    return { 
        message: "Member Password successfully Updated", 
    };
}
async function logMemberOut(membId, logOutData){
    // console.log('in orm logOutData.timeLogInsId: ', logOutData.logoutTime)
    const logMemberOut = await db.houseMembers.updateOne(
        { _id: membId, "timeLogIns._id": logOutData.timeLogInsId}, 
        { "$set": { 
            "timeLogIns.$.logOutTime": logOutData.logoutTime,
            "timeLogIns.$.loggedOut": true,
    }}
    )
    return { 
        message: "Member Password successfully Updated", 
    };
}









module.exports = {
    //registration: 
    registerUser,
    //login:
    loginUser,
    //posting task
    postTasks,
    postBackLogTask,
    getBacklogLists,
    postMember,
    getMemberDetail,
    getMemberList,
    getMemberList2,
    postBucket,
    getBuckets,
    bucketStatus,
    bucketStatusToFalse,
    postBucketList,
    postBucketListWithoutDelete,
    assignOwnertoTask,
    completeBuckTask,
    postMembersBucket,
    memberBucket,
    //users Information
    getUserInfo,
    getDoLists,
    getDoingLists,
    getDoneLists,
    moveDoToDoing,
    moveDoingToDone,
    postPersonalTsk,
    completePrsnlTsk,
    loginPassCode,
    updatePassCode,
    logMemberIn,
    logMemberOut,
    deleteMember,
    trackMember,
    cancelTrackMember,
    addBucketToDashboard
}