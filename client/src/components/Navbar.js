import React from 'react'
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link to="/Dashboard" className={location.pathname === "/Dashboard" ? "nav-link active " : "nav-link"}>
                        My Dashboard
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/HomePage" className={location.pathname === "/HomePage" ? "nav-link active " : "nav-link"}>
                        Home
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/BackLog" className={location.pathname === "/BackLog" ? "nav-link active " : "nav-link"}>Household Task List</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/MyMembers" className={location.pathname === "/MyMembers" ? "nav-link active " : "nav-link"}>
                        My Members
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/MyGroceryList" className={location.pathname === "/MyGroceryList" ? "nav-link active " : "nav-link"}>
                        My Grocery List
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
