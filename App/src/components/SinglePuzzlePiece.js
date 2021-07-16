import React , { useState, useEffect, useCallback  } from 'react';

function SinglePuzzlePiece({color, startTop, startLeft}) {

    const [position, setPosition] = useState({top: startTop, left: startLeft})
    const [hover, setHover] = useState(false)

    useEffect(() => {
        console.log("no a jakkk")
      }, []);

      const event = useCallback((e) => 
        {
                console.log(`mouse move : ${e.offsetX} ${e.offsetY} `)   
                setPosition({left: e.clientX -25, top: e.clientY -25})
        },[])

      useEffect(() => {
       
        if(hover)
        {
            console.log(hover)
            document.addEventListener('mousemove', event);
        }
        else{
            console.log(hover)
            document.removeEventListener('mousemove', event);
        }
        },
       [hover]);

    return (
    <>
        <div onMouseDown = {()=> setHover(true)} onMouseUp= {()=> setHover(false)} style={{opacity:`${hover?0.5:1}`, top: position.top, left:position.left}} className = {`playboard__singlepuzzlepiece playboard__singlepuzzlepiece--color-${color}`} >
        </div>
    </>
    );
  }

export default SinglePuzzlePiece;

  