import React, { useState, useRef} from 'react';
import { Redirect } from 'react-router-dom';

function SignUp() {
    const [ userData, setUserData ] = useState({ firstName: "", lastName: "", email: "", password: ""});

    const [ isRegistered, setIsRegistered ] = useState( false );

    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );

    const inputFirstName = useRef();
    const inputLastName = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();
    
    function handleInputChange( e ){
        const { id, value } = e.target;
        setUserData( { ...userData, [id]: value } );
    }
    
    async function registerUser( e ){
        e.preventDefault();
        console.log('is it working ?')

        if( userData.firstName === "" ) {
            inputFirstName.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide your first name!' } );
            return;
        }
        if( userData.lastName === "" ) {
            inputLastName.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide your Email!' } );
            return;
        }
        if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)) ) {
            inputEmail.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide a valid Email!' } );
            return;
        }

        if( userData.password === "" ) {
            inputPassword.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide a password!' } );
            return;
        }

        if( userData.password.length < 6 ) {
            inputPassword.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide a longer password (8 characters min)!' } );
            return;
        }

        localStorage.clear();

        const apiResult = await fetch('/api/user/registration', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
        }).then( result=>result.json())     
        
        if( apiResult.message ){
            setAlertMessage( { type: 'success', message: 'Thank you successfully registered!' } );
            setTimeout( function(){ setIsRegistered(true); }, 1000 );
        } else {
            setAlertMessage( { type: 'danger', message: 'Try again' } );
        }
        setUserData({ firstName: "", lastName: "", email: "", password: ""})
    }
    return (
        <div class="container card mt-4 col-md-8">
            { isRegistered ? <Redirect to='/LogIn' /> : '' }
            <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>
            <form class="card-body">
                <div class="mb-3 mx-auto">
                    <label for="validationTooltip01">First Name</label>
                    <input type="text"              class="form-control"  placeholder="First name" value={userData.firstName}
                    onChange={handleInputChange}
                    ref={inputFirstName}
                    id='firstName'
                    required/>
                    <div class="valid-tooltip">
                        Looks good!
                    </div>
                </div>
                <div class="mb-3 mx-auto">
                    <label for="validationTooltip02">Last Name</label>
                    <input type="text" class="form-control"  placeholder="Last name" value={userData.lastName}
                    onChange={handleInputChange}
                    ref={inputLastName}
                    id='lastName'
                    required/>
                    <div class="valid-tooltip">
                        Looks good!
                    </div>
                </div>
                <div class="mb-3 mx-auto">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                        value={userData.email} 
                        onChange={handleInputChange} 
                        ref={inputEmail}/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                </div>
                <div class="mb-3 mx-auto">
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                        value={userData.password}
                        onChange={handleInputChange}
                        ref={inputPassword}
                        id="password" type="password" class="form-control" />
                    </div>
                </div>
                <div class="mb-3 mx-auto">
                    <button onClick={registerUser} class="btn btn-primary submit" >Register</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
