import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap';
import { Redirect , useHistory } from 'react-router-dom';
import Buckets from './Buckets/Buckets'
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
        if(taskType === "Recurring"){
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
                loadBuckets();
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
                loadBuckets();

        }
        
    }
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
                loadMembersList()

    }
    async function changeStatus(bucketId, activeStatus){
        console.log('changing status to active: ', bucketId);
        console.log('changing status to active: ', activeStatus);
        if(activeStatus === false ){
            const fetchChangeStatus = await fetch (`/api/bucketActiveList/${userId}/${bucketId}`).then( res => res.json());
        } else {
            const changeStatusToFalse = await fetch (`/api/bucketActivetoFalse/${userId}/${bucketId}`).then( res => res.json());
        }
        LoadAllList();
        loadBuckets();
    }
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
            loadBuckets()
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
        loadBuckets();
    }
    async function LoadAllList(){
        const fetchBacklogList = await fetch (`/api/backlogList/${userId}`).then( res => res.json());
        setBacklogList(fetchBacklogList.myBackLog);
    }
    async function loadMembersList(){
        const fetchMember2 = await fetch (`/api/getMember/${userId}`).then( res => res.json());
        setMemberList(fetchMember2);
    }
    async function loadBuckets(){
        const fetchBucketList = await fetch (`/api/getBuckets/${userId}`).then( res => res.json());
        console.log("fetchBucketList: ",fetchBucketList)
        setBucketList(fetchBucketList)
    }
    useEffect( function(){
        loadMembersList()
        LoadAllList();
        loadBuckets();
    }, []);
    return (
        <div class="container-fluid mainBox">
            { !userId ? <Redirect to='/welcomePage' /> : ''}
            <div className="">
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
                    <div className="backLogList row">
                        <div className="recurringList newCardLg col-lg-6 mx-auto">
                            <h4>Recurring List</h4>
                            <div className="listHeight">
                                {backlogList.map((list, idx) => 
                                    list.taskType === "Recurring" ?
                                    <div key={`lists-${idx}`} class="list-group-item">
                                        <div className="d-flex">
                                            <p class="col-8">{list.taskName}</p>
                                            <div className="col-4 d-flex">
                                                <div className="col-5">
                                                    {memberList.map( (memb, idx) => 
                                                        memb._id === list.taskOwnerId ? 
                                                        <div className="hoverNmSh">
                                                            <img key={`membS-${idx}`} class="membThmSmall"src={memb.profileImg} alt=""/>
                                                            <span className="hoverName">{memb.name} </span>
                                                        </div>
                                                        : '')}
                                                </div>
                                                <div className="d-flex">
                                                    <div className="Assign mr-1">
                                                        <div class="dropdown">
                                                            <div class="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">      <i class="fas       fa-user-tag"></i>
                                                                <span className="hoverName">Assign Member</span>
                                                            </div>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                {memberList.length === 0 ?
                                                                <div class="dropdown-item">there is nothing to add?</div> :
                                                                memberList.map( (member, idx) =>
                                                                    <div 
                                                                    key={`mebs-${idx}`} class="dropdown-item"  onClick={()=>assignOwner(list._id, list.taskName, member._id, member.name)}>{member.name}  
                                                                    <div class="dropdown-divider"></div>
                                                                    </div>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="MoveTo">
                                                        <div class="dropdown">
                                                            <div class="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  <i class="fas fa-arrow-alt-circle-right"></i>
                                                            <span className="hoverName">Move to</span>
                                                            </div>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                {bucketList.length === 0 ?
                                                                <div class="dropdown-item">there is nothing to add?</div> :
                                                                bucketList.map( (bucket, idx) =>
                                                                    <div 
                                                                    key={`buckets2-${idx}`} class="dropdown-item"  onClick={()=>moveTask(list._id, 
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
                                    </div>
                                    : '')}
                            </div>
                        </div>
                        <div className="adhocList myCardLg col-lg-6 mx-auto">
                            <h4>Adhoc List</h4>
                            <div className="listHeight">
                                {backlogList.map((list, idx) => 
                                    list.taskType == "Adhoc" ?
                                    <div key={`lists-${idx}`} class="list-group-item">
                                        <div className="d-flex">
                                            <p class="col-8">{list.taskName}</p>
                                            <div className="col-4 d-flex">
                                                <div className="col-5">
                                                    {memberList.map( (memb, idx) => 
                                                        memb._id === list.taskOwnerId ? 
                                                        <div className="hoverNmSh">
                                                            <img key={`membS-${idx}`} class="membThmSmall"src={memb.profileImg} alt=""/>
                                                            <span className="hoverName">{memb.name} </span>
                                                        </div>
                                                        : '')}
                                                </div>
                                                <div className="d-flex">
                                                    <div className="Assign mr-1">
                                                        <div class="dropdown">
                                                            <div class="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">      <i class="fas       fa-user-tag"></i>
                                                                <span className="hoverName">Assign Member</span>
                                                            </div>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                {memberList.length === 0 ?
                                                                <div class="dropdown-item">there is nothing to add?</div> :
                                                                memberList.map( (member, idx) =>
                                                                    <div 
                                                                    key={`mebs-${idx}`} class="dropdown-item"  onClick={()=>assignOwner(list._id, list.taskName, member._id, member.name)}>{member.name}  
                                                                    <div class="dropdown-divider"></div>
                                                                    </div>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="MoveTo">
                                                        <div class="dropdown">
                                                            <div class="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  <i class="fas fa-arrow-alt-circle-right"></i>
                                                            <span className="hoverName">Move to</span>
                                                            </div>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                {bucketList.length === 0 ?
                                                                <div class="dropdown-item">there is nothing to add?</div> :
                                                                bucketList.map( (bucket, idx) =>
                                                                    <div 
                                                                    key={`buckets2-${idx}`} class="dropdown-item"  onClick={()=>moveTask(list._id, 
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
                                    </div>
                                    :
                                    '')}

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
                                        {memberList.map( (member, idx) => 
                                        <option key={`opti-${idx}`} value={member._id}>{member.name}</option>
                                        )}
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary" onClick={createBucket}>Submit</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    <Buckets bucketList={bucketList} changeStatus={changeStatus} completeTask={completeTask} memberList={memberList}/>
                </div>
            </div>
        </div>
    )
}

export default BackLog
