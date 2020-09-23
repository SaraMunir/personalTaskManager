import React, {useState, useEffect, useRef } from 'react';
import {Modal, Button} from 'react-bootstrap'
import { Link, useParams } from "react-router-dom";
const userId = localStorage.id

function MyMembers() {
    const inputPassword = useRef();

    const [lgShow, setLgShow] = useState(false);
    const [ myMember, setMyMember ] = useState({ membName: "", membDesc: "", membPic: "", membRole: "", membSex: "", userId: `${userId}`});
    const [membersList, setMembersList] = useState([]);


    function handleInputChange( e ){
        const { id, value } = e.target; 
        setMyMember( { ...myMember, [id]: value } );
        }
    async function loadMembers(){
        const fetchMember = await fetch (`/api/member/${userId}`).then( res => res.json());
        console.log('fetched members are: ', fetchMember)
        setMembersList(fetchMember)
    }
    async function submitMember(e){
        e.preventDefault();
        console.log(myMember)
        const apiResult = await fetch('/api/member', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myMember)
            }).then( result=>result.json());
            console.log(apiResult.message)
            setMyMember({ membName: "", membDesc: "",membPic: "", membRole: "", membSex: "", userId: `${userId}`})
            setLgShow(false);
            loadMembers()
    }

    async function deleteMemb(employeeId){
        console.log('employee id : ', employeeId)
        // const apiDeleteRole= await fetch(`/api/deleteEmployee/${userId}/${teamId}/${employeeId}`);
        loadMembers()
    }
    useEffect(function(){
        loadMembers()
        // console.log('teamDetail: ', teamDetail)
    },[])


    return (
        <div>
            <div className="border mb-4">
                <Button onClick={() => setLgShow(true)}>Add Member</Button>
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
                                <label for="membName">Add Member</label>
                                <input type="text" class="form-control" 
                                id="membName" aria-describedby="taskHelp" onChange={handleInputChange} 
                                value={myMember.membName}/>
                                <label for="membDesc">Example textarea</label>
                                <textarea class="form-control" id="membDesc" rows="3" value={myMember.membDesc} onChange={handleInputChange}></textarea>
                                <label for="membPic">Enter Image Url</label>
                                <textarea class="form-control" id="membPic" rows="3" value={myMember.membPic} onChange={handleInputChange}></textarea>
                                <label for="membRole">role</label>
                                <input type="text" class="form-control" 
                                id="membRole" aria-describedby="taskHelp" onChange={handleInputChange} 
                                value={myMember.membRole}/>
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
            <div show={false}>
                something
            </div>
            <div className="border">
                <div className="row container mx-auto">
                {membersList.length == 0 ? 
                <h4 class="mt-5 mx-auto">You have not added any members yet</h4>
                : membersList.map( member=>
                    <div class="card myCard mx-auto">
                        <div className="mb-2 mt-2 mr-2 d-flex justify-content-end">
                            <i class="far fa-times-circle" onClick={()=>deleteMemb(member._id)}></i>
                        </div>
                        <div class="card-body">
                            <img src={member.membPic} alt="" class="empAvatar"/>
                            <h5 class="card-title">{member.membName}</h5>
                            <p class="card-text">{member.membRole}</p>
                            <Link to={`/MemberProfile/${member._id}/${member.membName}`} >
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
