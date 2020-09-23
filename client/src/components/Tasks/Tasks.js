import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap';

function Tasks(props) {
    // console.log('taskList props',props)
    const [lgShow, setLgShow] = useState(false);
    const [ newTask, setNewTask ] = useState({ task: "", completionDate: "", userId: localStorage.id});
    const [taskList, setTasksList] = useState([]);
    const [doList, setDoList] = useState([]);
    const [doingList, setDoingList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const userId = localStorage.id

    async function moveTaskToDoing(taskId){
        console.log('taskId? ', taskId);
        const moveTaskToDoing = await fetch(`/api/moveToDoing/${userId}/${taskId}`, 
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            }
        ).then(result => result.json());
        LoadDoList();
        LoadDoingList();
    }
    async function moveTaskToDone(taskId){
        console.log('taskId? ', taskId);
        const moveTaskToDone = await fetch(`/api/moveToDone/${userId}/${taskId}`, 
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            }
        ).then(result => result.json());
        LoadDoingList();
        LoadDoneList();
    }
    async function moveDoneToArchive(id){
        console.log('id? ', id);
    }
    async function drag(e){
        console.log('is something happening')
    }
    function handleInputChange( e ){
        const { id, value } = e.target; 
        setNewTask( { ...newTask, [id]: value } );
    }
    async function createTask(e){
        e.preventDefault();
        console.log('adding task?');
        const addTask = await fetch(`/api/addTask`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            }).then( result => result.json());
        setNewTask( { task: "", completionDate: "", userId: localStorage.id } );
        setLgShow(false);
        LoadDoList();
    }
    async function LoadDoList(){
        // console.log('loading doList');
        const userId = localStorage.id
        const fetchDoList = await fetch (`/api/doList/${userId}`).then( res => res.json());
        setDoList(fetchDoList);
        console.log('fetched DoList: ', fetchDoList)
    }
    async function LoadDoingList(){
        const fetchDoingList = await fetch (`/api/doingList/${userId}`).then( res => res.json());
        setDoingList(fetchDoingList);
        console.log('fetched DoingList: ', fetchDoingList)
    }
    async function LoadDoneList(){
        const fetchDoneList = await fetch (`/api/doneList/${userId}`).then( res => res.json());
        setDoneList(fetchDoneList);
        console.log('fetched DoneList: ', fetchDoneList)
    }
    useEffect( function(){
        // loadT ask();
        LoadDoList();
        LoadDoingList();
        LoadDoneList();
    }, []);
    return (
        <div className="card col-lg-9">
            <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="taskName">Create My Task</label>
                            <input type="text" class="form-control" id="task" aria-describedby="taskHelp" onChange={handleInputChange} value={newTask.task}/>
                            <label for="phaseDate">Select DeadLine</label>
                            <input type="date" class="form-control" id="completionDate" aria-describedby="taskHelp" onChange={handleInputChange} value={newTask.completionDate}/>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={createTask}>Submit</button>
                    </form>
                </Modal.Body>
            </Modal> 
            <div className="card-header">
                <h3 class="card-title">Tasks</h3>
            </div>
            <div className="card-body row">
                <div className="doSect card col-lg-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between ">
                            <h5 class="card-title">DO</h5>
                            <i class="fas fa-plus myHover" onClick={() => setLgShow(true)} ></i>
                        </div>
                        <div id="taskSection">
                            { doList ? doList.map(tasks=>
                            <div className="card mt-2 taskHover" onClick={()=>moveTaskToDoing(tasks._id)}>
                                <div className="card-body">
                            {tasks.task}</div>
                            </div>):'nothing to show'}
                        </div>
                    </div>
                </div>
                <div className="doingSect card col-lg-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between ">
                            <h5 class="card-title">DOING</h5>
                            {/* <i class="fas fa-plus myHover" onClick={() => setLgShow(true)} ></i> */}
                        </div>
                        <div id="taskSection">
                            { doingList ? doingList.map(tasks=>
                            <div className="card mt-2 taskHover" onClick={()=>moveTaskToDone(tasks._id)}>
                                <div className="card-body">
                            {tasks.task}</div>
                            </div>):'nothing to show'}
                        </div>
                    </div>
                </div>
                <div className="doneSect card col-lg-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between ">
                            <h5 class="card-title">DONE</h5>
                        </div>
                        <div id="taskSection">
                            { doneList ? doneList.map(tasks=>
                            <div className="card mt-2 taskHover" onClick={()=>moveDoneToArchive(tasks._id)}>
                                <div className="card-body">
                            {tasks.task}</div>
                            </div>):'nothing to show'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks
