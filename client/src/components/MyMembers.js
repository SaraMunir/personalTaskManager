import React, {useState, useEffect, useRef } from 'react';
import {Modal, Button} from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
import { Redirect , useHistory } from 'react-router-dom';
import Loader from  "./assets/Rolling-1s-200px.gif";
import Avatars from  "./Avatars";

function MyMembers() {
    const userId = localStorage.id
    const inputPassword = useRef();
    const [loading, setLoading] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const [avatarWindow, setAvatarWindow] = useState(false);
    const [ myMember, setMyMember ] = useState({ membName: "", membDesc: "", profileImg: "", profileImgClass: "", membRole: "", membSex: "", userId: `${userId}`, timeTrack: false});
    const [membersList, setMembersList] = useState([]);
    const [membersList2, setMembersList2] = useState([]);
    const [selectedMember, setSelectedMember] = useState({})
    const [ showModal, setShowModal ] = useState(false)
    const [ deleteModal, setDeleteModal ] = useState(false)
    const [ trackerModal, setTrackerModal ] = useState(false)
    const [active, setActive] = useState('')

    function handleInputChange( e ){
        const { id, value } = e.target; 
        setMyMember( { ...myMember, [id]: value } );
        }
    async function loadMembers(){
        const fetchMember = await fetch (`/api/getMember/${userId}`).then( res => res.json());
        console.log('fetched members are 2: ', fetchMember)
        setMembersList(fetchMember)
    }
    async function submitMember(e){
        setLoading(true)
        e.preventDefault();
        console.log("myMember: ", myMember)
        const apiResult = await fetch('/api/member', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myMember)
            }).then( result=>result.json());
            console.log(apiResult.message)
            setMyMember({ membName: "", membDesc: "", profileImg: "", profileImgClass: "", membRole: "", membSex: "", userId: `${userId}`, timeTrack: false})
        setLgShow(false);
        loadMembers()
        setLoading(false)
    }
    async function deleteMemb(memberId){
        console.log('employee id : ', memberId)
        const deleteMember = await fetch (`/api/deleteMember/${memberId}`).then( res => res.json());
        loadMembers()
        openModal( '', 'Delete' )
    }
    async function trackMember(memberId){
        // console.log('employee id : ', memberId)
        const trackMember = await fetch (`/api/trackMember/${memberId}`).then( res => res.json());
        loadMembers()
        openModal( '', 'TimeTracker' )
    }
    async function cancelMemberTracking(memberId){
        console.log('employee id : ', memberId)
        const trackMember = await fetch (`/api/cancelMemberTracking/${memberId}`).then( res => res.json());
        loadMembers()
        openModal( '', 'TimeTracker' )
    }
    function setTimeTrack(bool){
        if(bool == true){
            setMyMember( { ...myMember, timeTrack: true } );
            return
        } else {
            setMyMember( { ...myMember, timeTrack: false } );
            return
        }
    }
    function openModal(member, type){
        console.log('member: ', member)
        if(type == 'Delete'){
            if(showModal==false){
                setShowModal(true)
                setDeleteModal(true)
                setSelectedMember(member);
                return
            }else{
                setShowModal(false)
                setDeleteModal(false)
                setSelectedMember({});
                return
            }
        }
        if(type == 'TimeTracker'){
            if(showModal==false){
                setShowModal(true)
                setTrackerModal(true)
                setSelectedMember(member);
                return
            }else{
                setShowModal(false)
                setTrackerModal(false)
                setSelectedMember({});
                return
            }
        }
    }
    function makeActive(idx,src){
        // // console.log('idx ', idx)
        // console.log('src ', src)
        setActive(idx)
        setMyMember({ ...myMember, profileImgClass: src})
    }
    useEffect(function(){
        loadMembers()
        // console.log('teamDetail: ', teamDetail)
    },[])
    return (
        <div>
            { userId ? '' : <Redirect to='/welcomePage'/>}
            <div className={loading === true ? "loaderWindow": "hide"}>
                <div className="loadingWnd">
                    <img className="loadingGif" src={Loader} alt="loadingWndow"/>
                </div>
            </div>
            {/* avatarWindow, setAvatarWindow */}
            <div className={avatarWindow === true ? "loaderWindow": "hide"}>
                <div className="container">
                    <div className="d-flex justify-content-end">
                        <div className="myBtn cursor" onClick={()=>setAvatarWindow(false)}><i class="fas fa-times"></i></div>
                    </div>
                    <Avatars active={active} makeActive={makeActive} />
                    <div className="myBtn" onClick={()=>setAvatarWindow(false)}>Select</div>
                </div>
            </div>
            {showModal == true ? <div className="delConfWndo">
                <div className="card">
                    { deleteModal == true ? 
                    <div className="card-body col-10 mx-auto text-center">
                        <div className={`empAvatar mx-auto ${selectedMember.profileImgClass}`}></div> 
                        <h3>{selectedMember ? selectedMember.name : ''}</h3>
                        <h4>Are you sure You would like to delete member?</h4>
                        <div className="d-flex mx-auto col-6">
                            <div class="col-5 btn myBtn mx-auto" onClick={()=>openModal(selectedMember._id,'Delete')}>Cancel</div>
                            <div class="col-5 btn myBtn mx-auto"onClick={()=>deleteMemb(selectedMember._id)}>Yes</div>
                        </div>
                    </div>
                    : ''}
                    { trackerModal == true ? 
                    <div className="card-body col-10 mx-auto text-center">
                        <div className={`empAvatar mx-auto ${selectedMember.profileImgClass}`}></div>
                        <h3>{selectedMember ? selectedMember.name : ''}</h3>
                        {selectedMember.timeTrack === false ?
                        <div>
                            <h4>Are you sure You would like to track this member?</h4>
                            <div className="d-flex mx-auto col-6">
                                <div class="col-5 btn myBtn mx-auto" onClick={()=>openModal(selectedMember._id,'TimeTracker')}>Cancel</div>
                                <div class="col-5 btn myBtn mx-auto"onClick={()=>trackMember(selectedMember._id)}>Yes</div>
                            </div>
                        </div> :
                        <div>
                            <h4>Are you sure You want to cancel tracking for this member?</h4>
                            <div className="d-flex mx-auto col-6">
                                <div class="col-5 btn myBtn mx-auto" onClick={()=>openModal(selectedMember._id,'TimeTracker')}>Cancel</div>
                                <div class="col-5 btn myBtn mx-auto"onClick={()=>cancelMemberTracking(selectedMember._id)}>Yes</div>
                            </div>
                        </div> 
                        }
                    </div>
                    : ''}
                </div>
            </div> : ''}
            <div className=" mb-4 mx-auto col-12">
                <div className="mx-auto col-2">
                    {/* <Button className="myBtn mx-auto"></Button> */}
                    <div className="myBtn mx-auto cursor text-center"  onClick={() => setLgShow(true)}>Add Member</div>
                </div>
                <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg"> Member
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div class="form-group">
                                <label for="membName">Member Name</label>
                                <input type="text" class="form-control" 
                                id="membName" aria-describedby="taskHelp" onChange={handleInputChange} 
                                value={myMember.membName}/>
                                <label for="membRole">Role</label>
                                <input type="text" class="form-control" 
                                id="membRole" aria-describedby="taskHelp" onChange={handleInputChange} 
                                value={myMember.membRole}/>
                                <div className="myBtn mt-3 text-center" onClick={()=>setAvatarWindow(true)}>Select Avatar</div>
                                <div className="form-group mt-3">
                                    <label for="membSex">Add Time Tracker</label>
                                    <div className="d-flex">
                                        <div className="d-flex  col-1 mr-2">
                                            {myMember.timeTrack === true ?<i class="fas fa-circle myRadioActive"></i> : <i class="far fa-circle myRadio" onClick={()=>setTimeTrack(true)}></i>}
                                            <p className="myRadioOp">Yes</p>
                                        </div>
                                        <div className="d-flex col-1">
                                            {myMember.timeTrack === false ?<i class="fas fa-circle myRadioActive"></i> : <i class="far fa-circle myRadio"  onClick={()=>setTimeTrack(false)}></i>}
                                            <p className="myRadioOp">No</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="membSex">Select Sex</label>
                                    <select 
                                    id="membSex" class="form-control" value={myMember.membSex} 
                                    onChange={handleInputChange} >
                                        <option selected>Choose...</option>
                                        <option value='F'>Female</option>
                                        <option value='M'>Male</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </div> 
                            </div>
                            <button type="submit" class="btn btn-primary" onClick={submitMember}>Submit</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
            <div className="border">
                <div className="row container mx-auto">
                {membersList.length == 0 ? 
                <h4 class="mt-5 mx-auto">You have not added any members yet</h4>
                : membersList.map( (member, idx)=>
                    <div class="card myCard mx-auto">
                        <div className="d-flex justify-content-between ">
                        {/* <i class="fas fa-stopwatch"></i> */}
                        {member.timeTrack == true ? <i class="mb-2 mt-3 ml-3 fas fa-stopwatch" style={{fontSize: '1.5rem', color: "#a894d1"}}></i> : 
                        <i class="mb-2 mt-3 ml-3 fas fa-stopwatch" style={{fontSize: '1.5rem', color: "#a894d100"}}></i>
                        }
                            <div className="col-2 mb-2 mt-2 mr-2 relative showEditMenu border cursor" >
                                {/* <i class="far fa-times-circle" onClick={()=>deleteMemb(member._id)}></i> */}
                                <i class="fas fa-2x fa-caret-down pr-3 cursor"></i>
                                <div className="abslt" style={{width: '250px',top: "32px", right: "0px", zIndex: '200'}}>
                                    <ul class="list-group card editMenu" style={{padding: '10px'}}>
                                        {member.timeTrack == false ?
                                        <li class="list-group-item onHvr2" onClick={()=>openModal(member, 'TimeTracker')}>Add Time Tracker</li>:
                                        <li class="list-group-item onHvr2" onClick={()=>openModal(member, 'TimeTracker')}>Cancel Time Tracker</li>
                                    }
                                        <li class="list-group-item onHvr2" onClick={()=>openModal(member, 'Delete')}>Delete Member</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body mx-auto text-center">
                            {member.profileImgClass===""?
                                <img src='https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png' alt="" class="empAvatar"/>
                                :
                                <div className={`empAvatar ${member.profileImgClass}`}></div>
                                
                            }
                            <h5 class="card-title">{member.name}</h5>
                            <p class="card-text">{member.membRole}</p>
                            <Link to={`/AdminsProfile/MemberProfile/${member._id}/${member.name}`} >
                                <div class="btn myBtn" href="#" role="button">view Detail </div>
                            </Link>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default MyMembers
