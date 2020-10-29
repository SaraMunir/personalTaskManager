import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap';
import { Redirect , useHistory } from 'react-router-dom';
import Buckets from './Buckets/Buckets'
import Loader from './assets/Rolling-1s-200px.gif'
function BackLog() {
    const [lgShow, setLgShow] = useState(false);
    const [lgShow2, setLgShow2] = useState(false);
    const [compareWndow, setCompareWndow] = useState(false);
    const [activeBucket, setActiveBucket] = useState( {id: '', status: false});
    const [loading, setLoading] = useState(false);
    const [ backLogTask, setBackLogTask ] = useState({ taskNameRec: "",taskNameAdh: "",  userId: localStorage.id});
    const [ bucket, setBucket ] = useState({ bucketName: "", bucketOwner: "",bucketOwnerId: "", userId: localStorage.id});
    const [backlogList, setBacklogList] = useState([]);
    const [compareBuckets, setCompareBuckets] = useState([]);
    const [compareMembTasks, setCompareMembTasks] = useState([]);
    const [bucketList, setBucketList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [bucketTaskList, setBucketTaskList] = useState([]);
    const [bucketCmpTaskList, setBucketCmpTaskList] = useState([]);
    const [ bucketDetail, setBucketDetail] = useState( '' );
    const [ showSome, setShowSome ] = useState( { type: ""} );

    const [ taskInput, setTaskInput ] = useState("");


    const [dragItem, setDragItem] = useState([
        {id: '1', text: '1st item'},
        {id: '2', text: '2nd item'},
        {id: '3', text: '3rd item'},
        {id: '4', text: '4th item'},
        {id: '5', text: '5th item'} ])
    const [draggingItem, setDraggingItem] = useState({})
    const [dropZone1, setDropZone1] = useState([])
    const [dropZone2, setDropZone2] = useState([])
    
    const userId = localStorage.id;

    function handleInputChange( e ){
        const { id, value } = e.target; 
        setBackLogTask( { ...backLogTask, [id]: value } );
        setBucket( { ...bucket, [id]: value } );
    }
    async function createBackLogTask(type){
        if(type === 'Recurring'){
            if(backLogTask.taskNameRec ===''){
                return
            }
            setLoading(true)
            let newObj = {
                taskName: backLogTask.taskNameRec,
                taskType: type,
                userId: backLogTask.userId
            }
            console.log('newObj: ', newObj)
            const addBacklogTask = await fetch(`/api/addBacklogTask`, 
                {   method: 'post', 
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newObj)
                }).then( result => result.json());
            setBackLogTask({ taskNameRec: "",taskNameAdh: "",  userId: localStorage.id });
            LoadAllList();
            setLoading(false)
        }
        if(type === 'Adhoc'){
            if(backLogTask.taskNameAdh ===''){
                return
            }
            setLoading(true)
            let newObj = {
                taskName: backLogTask.taskNameAdh,
                taskType: type,
                userId: backLogTask.userId
            }
            console.log('newObj: ', newObj)
            const addBacklogTask = await fetch(`/api/addBacklogTask`, 
                {   method: 'post', 
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newObj)
                }).then( result => result.json());
            setBackLogTask({ taskNameRec: "",taskNameAdh: "",  userId: localStorage.id });
            LoadAllList();
            setLoading(false)
        }
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
        setLoading(true)

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
            setLoading(false)

    }
    async function createBucket(e){
        if(bucket.bucketName === ''){
            return
        }
        setLoading(true)
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
        setBucket({ bucketName: "", bucketOwner: "",bucketOwnerId: "", userId: localStorage.id });
        setLgShow2(false);
        LoadAllList();
        loadBuckets();
        setLoading(false)
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
    const drag1 = (item) => e => {
        console.log('item dragged ', item)
        // e.preventDefault();
        // e.dataTransfer.setData("text", item);
        // dropItem, setDropItem
        setDraggingItem(item)
        // setDropItem([...dropItem, item])
    }
    const drag = (item, bucketId) => e => {
        console.log('item dragged ', item)
        let newObj= {
            taskItm: item, 
            bucketId: bucketId
        }
        setDraggingItem(newObj)
    }
    function allowDrop(ev) {
        ev.preventDefault();
    }
    const drop1 = (zone) => e =>  {
        console.log('dragging item: ', draggingItem)
        // e.preventDefault();
        // dragItem, setDragItem
        let oldArr = [...dragItem]
        let newArr = oldArr.filter(item=> item.id !== draggingItem.id)
        console.log('newArr: ', newArr)
        setDragItem(newArr)
        const {id} = e.target
        console.log('id : ', id )
        if(zone=== 'zone1'){
            // dropZone1, setDropZone1
            setDropZone1([...dropZone1, draggingItem])
        }
        if(zone=== 'zone2'){
            // dropZone1, setDropZone1
            setDropZone2([...dropZone2, draggingItem])
        }

    }
    const drop = (bucketId) => e =>  {
        console.log('dragging item: ', draggingItem)
        console.log("dropped bucketId: ", bucketId)
        if (draggingItem.bucketId === bucketId){
            console.log('its the same bucket. so dont do anything')
            return
        }else{
            const newObj = {
                bucketId: bucketId,
                taskName: draggingItem.taskItm.taskName, 
                taskOwner: draggingItem.taskItm.taskOwner, 
                taskOwnerId: draggingItem.taskItm.taskOwnerId
            }
            moveAndDelete(newObj, draggingItem)
        }

    }
    async function moveAndDelete(newObj, draggingItem){
        console.log('newObj: ', newObj)
        console.log('draggingItem: ', draggingItem)
        setLoading(true)
        const moveTaskToAnother = await fetch(`/api/bucketTaskList/Recurring`, 
                {   method: 'post', 
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newObj)
                }).then( result => result.json());

            const deleteTaskFromOld = await fetch(`/api/deleteTaskFromOldBucket`, 
                {   method: 'post', 
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(draggingItem)
                }).then( result => result.json());
            LoadAllList();
            loadBuckets();
            setLoading(false)
            return }
    async function addToCompareList(id, type){
        // console.log("compareObj : ",id)
        // console.log("compareBuckets: ", compareBuckets)
        if (type === 'buckets'){
            if(compareBuckets.length>0){
                let isBcktAv = false
                compareBuckets.map(buckt=>{
                    if(buckt === id){
                        isBcktAv = true
                    }
                })
                if(isBcktAv == true){
                    return
                }else {
                    setCompareBuckets([...compareBuckets, id])
                }
            }else{
                setCompareBuckets([...compareBuckets, id])
            }
        }
        // compareMembTasks, setCompareMembTasks
        if (type === 'memberTasks'){
            if(compareMembTasks.length>0){
                let isBcktAv = false
                compareMembTasks.map(buckt=>{
                    if(buckt === id){
                        isBcktAv = true
                    }
                })
                if(isBcktAv == true){
                    return
                }else {
                    setCompareMembTasks([...compareMembTasks, id])
                }
            }else{
                setCompareMembTasks([...compareMembTasks, id])
            }
        }
    }
    function refresh(){
        setCompareMembTasks([])
        setCompareBuckets([])

    }
    function showDetail(bucktId){
        console.log(bucktId);
        setActiveBucket({id: bucktId, status: true})
        bucketList.map(bkt=>{
            if(bkt._id === bucktId){
                // console.log('selected bucket is : ', bkt)
                setBucketDetail(bkt._id)
            }
        })
    }
    function  handleTaskInputChange(e){
        const newInput = e.target.value;
            setTaskInput(newInput);
        }
    
    async function changeOwner(bucketId, bucketTskId, memberId, memberName){
        setLoading(true)
        let chngObj ={
            bucketId: bucketId, 
            bucketTskId: bucketTskId, 
            memberId: memberId, 
            memberName: memberName
        } 
        console.log('chngObj: ', chngObj)
        const addBucket = await fetch(`/api/changeOwner`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chngObj)
            }).then( result => result.json());
        loadMembersList()
        LoadAllList();
        loadBuckets();
        setLoading(false)

    }
    async function addTask(bucketId){
        if(taskInput===''){
            console.log('no input?????')
            return
        }
        setLoading(true)
        const taskObj ={
            bucketId: bucketId,
            taskName: taskInput
        }
        const addBcktTask = await fetch(`/api/addBucketTask`, 
        {   method: 'post', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskObj)
        }).then( result => result.json());
        setTaskInput("")
        loadBuckets();
        setLoading(false)
    }
    async function deleteTask(bucketId, bucketTskId){
        setLoading(true)
        let deletObj ={
            bucketId: bucketId, 
            bucketTskId: bucketTskId
        } 
        const deleteTasksBckt = await fetch(`/api/deleteBucketTask`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deletObj)
            }).then( result => result.json());
        loadMembersList()
        LoadAllList();
        loadBuckets();
        setLoading(false)

    }
    async function deleteBckt(bucketId){
        setLoading(true)
        let deleteBktObj ={
            bucketId: bucketId
        } 
        const deleteBucket = await fetch(`/api/deleteBucket`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteBktObj)
            }).then( result => result.json());
            // setActiveBucket({id: bucktId, status: true})
        setBucketDetail('')
        loadMembersList()
        LoadAllList();
        loadBuckets();
        setLoading(false)
    }
    function sortBy( type){
        let newBktLst = [...bucketList]
        if(type === 'name A-Z'){
            let sortedBktLst =  newBktLst.sort((a,b)=>
            {
                let x= a.bucketName
                let y= b.bucketName
                return (x > y ? 1 : -1 )}
                );
            console.log('sortedBktLst: ', sortedBktLst)
            setBucketList(sortedBktLst)
        }
        if(type === 'name Z-A'){
            let sortedBktLst =  newBktLst.sort((a,b)=>
            {
                let x= a.bucketName
                let y= b.bucketName
                return (y > x ? 1 : -1 )}
                );
            console.log('sortedBktLst: ', sortedBktLst)
            setBucketList(sortedBktLst)
        }
        if(type === 'dateCreated(old-latest)'){
            let sortedBktLst =  newBktLst.sort((a,b)=>
            {
                let x= a.createdAt
                let y= b.createdAt
                return (x > y ? 1 : -1 )}
                );
            setBucketList(sortedBktLst)
        }
        if(type === 'dateCreated(latest-old)'){
            let sortedBktLst =  newBktLst.sort((a,b)=>
            {
                let x= a.createdAt
                let y= b.createdAt
                return (y > x ? 1 : -1 )}
                );
            setBucketList(sortedBktLst)
        }
        if(type === 'dateModified(old-latest)'){
            let sortedBktLst =  newBktLst.sort((a,b)=>
            {
                let x= a.updatedAt
                let y= b.updatedAt
                return (x > y ? 1 : -1 )}
                );
            setBucketList(sortedBktLst)
        }
        if(type === 'dateModified(latest-old)'){
            let sortedBktLst =  newBktLst.sort((a,b)=>
            {
                let x= a.updatedAt
                let y= b.updatedAt
                return (y > x ? 1 : -1 )}
                );
            setBucketList(sortedBktLst)
        }
    }
    async function editTask(){
        console.log('edit')
    }
    useEffect( function(){
        loadMembersList()
        LoadAllList();
        loadBuckets();
    }, []);
    return (
        <div className="container-fluid mainBox">
            { !userId ? <Redirect to='/welcomePage' /> : ''}
            <div className={loading === true ? "loaderWindow": "hide"}>
                <div className="loadingWnd">
                    <img className="loadingGif" src={Loader} alt="loadingWndow"/>
                </div>
            </div>
            <div className={compareWndow === true ? "compareWindow" : "hide"}>
                <div className="d-flex justify-content-between">
                    <h4>Compare Window</h4>
                    <div className="col-lg-6 d-flex justify-content-between">
                        <div className="myBtn cursor" onClick={refresh}> <i className="fas fa-sync"></i> Refresh</div>
                        <div className="MoveTo">
                            <div className="dropdown">
                                <div className="myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                    Add Buckets to Compare
                                </div>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {bucketList.length === 0 ?
                                    <div className="dropdown-item">there is nothing to add?</div> :
                                    bucketList.map( (bucket, idx) =>
                                        <div 
                                        key={`buckets2-${idx}`} className="dropdown-item"  onClick={()=>addToCompareList(bucket._id, 'buckets')}>{bucket.bucketName}  
                                            <div className="dropdown-divider"></div>
                                        </div>
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className="Assign mr-1">
                            <div className="dropdown">
                                <div className="myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas       fa-user-tag"></i> Add members tasks </div>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {memberList.length === 0 ?
                                    <div className="dropdown-item">there is nothing to add?</div> :
                                    memberList.map( (member, idx) =>
                                    <div key={`mebs-${idx}`} className="dropdown-item"  onClick={()=>addToCompareList(member._id, 'memberTasks')}>{member.name}  
                                        <div className="dropdown-divider"></div>
                                    </div>
                                        )}
                                </div>
                            </div>
                        </div>
                        <i className="fas fa-times cursor" style={{fontSize: '1.3rem'}} onClick={()=>setCompareWndow(false)}></i>
                    </div>
                </div>
                <div className="compareContnr container">
                    <div className="border mb-2">
                        <h5>Compare by Members Task</h5>
                        <div className="row">
                            { compareMembTasks.map((membId, idx)=>
                                <div key={`compMmbtsk${idx}`} className="newCardLg col-5 ">
                                    <div className="card-body">
                                    {memberList.map((memb, idxidx)=>
                                        memb._id === membId ? 
                                        <div key={`compMmb${idx}`} className="d-flex justify-content-between">
                                            <h4>{memb.name}</h4>
                                            {memb.profileImgClass === '' ?<img  className="membThmSmall"src='https://www.shankarainfra.com/img/avatar.png' alt=""/>
                                            :
                                            <div className={`membThmSmall ${memb.profileImgClass}`}></div> }
                                            <i className="fas fa-times"></i>
                                        </div> 
                                        : '' )}
                                        <ul className=" list-group list-group-flush">
                                            <div className="incomplete">
                                            {bucketList.map((list, idx)=>
                                            list.bucketTasks.map(subList=>
                                                subList.taskOwnerId === membId ?
                                                <div  key={`bktLst${idx}`} className="myList d-flex">{subList.taskName}</div>: ''
                                                ))}</div>
                                        </ul> 
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="border">
                        <h5>Compare by Buckets</h5>
                        <div className="row">
                            { compareBuckets.length>0 ?
                            bucketList.map((bucket, idx)=>
                            compareBuckets.map(comObj=>
                                bucket._id === comObj ?
                            <div key={`buckt-${idx}`} className="newCardLg col-5 " >
                                <div className="card-body">
                                    <div className="d-flex justify-content-end">
                                        {bucket.active == false ? <i className="fas fa-circle grey" onClick={()=>changeStatus(bucket._id, bucket.active)}></i> : <i className="fas fa-circle green" onClick={()=>changeStatus(bucket._id, bucket.active)}></i>}
                                    </div>
                                    <h5 className="card-title ">{bucket.bucketName}</h5>
                                </div>
                                <ul className=" list-group list-group-flush">
                                    <div className="incomplete" onDrop={drop(bucket._id)} onDragOver={allowDrop}>
                                        {bucket.bucketTasks.map((bcktTask, idx) =>
                                            bcktTask.complete == false ? 
                                            <div draggable="true" onDragStart={drag(bcktTask,bucket._id)}   key={`bcktTasks-${idx}`}  className="myList d-flex" >
                                                <div className="col-9 ">
                                                {bcktTask.taskName}
                                                </div>
                                                <div className="col-3 d-flex justify-content-around">
                                                    <div className="col-10 mr-1">
                                                    {memberList.map( (memb, idx) => 
                                                        memb._id == bcktTask.taskOwnerId ? 
                                            memb.profileImgClass === '' ?<img  className="membThmSmall"src='https://www.shankarainfra.com/img/avatar.png' alt=""/>
                                            :
                                            <div className={`membThmSmall ${memb.profileImgClass}`}></div> 
                                                        : '')}
                                                    </div>
                                                    <div className="col-2">
                                                        <i className="far fa-circle green" onClick={()=>completeTask(bucket._id, bcktTask._id)}></i>
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                        )
                                        }
                                    </div>
                                </ul>
                            </div> : '' ) )
                            : 
                            <div className="container">
                                <p>add buckets to start comparing</p>
                            </div> }
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="Buckets container-fluid card border pt-4 pb-4">
                <div className="">
                    <div className='row'>
                        <div  className="mx-auto col-md-5">
                            <h3 className="mt-3">bucket List <span>{bucketList.length}</span> </h3>
                            <div className="d-flex mx-auto col-lg-12">
                                <input id="bucketName" type="text" className="form-control myInputFrm" placeholder="enter bucket name to create a new bucket" onChange={handleInputChange}
                                value={bucket.bucketName} aria-describedby="basic-addon2"/>
                                <div className="input-group-append" onClick={createBucket}>
                                    <span className="input-group-text addBtn" id="basic-addon2">
                                        <i className="fas fa-plus mt-1" ></i>
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 d-flex justify-content-end mx-auto col-lg-12">
                                <div className="dropdown">
                                    <div className="myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-sort-amount-up"></i> sort </div>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <div className="dropdown-item" onClick={()=>sortBy('name A-Z')}>By Name (A-Z)  
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item" onClick={()=>sortBy('name Z-A')}>By Name (Z-A)  
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item"  onClick={()=>sortBy('dateCreated(old-latest)')}>By Date Created (Oldest to Latest) 
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item"  onClick={()=>sortBy('dateCreated(latest-old)')}>By Date Created (Latest to Oldest) 
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item"  onClick={()=>sortBy('dateModified(old-latest)')}>By Date Modified (Oldest to Latest) 
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item"  onClick={()=>sortBy('dateModified(latest-old)')}>By Date Modified (Latest to Oldest)
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Buckets activeBucket={activeBucket} showDetail={showDetail} bucketList={bucketList} changeStatus={changeStatus} completeTask={completeTask} memberList={memberList} deleteBckt={deleteBckt}/>
                        </div>
                        {/* BUCKET DETAILS */}
                        <div className="col-md-7 taskDetailWnd " style={{paddingBottom: '10px', paddingTop: '10px'}}>
                            <div className="col-lg-12"> 
                                {bucketDetail !== ''?
                                bucketList.map((bucket, idx)=>
                                bucketDetail === bucket._id ?
                                <div key={`buckeT${idx}`}>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title mt-3">{bucket.bucketName}</h5>
                                        <div className="hoverNmSh">
                                            <i className="myBtn fas fa-trash-alt cursor" style={{padding: "14px"}} onClick={()=>deleteBckt(bucket._id)}></i>
                                            <span className="hoverName">Delete</span>
                                        </div>
                                    </div>
                                    <ul className="listWdth list-group list-group-flush">
                                        <div className="input-group myList">
                                            <input type="text" className="form-control noColor" placeholder="add task" aria-label="enter list item"
                                            onChange={handleTaskInputChange}
                                            value={taskInput} aria-describedby="basic-addon2"/>
                                            <div className="input-group-append" onClick={()=>addTask(bucket._id)}>
                                                <span className="input-group-text addBtn" id="basic-addon2">
                                                    <i className="fas fa-plus mt-1" ></i>
                                                </span>
                                            </div>
                                        </div>
                                    </ul>
                                    <div className="detailTaskLst">
                                        <ul className="listWdth list-group list-group-flush">
                                            <div>
                                                {bucket.bucketTasks.map((bcktTask, idx) =>
                                                    bcktTask.complete == false ? 
                                            <div key={`bcktTasks-${idx}`}  className="myList d-flex" >
                                                <div className="col-lg-9 ">{bcktTask.taskName}</div>
                                                <div className="d-flex justify-content-around">
                                                    <div className=" mr-1">
                                                    { bcktTask.taskOwnerId === "undefined" || !bcktTask.taskOwnerId || bcktTask.taskOwnerId === "" ?
                                                    <div className="hoverNmSh">
                                                        <img  className="membThmSmall"src='https://www.shankarainfra.com/img/avatar.png' alt=""/>
                                                        <span className="hoverName2">Unassigned </span>
                                                    </div>
                                                    :
                                                    memberList.map( (memb, idx) => 
                                                        memb._id == bcktTask.taskOwnerId ? 
                                                        <div key={`membSss-${idx}`} className="hoverNmSh">
                                                            {memb.profileImgClass === '' ?<img  className="membThmSmall"src='https://www.shankarainfra.com/img/avatar.png' alt=""/>
                                                            :
                                                            <div className={`membThmSmall ${memb.profileImgClass}`}></div> }
                                                            <span className="hoverName2">{memb.name} </span>
                                                        </div>: ''
                                                        )
                                                    }
                                                    </div>
                                                    <div className="Assign mr-1">
                                                        <div className="dropdown">
                                                            <div className="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">      
                                                            <i className="fas       fa-user-tag"></i>
                                                                <span className="hoverName">Assign Member</span>
                                                            </div>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                {memberList.length === 0 ?
                                                                <div className="dropdown-item">there is nothing to add?</div> :
                                                                memberList.map( (member, idx) =>
                                                                <div key={`mebs-${idx}`} className="dropdown-item"  onClick={()=>changeOwner(bucket._id, bcktTask._id, member._id, member.name  
                                                                    )}>{member.name}  
                                                                    <div className="dropdown-divider"></div>
                                                                </div>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="hoverNmSh mr-1">
                                                        <i className="myBtn fas fa-trash-alt cursor" style={{padding: "12px 8px"}} onClick={()=>deleteTask(bucket._id, bcktTask._id)}></i>
                                                        <span className="hoverName">delete</span>
                                                    </div>
                                                    <div className="hoverNmSh">
                                                        {/* <i class="fas fa-edit"></i> */}
                                                        <i className="myBtn fas fa-edit cursor" style={{padding: "12px 8px"}} onClick={()=>editTask(bucket._id, bcktTask._id)}></i>
                                                        <span className="hoverName">Edit</span>
                                                    </div>
                                                </div>
                                        </div> :
                                                    '')}
                                            </div>
                                            <div>
                                                {
                                                bucket.bucketTasks.map((bcktTask,idx) =>
                                                    bcktTask.complete == true ? 
                                        <div key={`bcktTaska-${idx}`} className="myListDone d-flex" >
                                                <div className="col-9 ">{bcktTask.taskName}</div>
                            {/* {memb.profileImgClass === '' ?<img  className="membThmSmall"src='https://www.shankarainfra.com/img/avatar.png' alt=""/> :
                            <div className={`membThmSmall ${memb.profileImgClass}`}></div> } */}
                                                    <div className="col-3 d-flex justify-content-around">
                                                        <div className="col-10 mr-1">
                                                        {memberList.map( (memb, idx) => 
                                                            memb._id == bcktTask.taskOwnerId ? 
                                                            // <img 
                                                            // key={`membsss-${idx}`}className="membThmSmallDisabled"src={memb.profileImg} alt=""/>
                            memb.profileImgClass === '' ?
                            <img  className="membThmSmall"src='https://www.shankarainfra.com/img/avatar.png' alt=""/> :
                            <div className={`membThmSmall ${memb.profileImgClass}`}></div> 
                                                            
                                                            : '')}
                                                        </div>
                                                        <div className="col-2">
                                                            <i className="fas fa-check-circle " ></i>
                                                        </div>
                                                    </div>
                                                </div> : '')}
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                : '')
                            : <div>
                                <h5 className="card-title  mt-3">Bucket Detail</h5>
                                <div className="detailTaskLst"></div>
                            </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="BackLogs">
                <div className="pt-4 pb-4">
                    <div className="d-flex justify-content-between">
                        <h3>Backlog List</h3>
                        <div className="d-flex justify-content-between">
                            <div>
                                <div className="myBtn mt-2 mr-2 cursor" onClick={()=>setCompareWndow(true)}>Open Compare</div>
                            </div>
                            <div className="circleLabel d-flex">
                                <div className="label">add list</div> 
                                <div className="circlBtn text-center" onClick={() => setLgShow(true)}>
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* BACKLOG:  */}
                    <div className="BackLogList container-fluid card mx-auto  pt-4 pb-4">
                        <div className="row">
                            <div className="recurringList  col-lg-6 mx-auto">
                                <h4>Recurring List</h4>
                                <div className="d-flex mx-auto col-lg-12 list-group-item ">
                                    <input type="text" className="noColor form-control " id="taskNameRec" placeholder="Enter task to input" aria-describedby="taskHelp" onChange={handleInputChange} value={backLogTask.taskNameRec}/>
                                    {/* taskNameRec: "",taskNameAdh */}
                                    <div className="input-group-append" onClick={()=>createBackLogTask('Recurring')}>
                                        <span className="input-group-text " id="basic-addon2">
                                            <i className="fas fa-plus mt-1" ></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="listHeight">
                                    {backlogList.map((list, idx) => 
                                        list.taskType === "Recurring" ?
                                        <div key={`lists-${idx}`} className="list-group-item">
                                            <div className="d-flex">
                                                <p className="col-8">{list.taskName}</p>
                                                <div className="col-4 d-flex">
                                                    <div className="col-5 ">
                                                        {memberList.map( (memb, idx2) => 
                                                            memb._id === list.taskOwnerId ? 
                                                            <div key={`membSss-${idx2}`} className="hoverNmSh">
                                                        {memb.profileImgClass === '' ? <img  className="membThmSmall"src='https://www.shankarainfra.com/img/avatar.png' alt=""/> : <div className={`membThmSmall ${memb.profileImgClass}`}></div> }
                                                                <span className="hoverName">{memb.name} </span>
                                                            </div>
                                                            : '')}
                                                    </div>
                                                    <div className="d-flex ">
                                                        <div className="Assign mr-1">
                                                            <div className="dropdown ">
                                                                <div className="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">      <i className="fas       fa-user-tag"></i>
                                                                    <span className="hoverName">Assign Member</span>
                                                                </div>
                                                                <div className="dropDnHght dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    {memberList.length === 0 ?
                                                                    <div className="dropdown-item">there is nothing to add?</div> :
                                                                    memberList.map( (member, idx) =>
                                                                        <div 
                                                                        key={`mebs-${idx}`} className="dropdown-item"  onClick={()=>assignOwner(list._id, list.taskName, member._id, member.name)}>{member.name}  
                                                                        <div className="dropdown-divider"></div>
                                                                        </div>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="MoveTo">
                                                            <div className="dropdown">
                                                                <div className="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  <i className="fas fa-arrow-alt-circle-right"></i>
                                                                <span className="hoverName">Move to</span>
                                                                </div>
                                                                <div className="dropdown-menu dropDnHght" aria-labelledby="dropdownMenuButton">
                                                                    {bucketList.length === 0 ?
                                                                    <div className="dropdown-item">there is nothing to add?</div> :
                                                                    bucketList.map( (bucket, idx) =>
                                                                        <div 
                                                                        key={`buckets2-${idx}`} className="dropdown-item"  onClick={()=>moveTask(list._id, 
                                                                        list.taskName, list.taskType, list.taskOwner,list.taskOwnerId, bucket._id)}>{bucket.bucketName}  
                                                                        <div className="dropdown-divider"></div>
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
                            <div className="adhocList col-lg-6 mx-auto">
                                <h4>Adhoc List</h4>
                                <div className="d-flex mx-auto col-lg-12 list-group-item ">
                                    <input type="text" className="noColor form-control " id="taskNameAdh" placeholder="Enter task to input" aria-describedby="taskHelp" onChange={handleInputChange} value={backLogTask.taskNameAdh}/>
                                    {/* taskNameRec: "",taskNameAdh */}
                                    <div className="input-group-append" onClick={()=>createBackLogTask('Adhoc')}>
                                        <span className="input-group-text " id="basic-addon2">
                                            <i className="fas fa-plus mt-1" ></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="listHeight">
                                    {backlogList.map((list, idx) => 
                                        list.taskType == "Adhoc" ?
                                        <div key={`lists-${idx}`} className="list-group-item">
                                            <div className="d-flex">
                                                <p className="col-8">{list.taskName}</p>
                                                <div className="col-4 d-flex">
                                                    <div className="col-5">
                                                        {memberList.map( (memb, idx) => 
                                                            memb._id === list.taskOwnerId ? 
                                                            <div className="hoverNmSh">
                                                                {memb.profileImgClass === '' ? <img  className="membThmSmall"src='https://www.shankarainfra.com/img/avatar.png' alt=""/> : <div className={`membThmSmall ${memb.profileImgClass}`}></div> }
                                                                <span className="hoverName">{memb.name} </span>
                                                            </div>
                                                        : '')}
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="Assign mr-1">
                                                            <div className="dropdown">
                                                                <div className="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">      <i className="fas       fa-user-tag"></i>
                                                                    <span className="hoverName">Assign Member</span>
                                                                </div>
                                                                <div className="dropdown-menu dropDnHght" aria-labelledby="dropdownMenuButton">
                                                                    {memberList.length === 0 ?
                                                                    <div className="dropdown-item">there is nothing to add?</div> :
                                                                    memberList.map( (member, idx) =>
                                                                        <div 
                                                                        key={`mebs-${idx}`} className="dropdown-item"  onClick={()=>assignOwner(list._id, list.taskName, member._id, member.name)}>{member.name}  
                                                                        <div className="dropdown-divider"></div>
                                                                        </div>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="MoveTo">
                                                            <div className="dropdown">
                                                                <div className="hoverNmSh myBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  <i className="fas fa-arrow-alt-circle-right"></i>
                                                                <span className="hoverName">Move to</span>
                                                                </div>
                                                                <div className="dropdown-menu dropDnHght" aria-labelledby="dropdownMenuButton">
                                                                    {bucketList.length === 0 ?
                                                                    <div className="dropdown-item">there is nothing to add?</div> :
                                                                    bucketList.map( (bucket, idx) =>
                                                                        <div 
                                                                        key={`buckets2-${idx}`} className="dropdown-item"  onClick={()=>moveTask(list._id, 
                                                                        list.taskName, list.taskType, list.taskOwner,list.taskOwnerId, bucket._id)}>{bucket.bucketName}  
                                                                        <div className="dropdown-divider"></div>
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
            </div>
        </div>
    )
}

export default BackLog
