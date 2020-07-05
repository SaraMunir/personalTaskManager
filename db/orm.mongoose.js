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
    // const taskData = {
    //     task: userTasks.task,
    //     completionDate: userTasks.completionDate,
    // };
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
async function getUserInfo(userId){
    const getUserInfo = await db.users.findOne({ _id: userId});
    return getUserInfo;
}
async function getDoLists(userId){
    // const getDoList = await db.users.find(
    //     { 
    //         '_id': `${userId}`,
    //         // "city" : { "$in": ["Pune", "Mumbai"] }
    //         'tasks': {'taskDo': 'true'}
    //     }
    // );
    const getDoList = await db.users.findOne({ _id: userId});

    // console.log('doList in orm: ', getDoList.tasks)
    const doListArr=[];
    getDoList.tasks.forEach(element => {
        // console.log('wahta?? ',element.task)
        if(element.taskDo == true){
            // console.log('which is false: ',element.task)
            doListArr.push(element);
        }else return
    });
    console.log(doListArr)

    return doListArr;
}
async function postPhase(taskPhaseData){
    console.log('something in orm: ', taskPhaseData)
    const taskId = taskPhaseData.taskId;
    const phaseInfo = {
        'phaseName': `${taskPhaseData.taskPhase.phaseName}`,
        'phaseDesc': `${taskPhaseData.taskPhase.phaseDesc}`,
        'phaseUser': `${taskPhaseData.taskPhase.phaseUser}`,
        'phaseDate': `${taskPhaseData.taskPhase.phaseDate}`,
    }
    const updatePhase = await db.tasks.findOneAndUpdate({ _id: taskId }, { $push: {phase: phaseInfo} });
    return {message: "phase added successfully!!"}

}

async function getTask( taskId ){
        console.log('in orm: ',taskId);

    const getTask = await db.tasks.find({
        "_id" : taskId
    });
    return getTask;
}
async function deleteTask( taskId ){

    // console.log('in orm: ',taskId);
    const deleteReview =await db.tasks.deleteOne( { "_id" : taskId}, function (err) {
        if (err) return handleError(err)
    });
    return { message: "Your Review has been deleted !!"};
}
async function deletePhase( phaseId, taskId  ){
    // console.log('in orm task: ', taskId);
    // console.log('in orm phase: ', phaseId);
    const deletePhase = await db.tasks.update({
        _id: taskId }, { "$pull": { 
            "phase" : { "_id": phaseId } }}, {
            safe: true, multi: true }, function(err, obj) { 
                console.log(err)
            });
            return deletePhase;
    };


module.exports = {
    //registration: 
    registerUser,
    //login:
    loginUser,
    //posting task
    postTasks,
    //users Information
    getUserInfo,
    getDoLists,


    getTasks,
    deleteTask,
    getTask,
    postPhase,
    deletePhase
}