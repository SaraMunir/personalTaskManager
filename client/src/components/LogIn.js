import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom';
import Loader from  "./assets/Rolling-1s-200px.gif";

function LogIn() {
    // DECLARATIVE FORM OF PROGRAMMING
    const [ userData, setUserData ] = useState({ firstName: "", lastName: "", email: localStorage.email, password: "", rememberMe: true });
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );
    const [loading, setLoading] = useState(false);

    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const inputEmail = useRef();
    const inputPassword = useRef();

    function handleInputChange( e ){
        const { id, value } = e.target;
        setUserData( { ...userData, [id]: value } );
    }
    function handleCheckbox(){
        setUserData( { ...userData, rememberMe: !userData.rememberMe } );
    }
    async function loginUser( e ){
        e.preventDefault();
        console.log('is login btn working')
        setUserData({ firstName: "", lastName: "", email: localStorage.email, password: "", rememberMe: true })
        if( userData.email === "" ) {
            inputEmail.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide your Email!' } );
            return;
        }
        if( userData.password === "" || userData.password.length < 6 ) {
            inputPassword.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide your password!' } );
            return;
        }
        setLoading(true)
            const apiResult = await fetch('/api/user/login', 
                {   method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }).then( result=>result.json())
            
                if( !apiResult.message ){
                    setAlertMessage( { type: 'danger', message: apiResult.error } );
                    setLoading(false)
                    return;
                };
                console.log(apiResult)
                localStorage.setItem('id', apiResult.id);
                localStorage.setItem('firstName', apiResult.firstName);
                localStorage.setItem('lastName', apiResult.lastName);
                // localStorage.setItem('profileImg', apiResult.profileImg);
                localStorage.setItem('profileImgClass', apiResult.profileImgClass);
                localStorage.setItem('newShoppingList', [''])
                setAlertMessage( { type: 'success', message: 'Loading, please wait...' } );
            localStorage.email = ( apiResult.rememberMe ? apiResult.email : '' );
            setTimeout( function(){ setIsLoggedIn(true); }, 500 );
            setLoading(false)

    }

    return (
        <div class="container card mt-4 col-md-8 mx-auto">
            <div className={loading === true ? "loaderWindow": "hide"}>
                <div className="loadingWnd">
                    <img className="loadingGif" src={Loader} alt="loadingWndow"/>
                </div>
            </div>

            { isLoggedIn ? <Redirect to='/Profiles' /> : '' }
            <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>
            <form class="card-body">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input 
                    value={userData.email} 
                    onChange={handleInputChange} 
                    ref={inputEmail}
                    type="email" class="form-control" id="email" aria-describedby="emailHelp" 
                    placeholder="Enter email"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input 
                    type="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    ref={inputPassword} class="form-control" id="password" placeholder="Password"/>
                </div>
                <button onClick={loginUser} type="button" class="btn btn-primary submit">Login</button>
                &nbsp; 
                <input type="checkbox" checked={userData.rememberMe} onChange={handleCheckbox} />
                <label class='text-secondary' for='rememberMe'>Remember Me</label> &nbsp;
            </form>
        </div>
    )
}

export default LogIn
