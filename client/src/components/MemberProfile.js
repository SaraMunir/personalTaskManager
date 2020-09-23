import React, {useState, useEffect, useRef } from 'react';
import {Modal, Button} from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
const userId = localStorage.id
function MemberProfile() {
    const { memberId } = useParams();
    const { memberName } = useParams();
    const [lgShow, setLgShow] = useState(false);
    const [lgShow2, setLgShow2] = useState(false);
    const [ memberBucket, setMemberBucket ] = useState({ bucketName: "", bucketOwner: memberName, bucketOwnerId: memberId, userId: localStorage.id});
    const [memberDetail, setMemberDetail] = useState({});
    const [houseHoldList, setHouseHoldList] = useState([]);
    const [bucketList, setBucketList] = useState([]);
    const [bucketTask, setBucketTask] = useState({ bktTaskName: "",bucketOwnerId: memberId, userId: localStorage.id})

    // const blankCat = { name: '', age: '' };
    const [bucketState, setBucketState] = useState(
        { bktTaskName: "",bucketOwnerId: memberId, userId: localStorage.id},
    );
    const memberListArr= [];
    function handleBucketChange(e){
        const { className, value } = e.target; 
        setBucketState({...bucketState, [className]: value });
    };
    function handleInputChange( e ){
        const { id, value } = e.target; 
        setMemberBucket( { ...memberBucket, [id]: value } );
        }
    async function loadMemberDetail(){
        const fetchMember = await fetch (`/api/member/${userId}`).then( res => res.json());
        console.log('fetched members are: ', fetchMember)
        fetchMember.map(member => 
            {if (member._id == memberId){
                setMemberDetail(member)
            }
        })
    }
    async function loadMemberBuckets(){
        console.log('loading members buckets');
        const fetchMemberBuckets = await fetch (`/api/memberBuckets/${userId}/${memberId}`).then( res => res.json());
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
    async function LoadAllList(){
        const fetchBacklogList = await fetch (`/api/backlogList/${userId}`).then( res => res.json());
        console.log('fetched BacklogList: ', fetchBacklogList.myBackLog)
        console.log('fetched MemberList: ', fetchBacklogList.myHouseMembers)
        console.log('fetched Bucket List: ', fetchBacklogList.myBucket)
        fetchBacklogList.myBucket.map(list => {
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
    useEffect(function(){
        loadMemberDetail()
        LoadAllList()
        loadMemberBuckets();
        // console.log('teamDetail: ', teamDetail)
    },[])

    return (
        <div className="mainBox">
            <div className="darkPurpleSection mb-5">
                <div className="row newCardLg">
                    <div className="col-3">
                        <img src={memberDetail.membPic} alt="" className="membProPic"/>
                    </div>
                    <h3>{memberDetail.membName}</h3>
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
                                        houseHoldList.map(bcktTask =>
                                            bcktTask.complete == false ? 
                                            <div class="myList d-flex" >
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
                                                    {/* <div className="col-10 mr-1">
                                                    {memberList.map( memb => 
                                                        memb._id == bcktTask.taskOwnerId ? <img class="membThmSmallDisabled"src={memb.membPic} alt=""/> : '')}
                                                    </div> */}
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
                                // onClick={() => setLgShow(true)}
                                ><i class="fas fa-plus"></i>
                                </div>
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Morbi leo risus</li>
                                <li class="list-group-item">Porta ac consectetur ac</li>
                                <li class="list-group-item">Vestibulum at eros</li>
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
    )
}

export default MemberProfile
