const mongoose = require('mongoose');
// const bcrypt = require ( 'bcrypt' );

// mongoose.connect(`mongodb://${process.env.myTasks}`,{useNewUrlParser: true});

mongoose.connect(`mongodb://localhost:27017/myTasks`, {useNewUrlParser: true, useFindAndModify: false});

const db = require( './models' );

async function postTasks( userTasks ){
    const taskData = {
        taskName: userTasks.taskName,
        taskDesc: userTasks.taskDesc,
    };
    const dbTasks = new db.tasks( taskData );
    const createTasks = await dbTasks.save();
    return { 
        message: "User successfully saved", 
        // id: saveUser._id,
        // email: saveUser.email,
        // name: saveUser.name 
    };   
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
async function getTasks(){
    const getTaskLists = await db.tasks.find({});
    return getTaskLists;
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
    postTasks,
    getTasks,
    deleteTask,
    getTask,
    postPhase,
    deletePhase
}