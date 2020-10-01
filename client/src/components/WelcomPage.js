import React from 'react'
import heroPic from './assets/3959419-png.png'
import {Link, useLocation, Redirect } from "react-router-dom";

function welcomPage(){
    const userId = localStorage.id
    
    return (
        <div>
            { !userId ? '' : <Redirect to='/Profiles'/>}
            <div className="mt-3 mr-3 d-flex justify-content-end">
                <Link to="/SignUp" className="nav-link">
                    <div class="myBtnRnd">Sign Up</div>
                </Link>
                <Link to="/LogIn" className="nav-link">
                    <div class="myBtnRnd">Log In</div>
                </Link>
            </div>
            <div class="jumbotron text-center">
                <div className="row col-lg-11 mx-auto">
                    <div className="col-lg-5 pt-5 text-left">
                        <h1>Get everything under control !!</h1>
                        <hr class="heroLine"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore accusamus dicta non facere sequi impedit illum distinctio reiciendis ipsam alias!</p>
                        <div className="myBtnRndOrng col-5 text-center">Read More</div>
                    </div>
                    <div className="col-lg-7 mx-auto ">
                        <img src={heroPic} alt="" style={{width: '75%', height: '70vh', objectFit: "cover",objectPosition: "center 10px"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default welcomPage
