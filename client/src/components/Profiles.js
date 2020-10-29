import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

function Profiles() {
    const userId = localStorage.id
    const profileImg = localStorage.profileImg
    const profileImgClass = localStorage.profileImgClass
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
                    {
                    profileImgClass==='' || !profileImgClass ||profileImgClass==='undefined'  ? <img src='https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png' className="prfImg" alt=""/>:
                    <div className={`prfImg mx-auto ${profileImgClass}`}></div>
                    }
                    <h6 className="prfImgTxt text-center">{firstName}  {lastName}</h6>
                </Link>
            </div>
            <div className="row col-8 mx-auto">
                {membersList ? membersList.map(member=>
                <Link to={`/MemberProfile/${member._id}/${member.name}`} className="profileLink mx-auto">
                    <div>
                        {
                            member.profileImgClass === "" || !member.profileImgClass ?<img src='https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png' className="prfImg" alt=""/> :
                            <div className={`prfImg ${member.profileImgClass}`}></div>
                        }
                        <h6 className="prfImgTxt text-center">{member.name} </h6>
                    </div>
                </Link>
                ) : ''}
            </div>
        </div>
    )
}

export default Profiles
