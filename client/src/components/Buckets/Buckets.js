import React from 'react'

function Buckets(props) {
    return (
        <div className="col-12 mx-auto">
            <div className="myCardLg">
                <h5>Active Buckets</h5>
                <div className="active row">
                    {props.bucketList.map( (bucket, idx)=>
                    bucket.active === true ?
                    <div key={`buckt-${idx}`} class="newCardLg col-5 " >
                        <div class="card-body">
                            <div className="d-flex justify-content-end">
                                {bucket.active == false ? <i class="fas fa-circle grey" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i> : <i class="fas fa-circle green" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i>}
                            </div>
                            <h5 class="card-title ">{bucket.bucketName}</h5>
                        </div>
                        <ul class=" list-group list-group-flush">
                            <div className="incomplete">
                                {bucket.bucketTasks.map((bcktTask, idx) =>
                                        bcktTask.complete == false ? 
                                        <div key={`bcktTasks-${idx}`}  class="myList d-flex" >
                                            <div className="col-9 ">
                                            {bcktTask.taskName}
                                            </div>
                                            <div className="col-3 d-flex justify-content-around">
                                                <div className="col-10 mr-1">
                                                {props.memberList.map( (memb, idx) => 
                                                    memb._id == bcktTask.taskOwnerId ? <img 
                                                    key={`membs-${idx}`}
                                                    class="membThmSmall"src={memb.profileImg} alt=""/> : '')}
                                                </div>
                                                <div className="col-2">
                                                    <i class="far fa-circle green" onClick={()=>props.completeTask(bucket._id, bcktTask._id)}></i>
                                                </div>
                                            </div>
                                        </div> :
                                        ''
                                    )
                                }
                            </div>
                            <div className="completed">
                                {
                                    bucket.bucketTasks.map((bcktTask,idx) =>
                                        bcktTask.complete == true ? 
                                    <div key={`bcktTaska-${idx}`} class="myListDone d-flex" >
                                        <div className="col-9 ">{bcktTask.taskName}
                                        </div>
                                        <div className="col-3 d-flex justify-content-around">
                                            <div className="col-10 mr-1">
                                            {props.memberList.map( (memb, idx) => 
                                                memb._id == bcktTask.taskOwnerId ? <img 
                                                key={`membsss-${idx}`}class="membThmSmallDisabled"src={memb.profileImg} alt=""/> : '')}
                                            </div>
                                            <div className="col-2">
                                                <i class="fas fa-check-circle " ></i>
                                            </div>
                                        </div>
                                    </div> :
                                        ''
                                    )
                                }
                                
                            </div>
                        </ul>
                    </div>: '')}
                </div>
            </div>
            <div className="myCardLg mt-4">
                <h5>Non Active Buckets</h5>
                <div className="active row">
                    {props.bucketList.map( (bucket, idx)=>
                    bucket.active === false ?
                    <div key={`buckt-${idx}`} class="newCardLg col-5 " >
                        <div class="card-body">
                            <div className="d-flex justify-content-end">
                                {bucket.active == false ? <i class="fas fa-circle grey" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i> : <i class="fas fa-circle green" onClick={()=>props.changeStatus(bucket._id, bucket.active)}></i>}
                            </div>
                            <h5 class="card-title ">{bucket.bucketName}</h5>
                        </div>
                        <ul class=" list-group list-group-flush">
                            <div className="incomplete">
                                {bucket.bucketTasks.map((bcktTask, idx) =>
                                        bcktTask.complete == false ? 
                                        <div key={`bcktTasks-${idx}`}  class="myList d-flex" >
                                            <div className="col-9 ">
                                            {bcktTask.taskName}
                                            </div>
                                            <div className="col-3 d-flex justify-content-around">
                                                <div className="col-10 mr-1">
                                                {props.memberList.map( (memb, idx) => 
                                                    memb._id == bcktTask.taskOwnerId ? <img 
                                                    key={`membs-${idx}`}
                                                    class="membThmSmall"src={memb.profileImg} alt=""/> : '')}
                                                </div>
                                                <div className="col-2">
                                                    <i class="far fa-circle green" onClick={()=>props.completeTask(bucket._id, bcktTask._id)}></i>
                                                </div>
                                            </div>
                                        </div> :
                                        ''
                                    )
                                }
                            </div>
                            <div className="completed">
                                {
                                    bucket.bucketTasks.map((bcktTask,idx) =>
                                        bcktTask.complete == true ? 
                                    <div key={`bcktTaska-${idx}`} class="myListDone d-flex" >
                                        <div className="col-9 ">{bcktTask.taskName}
                                        </div>
                                        <div className="col-3 d-flex justify-content-around">
                                            <div className="col-10 mr-1">
                                            {props.memberList.map( (memb, idx) => 
                                                memb._id == bcktTask.taskOwnerId ? <img 
                                                key={`membsss-${idx}`}class="membThmSmallDisabled"src={memb.profileImg} alt=""/> : '')}
                                            </div>
                                            <div className="col-2">
                                                <i class="fas fa-check-circle " ></i>
                                            </div>
                                        </div>
                                    </div> :
                                        ''
                                    )
                                }
                                
                            </div>
                        </ul>
                    </div>: '')}
                </div>
            </div>
        </div>
    )
}

export default Buckets
