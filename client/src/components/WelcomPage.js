import React from 'react'
import {Link, useLocation } from "react-router-dom";

function welcomPage() {
    return (
        <div>
            <div class="jumbotron text-center">
                <h1 class="display-4">HUB</h1>
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr class="my-4"/>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga dolorum eos nam a ad suscipit doloribus enim repellendus minima libero ipsam voluptatem, similique voluptatibus. Quisquam tempore repellat commodi quam mollitia!</p>
                <div class="col-lg-4 mx-auto lead d-flex justify-content-around">
                    <Link to = "/LogIn">
                        <div class="btn btn-primary btn-lg">Log In</div>
                    </Link>
                    <Link to = "/SignUp">
                        <div class="btn btn-primary btn-lg">Sign Up</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default welcomPage
