import React, {useState, useContext, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap';
import Tasks from './Tasks/Tasks'
import GroceryList from './Grocery/GroceryList'
function DashBoard() {

    // const [lgShow, setLgShow] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [taskList, setTasksList] = useState([]);
    const [doList, setDoList] = useState([]);
    const [doingList, setDoingList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    const userId = localStorage.id
    async function loadUserInfo(){
        console.log('loading tasks');
        const userId = localStorage.id
        const fetchUserInfo = await fetch (`/api/userInfo/${userId}`).then( res => res.json());
        setUserInfo(fetchUserInfo);
        setTasksList(fetchUserInfo.tasks)
        
        // if( fetchUserInfo.tasks.taskDo == "true" ){

        //     console.log('is is ',fetchUserInfo.tasks);
            
        //     setDoList(fetchUserInfo.tasks);

        // }
        console.log('fetchUserInfo: ', fetchUserInfo.tasks)
    }
    

    useEffect( function(){
        loadUserInfo()
    }, []);
    
    return (
        <div className="container-fluid" >
            <div className="row">
                <Tasks taskList={taskList} doList={doList} loadUserInfo={loadUserInfo}/>
                <GroceryList />
            </div>
        </div>
    )
}

export default DashBoard
