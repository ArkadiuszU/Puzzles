import React , { useState, useEffect, useCallback  } from 'react';

function SinglePuzzlePiece({pieceId, color, startTop, startLeft, selected, selectedHandle}) {

    const [position, setPosition] = useState({top: startTop, left: startLeft})
    const [grab , setGrab ] = useState(false)

    useEffect(() => {
        console.log("no a jakkk")
      }, []);

      const changePositionEvent = useCallback(e => 
          {
            setPosition({left: e.clientX -25, top: e.clientY -25})
          },[])

      useEffect(() => {
          if(grab)
          {
            document.addEventListener('mousemove', changePositionEvent);
            selectedHandle(pieceId)
          }
          else 
            document.removeEventListener('mousemove', changePositionEvent);
        }, [grab]);

    return (
    <>
        <div onMouseDown = {()=> setGrab(true)} onMouseUp= {()=> setGrab(false)} style={{top: position.top, left:position.left}} 
             className = {
                            `playboard__singlepuzzlepiece
                            playboard__singlepuzzlepiece--color-${color}
                            playboard__singlepuzzlepiece--grab-${grab?"grabbed":"droped"}
                            playboard__singlepuzzlepiece--selected-${(selected == pieceId)?"true":"false"}`
                          } >
        </div>
    </>
    );
  }

export default SinglePuzzlePiece;

  