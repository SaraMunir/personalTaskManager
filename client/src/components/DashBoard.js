import React, {useState, useContext, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap';
import Tasks from './Tasks/Tasks'
import GroceryList from './Grocery/GroceryList'
function DashBoard() {

    const [userInfo, setUserInfo] = useState([]);
    const [taskList, setTasksList] = useState([]);
    const [allBucketList, setAllBucketList] = useState([]);
    const [dashbrdBuckets, setDashbrdBuckets] = useState([]);
    const [bucketNums, setBucketNums] = useState();
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );


    const userId = localStorage.id
    async function loadUserInfo(){
        console.log('loading tasks');
        const userId = localStorage.id
        const fetchUserInfo = await fetch (`/api/userInfo/${userId}`).then( res => res.json());
        console.log('number of bucket: ', fetchUserInfo.myDashboarBuckets.length)
        setDashbrdBuckets(fetchUserInfo.myDashboarBuckets)
        setBucketNums(fetchUserInfo.myDashboarBuckets.length);
        setUserInfo(fetchUserInfo);
        setTasksList(fetchUserInfo.tasks);
    }
    async function loadBuckets(){
        const fetchBucketList = await fetch (`/api/getBuckets/${userId}`).then( res => res.json());
        console.log("fetchBucketList: ",fetchBucketList)
        setAllBucketList(fetchBucketList)
    }
    async function addToDashBoard(bckId){
        let doesBucktExist = false
            userInfo.myDashboarBuckets.map( async (buckets)=>{
            if(buckets.bucketId === bckId){
                doesBucktExist = true;
                setAlertMessage( { type: 'danger', message: 'Bucket is already in your list!' } );
                setTimeout(function(){  setAlertMessage( { type: '', message: '' } ); }, 2000);
                return;
            } 
        }) 
        if (doesBucktExist === false){
            let bucketId={bckId}
            const apiResult = await fetch(`/api/addToDashboard/${userId}`, 
                {   method: 'PUT',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bucketId)
                }).then( result => result.json());
                loadUserInfo()
                return
        }
    }
    async function removeBuckt(bckId ){
        console.log('bucket id: ', bckId)
        let bucketId={bckId}

        const apiResult = await fetch(`/api/removeFromDashboard/${userId}`, 
        {   method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bucketId)
        }).then( result => result.json());
        loadUserInfo()
    }
    useEffect( function(){
        loadUserInfo()
        loadBuckets()
    }, []);
    return (
        <div className="container-fluid" >
            <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}</div>
            <div className="row mx-auto">
                {/* <Tasks taskList={taskList} doList={doList} loadUserInfo={loadUserInfo}/> */}
                {/* <GroceryList /> */} 
                <div className="border mx-auto" style={{width:'68%'}}>
                    <div className="d-flex justify-content-between">
                        <h4>Buckets</h4>
                        <div class="dropdown show">
                            {bucketNums >= 3 ? '' : <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Buckets</a>}
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {allBucketList.length === 0 ?
                                <div class="dropdown-item">there is nothing to add?</div> :
                                allBucketList.map( (bucket, idx) =>
                                    <div 
                                    key={`buckets2-${idx}`} class="dropdown-item" onClick={()=>addToDashBoard(bucket._id)}>{bucket.bucketName}  
                                        <div class="dropdown-divider"></div>
                                    </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="lists bucketsCntnr row mx-auto">
                    {dashbrdBuckets.map(dashBuckets=>
                        allBucketList.map(allBucks=>
                        allBucks._id === dashBuckets.bucketId ? 
                        <div className='buckets mx-auto'>
                            <div className="d-flex justify-content-between">
                                <h5>{allBucks.bucketName}</h5>
                                <div className="hoverNmSh">
                                    <i class="fas fa-times-circle" style={{cursor: 'pointer', padding: '5px'}} onClick={()=>removeBuckt(dashBuckets.bucketId )}
                                    ></i>
                                    <span className="hoverName" style={{top: '-40px', right: '20px', width: '150px'}}>remove bucket</span>
                                </div>
                            </div>
                            <hr/>
                            <div className='buckTaskCnt'>
                                {allBucks.bucketTasks.length=== 0 ? 'nothing to show':
                                allBucks.bucketTasks.map(task=>
                                <div className='bucketTasks d-flex justify-content-between'>{task.taskName}
                                <div className="toDoBtn"></div>
                                </div>)}
                            </div>
                        </div>
                        :''
                        ))
                    }
                    </div>
                </div>
                <div className="border mx-auto" style={{width:'30%'}}>
                    <h4>Grocery List</h4>
                    <hr/>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
