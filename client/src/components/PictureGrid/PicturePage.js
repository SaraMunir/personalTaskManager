import React from 'react'
import Pic from './assets/alexis-antonio-TFth26tEjss-unsplash.jpg'
function PicturePage() {
    const some ={
        width: '100%',
        // height: '30vh', 
        objectFit: 'contain'
    }
    const gridSize = {
        // backgroundColor: "teal",
        width: "300px",
        height: "250px",
        margin: "2px"
    }
    async function removeCover(){
        console.log('did it click')

    }
    return (
        <div>
            <div className="container">
                <div className="ruler mx-auto"></div>
            </div>
            <div className=" container mx-auto fullPic">
                <div className="picGridSection mx-auto row">
                    <div className="test" onClick={removeCover}>
                        <div className="img1 gridPic" style={gridSize}></div>
                        <div className="picCover" style={gridSize}></div>   
                    </div>
                    <div className="test">
                        <div className="pictureGrid img2 gridPic"></div>
                        <div className="pictureGrid picCover" style={{}}></div>   
                    </div>
                    <div className="test">
                        <div className="pictureGrid img3 gridPic"></div>
                        <div className="pictureGrid picCover"></div>   
                    </div>
                    <div className="test">
                        <div className="pictureGrid img4 gridPic"></div>
                        <div className="pictureGrid picCover"></div>   
                    </div>
                    <div className="test">
                        <div className="pictureGrid img5 gridPic"></div>
                        <div className="pictureGrid picCover"></div>   
                    </div>
                    <div className="test">
                        <div className="pictureGrid img6 gridPic"></div>
                        <div className="pictureGrid picCover"></div>   
                    </div>
                    <div className="test">
                        <div className="pictureGrid img7 gridPic"></div>
                        <div className="pictureGrid picCover"></div>   
                    </div>
                    <div className="test">
                        <div className="pictureGrid img8 gridPic"></div>
                        <div className="pictureGrid picCover"></div>   
                    </div>
                    <div className="test">
                        <div className="pictureGrid img9 gridPic"></div>
                        <div className="pictureGrid picCover"></div>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PicturePage
