import React from 'react'
import { useState } from 'react'

function Buckets(props) {
    //     activeBucket    setActiveBucket({id: bucktId, status: true})
    const [showMore, setShowMore] = useState(false)
    function showNonActive(){
        if(showMore===false){
            setShowMore(true)
        }else {
            setShowMore(false)
        }
    }
    return (
        <div className="mx-auto col-lg-12">
            <div>
                <h5>Active Buckets </h5>
                <div className="active">
                    {props.bucketList.map( (bucket, idx)=>
                    bucket.active === true ?
                    props.activeBucket.status === true && props.activeBucket.id ===bucket._id ? 
                    <div key={`buckt-${idx}`} class="cursor list-group-item listItem" onClick={()=>props.showDetail(bucket._id)} style={{background: '#ad9fcc', color: 'white'}}>
                        <div className="d-flex justify-content-between">
                            <h6 class="card-title ">{bucket.bucketName}</h6>
                            {bucket.active == false ? <i class="fas fa-circle grey statusBtn" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i> : <i class="fas fa-circle green statusBtn" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i>}
                        </div>
                    </div> :
                    <div key={`buckt-${idx}`} class="cursor list-group-item listItem" onClick={()=>props.showDetail(bucket._id)}>
                        <div className="d-flex justify-content-between">
                            <h6 class="card-title ">{bucket.bucketName}</h6>
                            <div className="d-flex col-lg-2 justify-content-between">
                                <div className="hoverNmSh">
                                    <i className="fas fa-trash-alt cursor" style={{color: '#ad9fcc', fontSize: '1.1rem'}} onClick={()=>props.deleteBckt(bucket._id)}></i>
                                    <span className="hoverName">Delete</span>
                                </div>
                                {bucket.active == false ? <i class="fas fa-circle grey statusBtn" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i> : <i class="fas fa-circle green statusBtn" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i>}
                            </div>
                        </div>
                    </div>: '')}
                </div>
                <div className=" mt-4">
                    <hr/>
                    <div className="d-flex justify-content-between cursor" onClick={showNonActive}>
                        <h5>Non Active Buckets</h5>
                        {
                            showMore === false ?
                            <i class="fas fa-chevron-down cursor statusBtn" style={{fontSize: '1.2rem'}} onClick={()=>setShowMore(true)}></i>
                            :  <i class="fas fa-chevron-up cursor statusBtn" style={{fontSize: '1.2rem'}} onClick={()=>setShowMore(false)}></i>
                        }
                    </div>
                    <div className={showMore === true ? "active" : "hide"}>
                        { props.bucketList.map( (bucket, idx)=>
                        bucket.active === false ?
                        props.activeBucket.status === true && props.activeBucket.id ===bucket._id ? 
                        <div key={`buckt2-${idx}`} class="cursor list-group-item listItem" style={{background: '#ad9fcc'}} onClick={()=>props.showDetail(bucket._id)}>
                            <div class="">
                                <div className="d-flex justify-content-between">
                                    <h6 class="card-title ">{bucket.bucketName}</h6>
                                    {bucket.active == false ? <i class="fas fa-circle grey statusBtn" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i> : <i class="fas fa-circle green statusBtn" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i>}
                                    {/* <div className="hoverNmSh">
                                        <i className="myBtn fas fa-trash-alt cursor" style={{padding: "14px"}} onClick={()=>props.deleteBckt(bucket._id)}></i>
                                        <span className="hoverName">Delete</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        :
                        <div key={`buckt2-${idx}`} class="cursor list-group-item listItem" onClick={()=>props.showDetail(bucket._id)}>
                            <div class="">
                                <div className="d-flex justify-content-between">
                                    <h6 class="card-title ">{bucket.bucketName}</h6>
                                    {bucket.active == false ? <i class="fas fa-circle grey statusBtn" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i> : <i class="fas fa-circle green statusBtn" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i>}
                                </div>
                            </div>
                        </div>
                        : '')
                        }
                    </div>
                    <hr/>

                </div>
            </div>
            
        </div>
    )
}

export default Buckets
