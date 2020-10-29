import React, { useState, useRef } from 'react'
import {Link, Redirect } from 'react-router-dom';

function AdminsLogIn() {
    const userId = localStorage.id
    const firstName = localStorage.firstName
    const lastName = localStorage.lastName
    const profileImgClass = localStorage.profileImgClass
    const profileImg = localStorage.profileImg;

    const [ userData, setUserData ] = useState({ passCode: "", userId: userId});
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const inputPassCode = useRef();
    function handleInputChange( e ){
        const { id, value } = e.target;
        setUserData( { ...userData, [id]: value } );
    }
    async function handleKeyPress(e){
        if(e.keyCode=== 13){
            const apiResult = await fetch('/api/user/passCode', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then( result=>result.json())
            if( !apiResult.message ){
                setAlertMessage( { type: 'danger', message: apiResult.error } );
                return;
            };
            setAlertMessage( { type: 'success', message: 'Loading, please wait...' } );
            localStorage.setItem('profileType', 'Admin');
            setTimeout( function(){ setIsLoggedIn(true); }, 1000 );
        }
    }
    return (
        <div className="adminsLogInPage">
            <div className="d-flex justify-content-end"
            style={{position: "absolute", top: "10px", right: "10px" }}
            >
                <Link to="/Profiles" className="nav-link">
                    <div class="myBtnRnd"><i class="far fa-arrow-alt-circle-left" style={{fontSize: "1.2rem"}}></i>  &nbsp;  Go Back</div>
                </Link>
            </div>
            { isLoggedIn ? <Redirect to='/AdminsProfile/Dashboard' /> : '' }
            <div className="darkCard col-6 mx-auto mt-5">
                <div className="card-body">
                    <div className="col-12 mx-auto d-flex">
                    {
                    profileImgClass==='' || !profileImgClass  ||profileImgClass==='undefined' ? <img src='https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png' className="mx-auto prfImg" alt=""/>:
                    <div className={`prfImg mx-auto ${profileImgClass}`}></div>
                    
                    }
                    </div>
                    <div className="col-12 mx-auto d-flex">
                        <h1 className="mx-auto">{firstName}  {lastName}</h1>
                    </div>
                    <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                        {alertMessage.message}
                    </div>
                    <div class="form-group mx-auto mt-4">
                        <input 
                        type="password"
                        value={userData.passCode}
                        onChange={handleInputChange}
                        ref={inputPassCode} class="form-control col-8 mx-auto" id="passCode" placeholder="passCode" onKeyDown={handleKeyPress}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminsLogIn
