import React, {useState, useContext, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap';
import Tasks from './Tasks/Tasks'
import GroceryList from './Grocery/GroceryList'
import Loader from './assets/Rolling-1s-200px.gif'

function DashBoard() {

    const [userInfo, setUserInfo] = useState([]);
    const [taskList, setTasksList] = useState([]);
    const [allBucketList, setAllBucketList] = useState([]);
    const [dashbrdBuckets, setDashbrdBuckets] = useState([]);
    const [bucketNums, setBucketNums] = useState();
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const [loading, setLoading] = useState(false);

    const [ myShoppingList, setMyShoppingList] = useState([]);

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
    async function loadShoppingList(){
        const fetchMyShoppingList = await fetch (`/api/loadMyShoppingList/${userId}`).then( res => res.json());
        console.log('My ShoppingLists: ',fetchMyShoppingList);
        fetchMyShoppingList.map(shop=>{
            if(shop.completed === false){
                let numOfList = shop.list.length
                let num = 0;
                shop.list.map(listItm=>{
                    if(listItm.done === true){
                        num = num + 1
                    }
                })
                if (numOfList === num){
                    completeShoppingList(shop._id)
                }
            }
        })
        setMyShoppingList(fetchMyShoppingList)
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
            loadBuckets()
            setLoading(false)

    }
    async function completeShoppingList(shopId){
        setLoading(true)
        const completeShoppingList = await fetch (`/api/completeShoppingList/${shopId}`).then( res => res.json());
        loadShoppingList()
        setLoading(false)
    }
    async function itemBought(listId, listItemId){
        let finishedObj = {
            listId: listId, 
            listItemId: listItemId,
            userId: localStorage.id 
        }
        setLoading(true)

        const completingShoppingList = await fetch(`/api/completingShoppingList`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finishedObj)
            }).then( result => result.json());
            loadShoppingList()
            setLoading(false)
    }
    useEffect( function(){
        loadUserInfo()
        loadBuckets()
        loadShoppingList()
    }, []);
    return (
        <div className="">
            <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}</div>
                <div className={loading === true ? "loaderWindow": "hide"}>
                <div className="loadingWnd">
                    <img className="loadingGif" src={Loader} alt="loadingWndow"/>
                </div>
            </div>
            <div className="row mx-auto container-fluid">
                {/* <GroceryList /> */} 
                <div className="border mx-auto col-8">
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
                                        task.complete === false ?
                                        <div className='bucketTasks d-flex justify-content-between'>
                                        {task.taskName}
                                        <div className="toDoBtn" onClick={()=>completeTask(allBucks._id, task._id)}></div>
                                    </div>
                                    :
                                    ''
                                    )}
                                    {allBucks.bucketTasks.length=== 0 ? 'nothing to show':
                                    allBucks.bucketTasks.map(task=>
                                        task.complete === true ?
                                    <div className='bucketTasksDone d-flex justify-content-between'>
                                        {task.taskName}
                                        <div className="toDoBtnDone"></div>
                                    </div>
                                    :
                                    ''
                                    )}
                                </div>
                            </div>
                            :''
                            ))
                        }
                    </div>
                </div>
                <div className="border mx-auto col-4">
                    <div className="">
                        <h4>Grocery List</h4>
                        <hr/>
                        <div className="groceryHeight">
                            {myShoppingList.map((listItem, idx)=>
                                listItem.completed === false ?
                                <div class="">
                                    <div className="card-body">
                                        <h5>{listItem.tittle}</h5>
                                        <ul className="list-group">
                                        { listItem.list.map((list, idx)=>
                                            list.done === false?
                                            <div class="list-group-item justify-content-between d-flex">
                                            <p className="col-6">{list.ItemName}</p>
                                            <p className="col-4">{list.ItemAmount}</p>
                                            <i class="far fa-square onHvrPr" onClick={()=>itemBought(listItem._id, list._id)}></i>
                                            </div> 
                                            :
                                            '')}
                                        { listItem.list.map((list, idx)=>
                                            list.done === true?
                                            <div class="list-group-item justify-content-between d-flex">
                                            <p className="col-6">{list.ItemName}</p>
                                            <p className="col-4">{list.ItemAmount}</p>
                                            <i class="fas fa-check-square" style={{color: "#ab73da"}}></i>
                                            </div> 
                                            :'')}
                                            
                                        </ul>
                                    </div>
                                    <hr/>
                                </div>
                                :''
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
