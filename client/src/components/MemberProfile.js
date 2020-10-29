import React, {useState, useEffect, useRef } from 'react';
import {Modal, Button} from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
import Avatars from  "./Avatars";
import Loader from  "./assets/Rolling-1s-200px.gif";

function MemberProfile() {
    const userId = localStorage.id
    const profileType = localStorage.profileType;
    const monthsArr =  ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const d = new Date();
    var n = d.toISOString();
    let todaysDatedate = n.slice(0,10)
    const thisMonth = (d.getMonth());
    const thisMonth2 = (d.getMonth()+1);
    const year = d.getFullYear()
    // const thisYear = (d.getYear());
    const [datesToday, setDatesToday]=useState(d)
    const today = d.getDate();
    // 2020-09-29
    const { memberId } = useParams();
    const { memberName } = useParams();
    const [Today, setToday] = useState(today);
    const [ThisMonth, setThisMonth] = useState(thisMonth);
    const [thisYear, setThisYear] = useState((d.getFullYear()));
    const [lgShow, setLgShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isTodayLogged, setIsTodayLogged] = useState(false);
    const [isMembLoggedOut, setIsMembLoggedOut] = useState(false);
    const [loggedInTime, setLoggedInTime] = useState('')
    const [loggedOutTime, setLoggedOutTime] = useState('')
    const [ memberBucket, setMemberBucket ] = useState({ bucketName: "", bucketOwner: memberName, bucketOwnerId: memberId});
    const [memberDetail, setMemberDetail] = useState({});
    const [houseHoldList, setHouseHoldList] = useState([]);
    const [bucketList, setBucketList] = useState([]);
    const [bucketTask, setBucketTask] = useState({ bktTaskName: "",bucketOwnerId: memberId, userId: localStorage.id})
    const [personalTsk, setpersonalTsk] =useState({membPersonalTasks:""})
    const [bucketState, setBucketState] = useState(
        { bktTaskName: "",bucketOwnerId: memberId, userId: localStorage.id},
    );
    const [active, setActive] = useState('')
    const [memberAvatar, setMemberAvatar] = useState({})
    const [months, setMonths] = useState(monthsArr);
    const [avatarWindow, setAvatarWindow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [timeLogInsId, setTimeLogInsId] = useState('')
    const memberListArr= [];
    function handleBucketChange(e){
        const { className, value } = e.target; 
        setBucketState({...bucketState, [className]: value });
    };
    function handleInputChange( e ){
        const { id, value } = e.target; 
        setMemberBucket( { ...memberBucket, [id]: value } );
        }
    function handlePrsnlInput( e ){
        const { id, value } = e.target; 
        setpersonalTsk( {...personalTsk, [id]: value } );
        }
    async function loadMemberDetail(){
        const fetchMember = await fetch (`/api/memberDetail/${memberId}`).then( res => res.json());
        console.log('fetched member detail is: ', fetchMember)
        console.log('todays date: ', fetchMember.timeLogIns)
        fetchMember.timeLogIns.map(today=>{
            console.log(' fetched date',today.date)
            let datefetched=today.date.slice(0,10)
            console.log(' fetched date',datefetched)
            if(todaysDatedate == datefetched){
                console.log('today already logged')
                setIsTodayLogged(true);
                setTimeLogInsId(today._id);
                setIsMembLoggedOut(today.loggedOut)
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                // let trial =new Date( todayTime); converting fetched time to javascript time and then finally converting it to localString so that it shows in local time=== lets see if it works still    lol
                const loggedInTime = new Date( today.logInTime ).toLocaleString('en-US')
                const loggedOutTime =new Date( today.logOutTime ).toLocaleString('en-US')
                console.log('loggedInTime: ', loggedInTime.slice(11,23))
            
                setLoggedInTime(loggedInTime)
                setLoggedOutTime(loggedOutTime)
            }
        })
        setMemberDetail(fetchMember)
    }
    async function loadMemberBuckets(){
        const fetchMemberBuckets = await fetch (`/api/memberBuckets/${memberId}`).then( res => res.json());
        console.log('fetched members buckets are: ', fetchMemberBuckets)
        setBucketList(fetchMemberBuckets)
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
    }
    async function completePsnlTask(prsnlTskId){
        const moveTaskToDoing = await fetch(`/api/completePrsnlTsk/${memberId}/${prsnlTskId}`, 
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            }
        ).then(result => result.json());
        loadMemberDetail()
    }
    async function LoadAllList(){
        const fetchBucketList = await fetch (`/api/getBuckets/${userId}`).then( res => res.json());
        fetchBucketList.map(list => {
            list.bucketTasks.map(subList => {
                if (subList.taskOwnerId == memberId) {
                    let newObj ={
                        complete: subList.complete,
                        taskName: subList.taskName,
                        taskOwner: subList.taskOwner,
                        taskOwnerId: subList.taskOwnerId,
                        _id: subList._id,
                        bucketId: list._id
                    }
                    memberListArr.push(newObj);
                } else {
                    console.log('nothing to add!')
                }
            })
        })
        console.log('memberListArr: ', memberListArr)
        setHouseHoldList(memberListArr);
    }
    async function createMemBucket(e){
        e.preventDefault();
        console.log('creating members bucket')
        const addMembersBucket = await fetch(`/api/addMembersBucket`, 
            {   method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memberBucket)
            }).then( result => result.json());
        setMemberBucket({ bucketName: "", bucketOwner: memberName, bucketOwnerId: memberId, userId: localStorage.id});
        setLgShow(false);
        loadMemberBuckets();
    }
    async function addBucketTasks(membBucketId){
        console.log('bucketState: ', bucketState)
        // console.log('bucketTask: ', bucketTask)
        const bucketTaskObj = {

        }
        setBucketState({bktTaskName: "",bucketOwnerId: memberId, userId: localStorage.id});
    }
    function handleKeyPress(e){
        if(e.keyCode=== 13){
            sumbitPersonalTask()
        }
    }
    async function sumbitPersonalTask(){
        if(personalTsk.membPersonalTasks !== ""){
            const fetchPersonalTsk = await fetch(`/api/addPersonaltsk/${memberId}`, 
                {   method: 'post', 
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(personalTsk)
                }).then( result => result.json());
                setpersonalTsk({membPersonalTasks:""})
                loadMemberDetail()
                setShowForm(false)
        } else
        console.log('please input something')
        setShowForm(false)
    }
    function ShowForm(){
        if( showForm == false){
            setShowForm(true)
        } else setShowForm(false)
    }
    async function logUserIn(){
        const todaysDate = {date: d};
        const apiResult = await fetch(`/api/logMemberIn/${memberId}`, 
            {   method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todaysDate)
            }).then( result => result.json());
            loadMemberDetail()
    }
    async function logUserOut(){
        console.log('timeLogInsId: ', timeLogInsId)
        const todaysDateOut = {
            logoutTime: n, 
            timeLogInsId: timeLogInsId
        };
        const apiResult = await fetch(`/api/logMemberOut/${memberId}`, 
            {   method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todaysDateOut)
            }).then( result => result.json());
            loadMemberDetail()
    }
    function makeActive(idx,src){
        console.log('src in settings: ', src)
        setActive(idx)
        setMemberAvatar({profileImgClass: src})
    }
    async function changeMembAvatar(){
        setLoading(true)
        console.log('memberAvatar: ', memberAvatar)
        const apiResult = await fetch(`/api/changeMemberAvatar/${memberId}`, 
        {   method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberAvatar)
        }).then( result=>result.json());
        loadMemberDetail();
        setLoading(false)
        setAvatarWindow(false)
    }
    useEffect(function(){
        loadMemberDetail()
        LoadAllList()
        loadMemberBuckets();
    },[])
    return (
        <div>
            <div className="d-flex justify-content-end">
            {profileType=='' || !profileType ? 
            <Link to="/Profiles" className="nav-link">
                <div class="myBtnRnd"><i class="far fa-arrow-alt-circle-left" style={{fontSize: "1.2rem"}}></i> &nbsp; Go Back</div>
            </Link>: ''}
            </div>
            <div className={avatarWindow === true ? "loaderWindow": "hide"}>
                <div className="container">
                    <div className="d-flex justify-content-end">
                        <div className="myBtn" onClick={()=>setAvatarWindow(false)}><i class="fas fa-times"></i></div>
                    </div>
                    <Avatars active={active} makeActive={makeActive} />
                    <div className={loading === true ? "loaderWindow": "hide"}>
                        <div className="loadingWnd">
                            <img className="loadingGif" src={Loader} alt="loadingWndow"/>
                        </div>
                    </div>
                    <div className="myBtn mx-auto text-center" onClick={changeMembAvatar}>Select</div>
                </div>
            </div>
            <div className="mainBox">
                <div className="darkPurpleSection mb-5">
                    <div className="row newCardLg">
                        <div className="col-3">
                            {memberDetail.profileImgClass===""?
                                <img src='https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png' alt="" class="empAvatar"/>
                                :
                                <div className={`mx-auto empAvatar ${memberDetail.profileImgClass}`}></div>
                            }
                        </div>
                        <div className="membAbout col-5">
                            <div className="d-flex">
                                <h3 className="text-capitalize">{memberDetail.name}</h3>
                                {memberDetail.timeTrack == true ? <i class="ml-3 mt-2 fas fa-stopwatch" style={{fontSize: '1.5rem', color: "#a894d1"}}></i>:''}
                            </div>
                            {profileType=='Admin' ? 
                            <div className="myBtnRnd col-4 text-center"  onClick={()=>setAvatarWindow(true)}>Select Avatar</div>
                            : ''}
                        </div>
                        <div className="logins col-4 border mx-auto text-center">
                            <h4 className="mx-auto">{Today} {months[ThisMonth]} {thisYear}</h4>
                            <div className="border todayTimeStamp">
                                {profileType=='' ? 
                                memberDetail.timeTrack == true ?
                                <div className="d-flex mx-auto">
                                    {isTodayLogged == true?<div className="myBtnRndDeactive mx-auto">Logged</div>:<div className="myBtnRnd mx-auto" onClick={logUserIn}>Log In</div>}
                                    {isTodayLogged == true?
                                    isMembLoggedOut == true ? <div className="myBtnRndDeactive mx-auto">LoggedOut</div> : <div className="myBtnRnd mx-auto" onClick={logUserOut}>Log Out</div>
                                    :<div className="myBtnRndDeactive mx-auto">Log Out</div>
                                    }
                                </div>:''
                                :''
                                }
                                {memberDetail.timeTrack == true ?
                                isTodayLogged == true ?
                                <div>
                                    <h4>times</h4>
                                    <p>logged in time: {loggedInTime.slice(11,23)} </p>
                                    {isMembLoggedOut == true ? 
                                        <p>logged Out time: {loggedOutTime.slice(11,23)} </p> :''}
                                </div> : 
                                <p> Member has not logged in today </p>: ''}
                                {profileType=='Admin' ? 
                                    <div className="d-flex mx-auto">
                                        <div className="myBtnRnd mx-auto">Sick day</div>
                                        <div className="myBtnRnd mx-auto">Leave day</div>
                                    </div>
                                    :''
                                }
                            </div>
                            <div className="timesheetSect">
                                {profileType=='Admin' ? 
                                memberDetail.timeTrack == true?
                                <Link to={`/AdminsProfile/MemberProfile/${memberDetail._id}/${memberDetail.name}/Timesheets`} >
                                    <div className="myBtnRnd col-6 text-center mx-auto">View Time Sheet</div>
                                </Link> : ''
                                :
                                memberDetail.timeTrack == true?
                                <Link to={`/MemberProfile/${memberDetail._id}/${memberDetail.name}/Timesheets`} >
                                    <div className="myBtnRnd col-6 text-center mx-auto">View Time Sheet</div>
                                </Link> : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="darkPurpleSection">
                    <div className="row">
                        <div className="householdTasks col-6">
                            <div className="newCardLg">
                                <h3>Household Task</h3>
                                <ul class="list-group mt-3 border">
                                    <div className="incomplete">
                                        {
                                            houseHoldList.map((bcktTask , idx) =>
                                                bcktTask.complete == false ? 
                                                <div key={`bck-${idx}`} class="myList d-flex" >
                                                    <div className="col-9 ">
                                                    {bcktTask.taskName}
                                                    </div>
                                                    <div className="col-3 d-flex justify-content-around">
                                                        <div className="col-2">
                                                            <i class="far fa-circle green" onClick={()=>completeTask( bcktTask.bucketId, bcktTask._id)}></i>
                                                        </div>
                                                    </div>
                                                </div> :
                                                ''
                                            )
                                        }
                                    </div>
                                    <div className="completed">
                                        {
                                            houseHoldList.map(bcktTask =>
                                                bcktTask.complete == true ? 
                                                <div class="myListDone d-flex" >
                                                    <div className="col-9 ">{bcktTask.taskName}
                                                    </div>
                                                    <div className="col-3 d-flex justify-content-around">
                                                        <div className="col-2">
                                                            <i class="fas fa-check-circle " ></i>
                                                        </div>
                                                    </div>
                                                </div> :''
                                            )
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="personalTasks col-6">
                            <div className="newCardLg">
                                <div className="d-flex justify-content-between mb-2">
                                    <h3>Personal Task</h3>
                                    <div className="circlBtn text-center" 
                                    onClick={ShowForm}
                                    ><i class="fas fa-plus"  ></i>
                                    </div>
                                </div>
                                <hr/>
                                <ul class="list-group listHeight" >
                                        { showForm == true ? <input 
                                        className="myInput2 mb-2"
                                        type="text"
                                        id='membPersonalTasks'
                                        onChange={handlePrsnlInput}
                                        value={personalTsk.membPersonalTasks}
                                        placeholder="To do ..."
                                        onKeyDown={handleKeyPress}/> : ''}
                                    <div className="incomplete">
                                        { memberDetail.membPersonalTasks ? memberDetail.membPersonalTasks.map((task,idx)=>
                                        task.taskDone == false ?
                                        <li class="myList d-flex justify-content-between" key={`task-${idx}`}>{task.Task} <i class="far fa-circle onHvr" onClick={()=>completePsnlTask(task._id)}></i></li> 
                                        : '')
                                        : 'there are no tasks' }
                                        { memberDetail.membPersonalTasks ?  memberDetail.membPersonalTasks.map((task,idx)=>
                                        task.taskDone == true ?
                                        <li class="myListDone2 d-flex justify-content-between" key={`task-${idx}`}>
                                        <div style={{textDecoration: 'line-through'}}>{task.Task}</div>
                                        <i class="fas fa-check-circle"></i></li> 
                                        : '')
                                        : 'there are no tasks' }
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="memberBuckets">
                        <div className="newCardLg">
                            <div className="d-flex justify-content-between mb-2">
                                <h3>Personal Bucket</h3>
                                <div className="circlBtn text-center" onClick={() => setLgShow(true)}>
                                    <i class="fas fa-plus"></i>
                                </div>
                                < Modal
                                size="lg"
                                show={lgShow}
                                onHide={() => setLgShow(false)}
                                aria-labelledby="example-modal-sizes-title-lg">
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Create Bucket
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                        <div class="form-group">
                                            <label for="bucketName">Bucket Name</label>
                                            <input type="text" class="form-control" id="bucketName" aria-describedby="taskHelp" onChange={handleInputChange} value={memberBucket.bucketName}/>
                                        </div>
                                        <button type="submit" class="btn btn-primary" onClick={createMemBucket}>Submit</button>
                                    </form>
                                </Modal.Body>
                            </Modal>
                            </div>
                            <hr/>
                            <div className="buckets row mx-auto">
                                { bucketList.map((bucket,idx)=>
                                    { 
                                    const bucketId = `bktTaskName-${idx}`;
                                    return (<div className="card bucket" key={`buck-${idx}`}>
                                        <div className="card-body cardTitle">
                                            <div className="d-flex justify-content-between">
                                                <h5 class="card-title ">{bucket.bucketName}</h5>
                                            </div>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <div class="d-flex pt-3 pl-3">
                                                <div key={`bucket-${idx}`}>
                                                    <input
                                                        type="text-area"
                                                        name={bucketId}
                                                        data-idx={idx}
                                                        id={bucketId}
                                                        class="myInput2"
                                                        className="bktTaskName"
                                                        value={bucketList[idx].bktTaskName}
                                                        placeholder="Add Task"
                                                        onChange={handleBucketChange}
                                                    />
                                                </div>
                                                <button  onClick={()=>addBucketTasks( bucket._id)}>
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </ul>
                                    </div>)
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberProfile
