import React, {useState, useEffect, useRef } from 'react';
import { Link, useParams } from "react-router-dom";

function MemberTimeSheet() {
    const { memberId } = useParams();
    const profileType = localStorage.profileType;
    const [membTimeLogList, setMembTimeLogList] = useState([]);
    const [hArr, setHArr] = useState([]);
    const [memberDetail, setMemberDetail] = useState({});
    const [Cumulitive, setCumulitive] = useState([0]);
    const [daysArray, setDaysArray]= useState([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ])
    async function loadMemberDetail(){
        const fetchMember = await fetch (`/api/memberDetail/${memberId}`).then( res => res.json());
        console.log('fetched member detail is: ', fetchMember)
        console.log('todays date: ', fetchMember.timeLogIns)
        setMemberDetail(fetchMember)
        let hArrIn = []
        let cumul = [0]
        fetchMember.timeLogIns.map((time,idx)=>{
            let logIn = new Date(time.logInTime);
            let logOut = new Date(time.logOutTime);   
            let msDifference =  logOut - logIn;
            let hoursRaw = (msDifference/36e5).toFixed(2);
            let cumult = parseInt(hoursRaw)+cumul[idx]
            hArrIn.push(hoursRaw)
            cumul.push(cumult)
        })
        console.log('hArrIn: ', hArrIn)
        console.log('cumul: ', cumul)
        setHArr(hArrIn)
        setMembTimeLogList( fetchMember.timeLogIns)
    }
        useEffect(function(){
            loadMemberDetail()
        },[])
    return (
        <div>
            <div className="d-flex justify-content-end">
                {profileType=='' ? 
                <Link to={`/MemberProfile/${memberDetail._id}/${memberDetail.name}`} className="nav-link">
                    <div class="myBtnRnd"><i class="far fa-arrow-alt-circle-left" style={{fontSize: "1.2rem"}}></i> &nbsp;  Go Back</div>
                </Link>
                : ''}
            </div>
            <div className="myTable">
                <div className="col-12 headers d-flex mx-auto text-center">
                    <div className="tableWdth head">Date</div>
                    <div className="tableWdth head">Day</div>
                    <div className="tableWdth head">In Time</div>
                    <div className="tableWdth head">Out Time</div>
                    <div className="tableWdth head">Sick Day</div>
                    <div className="tableWdth head">Hours Complete</div>
                    <div className="tableWdth head">Minutes Complete</div>
                    <div className="tableWdth head">Total In Hours</div>
                    <div className="tableWdth head">Cumulitive</div>
                    <div className="tableWdth head">Overtime</div>
                </div>
                {membTimeLogList.map((time, idx)=>
                    {
                        var d = new Date(time.date);
                        let logIn = new Date(time.logInTime);
                        let logOut = new Date(time.logOutTime);   
                        let msDifference =  logOut - logIn;
                        let hoursRaw = (msDifference/36e5);
                        let hours = Math.floor(msDifference/36e5);
                        let leftMinutes = ((hoursRaw - hours)*60).toFixed(2);
                        let minutes = Math.floor(msDifference/1000/60);
                    return(<div className="col-12 headers d-flex mx-auto text-center">
                        <div className="firstTble tableWdth Date">{new Date( time.date ).toLocaleString('en-US').slice(0,9)}</div>
                        <div className="tableWdth Day">{daysArray[d.getDay()]}</div>
                        <div className="tableWdth inTime">{new Date( time.logInTime ).toLocaleString('en-US').slice(10,23)}</div>
                        <div className="tableWdth outTime">{new Date( time.logOutTime ).toLocaleString('en-US').slice(11,23)}</div>
                        <div className="tableWdth sickDay">Sick Day</div>
                        <div className="tableWdth hrsComplete">{hours}</div>
                        <div className="tableWdth minuteComplete">{leftMinutes}</div>
                    <div className="tableWdth totalInHrs">{hArr[idx]}
                    {/* {hoursRaw.toFixed(2)} */}
                    </div>
                        <div className="tableWdth cumilitve">{parseInt(hArr[idx]) + parseInt(hArr[idx-1])}</div>
                        <div className="tableWdth overTime">Overtime</div>
                    </div>)}
                    )}
            </div>
        </div>
    )
}

export default MemberTimeSheet
