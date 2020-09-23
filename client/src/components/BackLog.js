import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap';

function BackLog() {
    const [lgShow, setLgShow] = useState(false);
    const [lgShow2, setLgShow2] = useState(false);
    const [ backLogTask, setBackLogTask ] = useState({ taskName: "", completionDate: "", taskType: "", userId: localStorage.id});
    const [ bucket, setBucket ] = useState({ bucketName: "", bucketOwner: "",bucketOwnerId: "", userId: localStorage.id});
    const [backlogList, setBacklogList] = useState([]);
    const [bucketList, setBucketList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [bucketTaskList, setBucketTaskList] = useState([]);
    const [bucketCmpTaskList, setBucketCmpTaskList] = useState([]);

    const [ dropDown, setDropDown ] = useState( { type: ""} );
    const [ showSome, setShowSome ] = useState( { type: ""} );


    const userId = localStorage.id;

    function handleInputChange( e ){
        const { id, value } = e.target; 
        setBackLogTask( { ...backLogTask, [id]: value } );
        setBucket( { ...bucket, [id]: value } );
    }
    async function createBackLogTask(e){
        e.preventDefault();
        console.log('adding task?');
        const addBacklogTask = await fetch(`/api/addBacklogTask`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(backLogTask)
            }).then( result => result.json());
        setBackLogTask({ task: "", completionDate: "", taskType: "", userId: localStorage.id });
        setLgShow(false);
        LoadAllList();
    }

    // list._id, list.taskName, list.taskType, bucket._id
    // list._id, list.taskName, list.taskType, list.taskOwner,list.taskOwnerId, bucket._id
    async function moveTask(backlogId, taskName, taskType, taskOwner,taskOwnerId, bucketId){
        console.log('is it working?')
        let listObj = {
            backlogId: backlogId, 
            bucketId: bucketId, 
            taskName: taskName,
            taskOwner: taskOwner,
            taskOwnerId: taskOwnerId,
            userId: localStorage.id 
        }
        if(taskType == "Recurring"){
            console.log('do nothing')
            const addBacklogTaskNotDelete = await fetch(`/api/bucketTaskList/Recurring`, 
                {   method: 'post', 
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(listObj)
                }).then( result => result.json());
                LoadAllList();
            return
        } else {
            const addBacklogTask = await fetch(`/api/bucketTaskList`, 
                {   method: 'post', 
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(listObj)
                }).then( result => result.json());
                LoadAllList();
        }
        
    }

    // list._id, list.taskName, member._id, member.membName
    async function assignOwner(taskId, taskName, membId, membName){
        console.log(membName);
        let taskObj = {
            taskId: taskId, 
            taskName: taskName, 
            membId: membId,
            membName: membName,
            userId: localStorage.id 
        }
        const assignOwnertoTask = await fetch(`/api/assignOwnertoTask`, 
                {   method: 'post', 
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(taskObj)
                }).then( result => result.json());
                LoadAllList();
    }
    async function changeStatus(bucketId, activeStatus){
        console.log('changing status to active: ', bucketId);
        console.log('changing status to active: ', activeStatus);
        if(activeStatus == false ){
            const fetchChangeStatus = await fetch (`/api/bucketActiveList/${userId}/${bucketId}`).then( res => res.json());
        } else {
            const changeStatusToFalse = await fetch (`/api/bucketActivetoFalse/${userId}/${bucketId}`).then( res => res.json());
        }
        LoadAllList()
    }

    //bucket._id, task._id
    async function completeTask(bucketId, bucketTaskId){
        let completeObj = {
            bucketId: bucketId, 
            bucketTaskId: bucketTaskId,
            userId: localStorage.id 
        }
        console.log('bucketId: ', bucketId)
        console.log('bucketTaskId: ', bucketTaskId)
        const completingTask = await fetch(`/api/completingTask`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(completeObj)
            }).then( result => result.json());
            LoadAllList();
    }
    async function createBucket(e){
        e.preventDefault();
        console.log('bucket', bucket);
        const addBucket = await fetch(`/api/addBucket`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bucket)
            }).then( result => result.json());
        setBucket({ task: "", completionDate: "", userId: localStorage.id });
        setLgShow2(false);
        LoadAllList();
    }
    async function LoadAllList(){
        // console.log('loading doList');
        const fetchBacklogList = await fetch (`/api/backlogList/${userId}`).then( res => res.json());
        console.log('fetched BacklogList: ', fetchBacklogList.myBackLog)
        console.log('fetched MemberList: ', fetchBacklogList.myHouseMembers)
        console.log('fetched Bucket List: ', fetchBacklogList.myBucket)
        
        // fetchBacklogList.myBucket.map(Bucket=>{
        //     bucket.bucketTasks.sort((a, b) => (a.complete - b.complete))
        // })

        setBacklogList(fetchBacklogList.myBackLog);
        setMemberList(fetchBacklogList.myHouseMembers);
        setBucketList(fetchBacklogList.myBucket);


    }
    function showSomethign(){
        console.log('somethign to be shown?');
        if(dropDown.type==''){
            setDropDown( { type: 'myMenu', message: 'friend already exist in your list!' } )
        } else {
            setDropDown( { type: '', message: '' } )
        }
    }
    useEffect( function(){
        // loadT ask();
        LoadAllList();
    }, []);
    return (
        <div class="container-fluid mainBox">
            <div className="darkPurpleSection">
                <div className="pt-4 pb-4">
                    <div className="d-flex justify-content-between">
                        <h3>Backlog List</h3>
                        <div className="circleLabel d-flex">
                            <div className="label">add list</div> 
                            <div className="circlBtn text-center" onClick={() => setLgShow(true)}>
                                <i class="fas fa-plus"></i>
                            </div>
                        </div>
                    </div>
                    < Modal
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
                                    <input type="text" class="form-control" id="taskName" aria-describedby="taskHelp" onChange={handleInputChange} value={backLogTask.taskName}/>
                                </div>
                                <label for="taskType">Select Type</label>
                                <select 
                                    id="taskType" class="form-control" value={backLogTask.taskType} 
                                    onChange={handleInputChange} >
                                        <option selected>Choose...</option>
                                        <option value='Recurring'>Recurring </option>
                                        <option value='Adhoc'>Adhoc </option>
                                        
                                </select>
                                <button type="submit" class="btn btn-primary" onClick={createBackLogTask}>Submit</button>
                            </form>
                        </Modal.Body>
                        </Modal>
                    <div className="backLogList">
                        <div className="recurringList newCardLg">
                            <h4>Recurring List</h4>
                            {backlogList.map(list => 
                                list.taskType == "Recurring" ?<div class="list-group-item">
                                    <div className="d-flex">
                                        <p class="col-8">{list.taskName}</p>
                                        <div className="col-4 d-flex">
                                            <div className="col-3">
                                                {memberList.map( memb => 
                                                    memb._id == list.taskOwnerId ? <img class="membThmSmall"src={memb.membPic} alt=""/> : '')}
                                            </div>
                                            <div className="col-9 d-flex">
                                                <div className="Assign mr-1">
                                                    <div class="dropdown">
                                                        <button class="myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Assign to
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            {memberList.length == 0 ?
                                                            <div class="dropdown-item">there is nothing to add?</div> :
                                                            memberList.map( member =>
                                                                <div class="dropdown-item"  onClick={()=>assignOwner(list._id, list.taskName, member._id, member.membName)}>{member.membName}  
                                                                <div class="dropdown-divider"></div>
                                                                </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="MoveTo">
                                                    <div class="dropdown">
                                                        <button class="myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Move to
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            {bucketList.length == 0 ?
                                                            <div class="dropdown-item">there is nothing to add?</div> :
                                                            bucketList.map( bucket =>
                                                                <div class="dropdown-item"  onClick={()=>moveTask(list._id, 
                                                                list.taskName, list.taskType, list.taskOwner,list.taskOwnerId, bucket._id)}>{bucket.bucketName}  
                                                                <div class="dropdown-divider"></div>
                                                                </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>:
                                '')}
                        </div>
                        <div className="adhocList myCardLg">
                            <h4>Adhoc List</h4>
                            {backlogList.map(list => 
                                list.taskType == "Adhoc" ?<div class="list-group-item">
                                    <div className="d-flex">
                                    <p class="col-8">{list.taskName}</p>
                                    <div className="col-4 d-flex">
                                        <div className="col-3">
                                            {memberList.map( memb => 
                                                memb._id == list.taskOwnerId ? <img class="membThmSmall"src={memb.membPic} alt=""/> : '')}
                                        </div>
                                        <div className="col-9 d-flex">
                                            <div className="Assign mr-1">
                                                <div class="dropdown">
                                                    <button class="myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Assign to
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        {memberList.length == 0 ?
                                                        <div class="dropdown-item">there is nothing to add?</div> :
                                                        memberList.map( member =>
                                                            <div class="dropdown-item"  onClick={()=>assignOwner(list._id, list.taskName, member._id, member.membName)}>{member.membName}  
                                                            <div class="dropdown-divider"></div>
                                                            </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="MoveTo">
                                                <div class="dropdown">
                                                    <button class="myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Move to
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        {bucketList.length == 0 ?
                                                        <div class="dropdown-item">there is nothing to add?</div> :
                                                        bucketList.map( bucket =>
                                                            <div class="dropdown-item"  onClick={()=>moveTask(list._id,
                                                            list.taskName, 
                                                            list.taskType, 
                                                            list.taskOwner,
                                                            list.taskOwnerId, bucket._id)}>{bucket.bucketName}  
                                                            <div class="dropdown-divider"></div>
                                                            </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    </div>
                                </div>:
                                '')}
                        </div>
                        <div className="myDropDown">
                            <div className="myBtn col-3" onClick={showSomethign}>Trial button</div>
                            <div class={ dropDown.type ? `${dropDown.type} col-3` : 'hide' }>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorum a dicta vero veniam soluta 
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorum a dicta vero veniam soluta 
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="border pt-4 pb-4 pr-4 pl-4 basket">
                <div className="baskets">
                    <h3>bucket List</h3>
                    <button type="button" class="btn btn-primary" onClick={() => setLgShow2(true)}>Create Buckets  <i class="fab fa-bitbucket"></i></button>
                    <Modal
                    size="lg"
                    show={lgShow2}
                    onHide={() => setLgShow2(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Basket
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div class="form-group">
                                    <label for="bucketName">Create My Basket</label>
                                    <input type="text" class="form-control" id="bucketName" aria-describedby="taskHelp" onChange={handleInputChange} value={bucket.bucketName}/>
                                    <label for="bucketOwnerId">Select Owner</label>
                                    <select 
                                    id="bucketOwnerId" class="form-control" value={bucket.bucketOwnerId} 
                                    onChange={handleInputChange} >
                                        <option selected>Choose...</option>
                                        {memberList.map( member => 
                                        <option value={member._id}>{member.membName}</option>
                                        )}
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary" onClick={createBucket}>Submit</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    <div className="buckets row mx-auto">
                        {bucketList.map( bucket=>
                            <div class="card bucket" >
                                <div class="card-body cardTitle">
                                    <div className="d-flex justify-content-end">
                                        {bucket.active == false ? <i class="fas fa-circle grey" onClick={()=>changeStatus(bucket._id, bucket.active)}></i> : <i class="fas fa-circle green" onClick={()=>changeStatus(bucket._id, bucket.active)}></i>}
                                    </div>
                                    <h5 class="card-title ">{bucket.bucketName}</h5>
                                </div>
                                <ul class=" list-group list-group-flush">
                                    <div className="incomplete">
                                        {
                                            bucket.bucketTasks.map(bcktTask =>
                                                bcktTask.complete == false ? 
                                                <div class="myList d-flex" >
                                                    <div className="col-9 ">
                                                    {bcktTask.taskName}
                                                    </div>
                                                    <div className="col-3 d-flex justify-content-around">
                                                        <div className="col-10 mr-1">
                                                        {memberList.map( memb => 
                                                            memb._id == bcktTask.taskOwnerId ? <img class="membThmSmall"src={memb.membPic} alt=""/> : '')}
                                                        </div>
                                                        <div className="col-2">
                                                            <i class="far fa-circle green" onClick={()=>completeTask(bucket._id, bcktTask._id)}></i>
                                                        </div>
                                                    </div>
                                                </div> :
                                                ''
                                            )
                                        }
                                    </div>
                                    <div className="completed">
                                        {
                                            bucket.bucketTasks.map(bcktTask =>
                                                bcktTask.complete == true ? 
                                            <div class="myListDone d-flex" >
                                                <div className="col-9 ">{bcktTask.taskName}
                                                </div>
                                                <div className="col-3 d-flex justify-content-around">
                                                    <div className="col-10 mr-1">
                                                    {memberList.map( memb => 
                                                        memb._id == bcktTask.taskOwnerId ? <img class="membThmSmallDisabled"src={memb.membPic} alt=""/> : '')}
                                                    </div>
                                                    <div className="col-2">
                                                        <i class="fas fa-check-circle " ></i>
                                                    </div>
                                                </div>
                                            </div> :
                                                ''
                                            )
                                        }
                                        
                                    </div>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackLog
