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
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);    
    const saveData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: passwordHash
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
    console.log('in orm.mongoose is login working')

    const userData = await db.users.findOne({ email: email });
    if( !userData ) {
        return { error: "Couldn't find that email. Register or try again!" };
    }

    const isValidPassword = await bcrypt.compare( password, userData.password );
    if( !isValidPassword ) {
        return { error: "Invalid password" };
    }

    // remap the data into the specified fields as we are using camelCase
    return {
        message: "user successfully loggedin",
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
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
        'bucketName': `${userTasks.bucketName}`,
        'bucketOwnerId': `${userTasks.bucketOwnerId}`
    }
    const addBucket = await db.users.findOneAndUpdate({ _id: userTasks.userId }, { $push: {myBucket: bucketInfo} });
    return {message: "phase added successfully!!"}
}
async function postMembersBucket( bucketData ){
    console.log('in orm memberbucke data is: ', bucketData)
// bucketName: "", bucketOwner: memberName, bucketOwnerId: memberId, userId: localStorage.id
    const saveData = {
        userId: bucketData.userId,
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
    const addBucket = await db.users.findOneAndUpdate(
        { _id: userTasks.userId,  "myBucket._id": userTasks.bucketId  }, 
        { $push: {"myBucket.$.bucketTasks": taskData} });

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
    const addBucket = await db.users.findOneAndUpdate(
        {    _id: userTasks.userId,
            "myBucket._id": userTasks.bucketId  }, 
        { $push: {"myBucket.$.bucketTasks": taskData} });
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
//adding members
async function postMember( employee ){
    // const teamID = employee.teamId;
    const userId = employee.userId;

    const membData = {
        'membName': `${employee.membName}`,
        'membDesc': `${employee.membDesc}`,
        'membRole': `${employee.membRole}`,
        'membSex': `${employee.membSex}`,
        'membPic': `${employee.membPic}`,
    };
    const createMember = await db.users.findOneAndUpdate({ _id: employee.userId }, { $push: {myHouseMembers: membData} });
    console.log(createMember)
    return { 
        message: "member successfully created", 
    };   
}
//=============
async function getUserInfo(userId){
    const getUserInfo = await db.users.findOne({ _id: userId});
    return getUserInfo;
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
    const userId = bucketTask.userId
    const bucketId = bucketTask.bucketId
    const bucketTaskId = bucketTask.bucketTaskId
    console.log("bucketTask: ", bucketTask)

    const completeBckTsk = await db.users.findOneAndUpdate(
    { _id: userId},
    { "$set": 
    {   "myBucket.$[updateBucket].bucketTasks.$[bucketTasks].complete": "true" }},   {
        "arrayFilters": 
            [
                {"updateBucket._id" : bucketId},
                {"bucketTasks._id" : bucketTaskId}
            ]
        }
    );
    return { message: "changes to Do"};
}
async function bucketStatus(userId, bucketId){
    const changeBucketStatus = await db.users.updateOne(
        { _id: userId, "myBucket._id": bucketId}, 
        { "$set": { "myBucket.$.active": "true" }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is it? ',err)
    }
    
    );
    return { message: "changes to Do"};
}
async function memberBucket(userId, memberId){
    const memberBucket = await db.memberBuckets.find({ bucketOwnerId: memberId,   userId: userId});

    // const userData = await db.users.findOne({ email: email });

    console.log('in orm memberBucket: ', memberBucket)
    
    return(memberBucket);
}
async function bucketStatusToFalse(userId, bucketId){
    const changeBucketStatus = await db.users.updateOne(
        { _id: userId, "myBucket._id": bucketId}, 
        { "$set": { "myBucket.$.active": "false" }}, { safe: true, multi:true }, function(err, obj) {
        console.log('what is it? ',err)
    });
    return { message: "changes to Do"};
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
    getMemberList,
    postBucket,
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
    moveDoingToDone


}