import React, {useState, useRef, useEffect } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";

function Navbar() {
    let history = useHistory();
    const ref = useRef();
    const [isModalOpen, setModalOpen] = useState(false);
    useOnClickOutside(ref, () => setModalOpen(false));

    const location = useLocation();
    const userId = localStorage.id;
    const [showMenus, setShowMenus] = useState(false);
    function showMenu(){
        if(showMenus == false){
            setShowMenus(true)
        } else{
            setShowMenus(false)
        }
    }
    function directTo(type) {
        if(type == 'Profiles'){
            localStorage.setItem('profileType', '');
            history.push(`/Profiles`);
            document.location.reload(true);
            return
        }
        if(type == 'LogOut'){
            history.push(`/logout`);
            document.location.reload(true);
            return
        }
    }
    useOnClickOutside(ref, () => setShowMenus(false));
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto col-lg-9">
                    {userId?<li class="nav-item">
                        <Link to="/AdminsProfile/Dashboard" className={location.pathname === "/AdminsProfile/Dashboard" ? "nav-link active " : "nav-link"}>
                        My Dashboard</Link></li> : ''}
                    {userId?<li class="nav-item">
                        <Link to="/AdminsProfile/BackLog" className={location.pathname === "/AdminsProfile/BackLog" ? "nav-link active " : "nav-link"}>Household Task List</Link>
                    </li>:''}
                    {userId?<li class="nav-item">
                        <Link to="/AdminsProfile/MyMembers" className={location.pathname === "/AdminsProfile/MyMembers" ? "nav-link active " : "nav-link"}>
                        My Members
                        </Link>
                    </li>:''}
                    {userId?<li class="nav-item">
                        <Link to="/AdminsProfile/MyGroceryList" className={location.pathname === "/AdminsProfile/MyGroceryList" ? "nav-link active " : "nav-link"}>
                        My Grocery List
                        </Link>
                    </li>:''}
                </ul>
                <ul class="navbar-nav mr-auto col-lg-3 justify-content-end">
                    {!userId ? <li class="nav-item">
                        <Link to = "/LogIn"  className="nav-link">
                            <div class="myBtnRnd">Log In</div>
                        </Link>
                    </li>:''}
                    {!userId ? <li class="nav-item">
                        <Link to="/SignUp" className="nav-link">
                            <div class="myBtnRnd">Sign Up</div>
                        </Link>
                    </li>:''}
                    {userId ?
                    <li class="nav-item">
                        <div class="myBtnRnd mt-2" onClick={showMenu}><i class="fas fa-caret-down"></i></div>
                    </li> 
                    :''}
                </ul>
            </div>
            {showMenus == true ? 
            <div className="menuCard" ref={ref}>
                <div className="menuItm">
                    <div className="link d-flex" onClick={()=>directTo('Profiles')}>
                        <i class="fas fa-users" style={{fontSize:'1.4rem'}}></i>
                        <h5 className="pl-3">Profiles</h5>
                    </div>
                </div>
                <hr style={{margin: '0'}}/>
                <div className="menuItm d-flex">
                    <Link to="/AdminsProfile/Settings" className="link  d-flex">
                        <i class="fas fa-cogs" style={{fontSize:'1.4rem'}}></i>
                        <h5 className="pl-3">Settings</h5>
                    </Link>
                </div>
                <hr style={{margin: '0'}}/>
                <div className="menuItm d-flex" onClick={()=>directTo('LogOut')}>
                    <div className="link d-flex">
                        <i class="fas fa-sign-out-alt" style={{fontSize:'1.4rem'}}></i>
                        <h5 className="pl-3">Log Out</h5>
                    </div>
                </div>
            </div>
            : ''}
        </nav>
    )
}
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
        const listener = event => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
            return;
            }

            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
        },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
export default Navbar
