import React, { useState, useEffect, useRef } from 'react'

function Settings() {
    const inputPassCode = useRef();
    const userId = localStorage.id
    const profileImg = localStorage.profileImg
    const email = localStorage.email
    const firstName = localStorage.firstName
    const lastName = localStorage.lastName
    const [showPersonalSection, setShowPersonalSection] = useState(true);
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const [lgShow2, setLgShow2] = useState(false);
    const [ adminDetail, setAdminDetail ]= useState({});
    const [ myPic, setMyPic] = useState ( '' );
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassCode, setShowPassCode] = useState(false);
    const [ adminEdit, setAdminEdit ] = useState({ name: "", email: "", role: "", house: "", birthday: "", password: "",  passCode: ""});
    const [ newPassword, setNewPassword]=useState({password: ""})
    const [ newPassCode, setNewPassCode]=useState({passCode: ""})
    const [ editPassCodeBtn, setEditPassCodeBtn]=useState(true)
    const [ editPassWrdBtn, setEditPassWrdBtn]=useState(true)
    const [ edit, setEdit ] = useState({})
    function handleInputChange( e ){
        const { id, value } = e.target; 
        setAdminEdit( { ...adminEdit, [id]: value } );
        setEdit ({ [id]: value })
        }
    function handlePasswordInput(e){
        const { id, value } = e.target; 
        setNewPassword({[id]: value})
    }
    function handlePassCodeInput(e){
        const { id, value } = e.target; 
        setNewPassCode({[id]: value})
    }
    async function saveNewPasscode(){
        if( newPassCode.passCode === "") {
            inputPassCode.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide 4 or 6 digit passcode' } );
            return;
        }
        if( newPassCode.passCode.length > 6 || newPassCode.passCode.length < 4 ) {
            inputPassCode.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please make sure the passcode is 4 or 6 digit number' } );
            return;
        }
        console.log('newPassCode: ', newPassCode)
        const apiResult = await fetch(`/api/updateAdminPassCode/${userId}`, 
            {   method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPassCode)
            }).then( result => result.json());
        setAlertMessage( { type: '', message: ''} );
        setNewPassCode({passCode: ""})
        showForm('passCode')
    }
    function showSection(type){
        switch (type) {
            case 'personalInfo':
                if(showPersonalSection == false){
                    setShowPersonalSection(true)
                } else{
                    setShowPersonalSection(false)
                } 
                break;
            default:
                break;
        }
    }
    function showForm(type){
        if( type == 'password'){
            if (showPassword== false){
                setEditPassWrdBtn(false)
                setShowPassword(true)
                return
            } else {
                setEditPassWrdBtn(true)
                setShowPassword(false)
                setAdminEdit( { ...adminEdit, password: "" } );
                return
            }
        }
        if( type == 'passCode'){
            if (showPassCode== false){
                setEditPassCodeBtn(false)
                setShowPassCode(true)
                return
            } else {
                setEditPassCodeBtn(true)
                setShowPassCode(false)
                setNewPassCode({passCode: ""})
                return
            }
        }
    }
    function handleChange(e){
        const file = e.target.files[0];
        setMyPic(file)
    }
    async function handleUpload(e){
        e.preventDefault();
        if(myPic){
            let myForm = document.getElementById('myForm');
            let formData = new FormData(myForm);
            const uploadPic = await fetch(`/api/adminUpload/${userId}`, 
                {
                    method: 'PUT',
                    body: formData
                }
            ).then( result=>result.json())
        }
        if(adminDetail.profileImg){
            let oldPhoto = {old: adminDetail.profileImg};
            //delet old photo
            const deleteOldPIc = await fetch(`/api/deleteOldProfilePIc`, 
            {   method: 'post',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(oldPhoto)
            }).then( result=>result.json());
            
        }
            setLgShow2(false)
            loadAdminProfile();
    }
    async function updateDetDetail(){
        const apiResult = await fetch(`/api/adminDetailUpdate/${userId}`, 
            {   method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(edit)
            }).then( result => result.json());
        setEdit({});
        loadAdminProfile();
        let key = Object.keys(edit)[0];
        console.log('key: ', key)
    }
    async function loadAdminProfile(){
        const getAdmnDetail = await fetch (`/api/userInfo/${userId}`).then( res => res.json());
        console.log('getAdmnDetail: ', getAdmnDetail)
        setAdminDetail(getAdmnDetail);
    }

    useEffect(function(){
        loadAdminProfile();
    },[])
    return (
        <div className="settingsPage mx-auto border">
            <div className="col-6 mx-auto" style={{position: "fixed", top: "20px", right: "20px", zIndex: "300"}}>
                <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` :
                'd-hide' 
                } role="alert">{alertMessage.message}</div>
            </div>
            <div className="personlInfo card pt-3 pb-3 mb-2">
                <div className='d-flex container mx-auto col-11'>
                    <h5 className="container mx-auto">Personal Information</h5>
                    <div className="dropDnBtn" onClick={()=>showSection('personalInfo')}>
                        <i class="fas fa-caret-down " ></i>
                    </div>
                </div>
                {showPersonalSection == true ? 
                <div className="row container mx-auto">
                    <div className="profilImgCntnr mx-auto border">
                        <img className="myProfileImg" src={profileImg} alt=""/>
                        <div className="myBtnRnd col-5 mx-auto mt-3"><i class="fas fa-camera"></i> &nbsp; Upload</div>
                    </div>
                    <div className="profileDetContnr col-lg-8 border mx-auto pt-5">
                        <div className="userName d-flex col-12 border mx-auto">
                            <div className="editHead mx-auto">
                                <p className="profileDet mx-auto" style={{fontWeight: "bold"}}>Name: </p>
                            </div>
                            <div className="col-8 mx-auto">
                                <p className="profileDet mx-auto">{firstName} {lastName}</p>
                            </div>
                            <div className="mx-auto">
                                <div className="myEditBtn mx-auto text-center" ><i class="fas fa-user-lock"></i></div>
                            </div>
                        </div>
                        <hr className="col-10 mx-auto"/>
                        <div className="email">
                            <div className="userEmail d-flex col-12 mx-auto mt-3">
                                <div className="editHead mx-auto">
                                    <p className="profileDet mx-auto" style={{fontWeight: "bold"}}>Email: </p>
                                </div>
                                <div className="col-8 mx-auto">
                                    <p className="profileDet mx-auto">{email}</p>
                                </div>
                                <div className="mx-auto">
                                    <div className="myEditBtn mx-auto text-center"><i class="fas fa-user-lock"></i></div>
                                </div>
                            </div>
                        </div>
                        <hr className="col-10 mx-auto"/>
                        <div className="password">
                            <div className="userPassword d-flex col-12 mx-auto mt-3">
                                <div className="editHead mx-auto">
                                    <p className="profileDet mx-auto" style={{fontWeight: "bold"}}>Password: </p>
                                </div>
                                <div className="col-8 mx-auto">
                                    <p className="profileDet mx-auto">*******</p>
                                </div>
                                <div className="mx-auto">
                                    {
                                        editPassWrdBtn == true ? 
                                        <div className="myEditBtn mx-auto text-center"  onClick={()=>showForm('password')}><i class="fas fa-user-edit"></i> Edit</div>
                                        :''
                                    }
                                </div>
                            </div>
                            {showPassword== true ?
                            <div className="col-12 pt-3 pb-3 mt-2 mb-2 border">
                                <input type="password" className="form-control"
                                id="password" aria-describedby="taskHelp" placeholder='Enter New Password' onChange={handleInputChange} 
                                value={adminEdit.password}/>
                                <div className="d-flex justify-content-end mt-3">
                                    <div className="myEditBtn text-center mr-2" onClick={()=>showForm('password')}>cancel</div>
                                    <div className="myEditBtn text-center" >save</div>
                                </div>
                            </div> 
                            : ''}
                        </div>
                        <hr className="col-10 mx-auto"/>
                        <div className="passcode">
                            <div className="userPassCode d-flex col-12 mx-auto mt-3">
                                <div className="editHead mx-auto">
                                    <p className="profileDet mx-auto" style={{fontWeight: "bold"}}>Pass Code: </p>
                                </div>
                                <div className="col-8 mx-auto">
                                    <p className="profileDet mx-auto">*******</p>
                                </div>
                                <div className="mx-auto">
                                    { editPassCodeBtn == true ?  
                                    <div className="myEditBtn mx-auto text-center" onClick={()=>showForm('passCode')}><i class="fas fa-user-edit"></i> Edit</div>
                                    : '' }
                                </div>
                            </div>
                            {showPassCode== true ?
                            <div className="col-12 pt-3 pb-3 mt-2 mb-2 border">
                                <input type="password" className="form-control"
                                ref={inputPassCode}
                                id="passCode" aria-describedby="taskHelp" placeholder='Enter New Passcode' onChange={handlePassCodeInput} 
                                value={newPassCode.passCode}/>
                                <div className="d-flex justify-content-end mt-3">
                                    <div className="myEditBtn text-center mr-2" onClick={()=>showForm('passCode')}>cancel</div>
                                    <div className="myEditBtn text-center" onClick={saveNewPasscode}>save</div>
                                </div>
                            </div> 
                            : ''}

                        </div>
                    </div>
                </div> : ''}
            </div>
            <div className="personlInfo card pt-3 pb-3 mb-2">
                <div className='d-flex container mx-auto col-11'>
                    <h5 className="container mx-auto">Others Information</h5>
                    <div className="dropDnBtn" >
                    <i class="fas fa-caret-down " ></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
