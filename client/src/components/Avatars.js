import React from 'react'
import { useState, useEffect } from 'react'
import avatar from './avatars.json'

function Avatars(props) {
    const [avatars, setAvatars] = useState([])
    function loadAvatars(){
        console.log(avatar)
        setAvatars(avatar)
    }
    useEffect(function(){
        loadAvatars()
    },[])
    return (
        <div className="avatarsHeight">
            <div className="female row col-12">
                {avatars.map((av,idx)=>
                    av.type === "female" ?
                        <div onClick={()=>props.makeActive(idx, av.src)} className={props.active === idx ? "avatarActive cursor" : "cursor"}>
                            <div className={`avatarImg ${av.src}`}></div>
                        </div>
                        : ''
                        )}
            </div>
            <div className="male row col-12">
                {avatars.map((av,idx)=>
                    av.type === "male" ?
                    <div onClick={()=>props.makeActive(idx, av.src)} className={props.active === idx ? "avatarActive cursor" : "cursor"}>
                            <div className={`avatarImg ${av.src}`}></div>
                        </div>
                        : ''
                    )}
            </div>
            <div className="animals row col-12">
                {avatars.map((av,idx)=>
                av.type === "animals" ?
                    <div onClick={()=>props.makeActive(idx, av.src)} className={props.active === idx ? "avatarActive cursor" : "cursor"}>
                        <div className={`avatarImg ${av.src}`}></div>
                    </div>
                    : ''
                )}
            </div>
            <div className="girl row col-12">
                {avatars.map((av,idx)=>
                av.type === "girl" ?
                    <div onClick={()=>props.makeActive(idx, av.src)} className={props.active === idx ? "avatarActive cursor" : "cursor"}>
                        <div className={`avatarImg ${av.src}`}></div>
                    </div>
                    : ''
                )}
            </div>
            <div className="boy row col-12">
            {avatars.map((av,idx)=>
                av.type === "boy" ?
                    <div onClick={()=>props.makeActive(idx, av.src)} className={props.active === idx ? "avatarActive cursor" : "cursor"}>
                        <div className={`avatarImg ${av.src}`}></div>
                    </div>
                    : ''
                )}
            </div>
        </div>
    )
}
export default Avatars
