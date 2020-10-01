import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

function Profiles() {
    const userId = localStorage.id
    const profileImg = localStorage.profileImg
    const firstName = localStorage.firstName
    const lastName = localStorage.lastName
    const [membersList, setMembersList] = useState([]);
    async function loadMembers(){
        const fetchMember = await fetch (`/api/getMember/${userId}`).then( res => res.json());
        console.log('fetched members are 2: ', fetchMember)
        setMembersList(fetchMember)
    }
    useEffect(function(){
        loadMembers()
    },[])
    return (
        <div className="profilesPage">
            <div className="row col-8 mx-auto">
                <Link to={`/AdminsLogIn`} className="profileLink mx-auto">
                    <img className="prfImg mx-auto" src={profileImg} alt=""/>
                    <h6 className="prfImgTxt text-center">{firstName}  {lastName}</h6>
                </Link>
            </div>
            <div className="row col-8 mx-auto">
                {membersList ? membersList.map(member=>
                <Link to={`/MemberProfile/${member._id}/${member.name}`} className="profileLink mx-auto">
                    <div>
                        <img src={member.profileImg} className="prfImg" alt=""/>
                        <h6 className="prfImgTxt text-center">{member.name} </h6>
                    </div>
                </Link>
                ) : ''}
            </div>
        </div>
    )
}

export default Profiles
