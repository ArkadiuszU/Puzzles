import React , {useState, useEffect} from 'react';

function PuzzleDropBox({boxId, OverDropBoxChangeHandle, children, overDropBoxFromPlayboard}) {

    const [overThisDropBox, setOverThisDropBox] = useState(false)

    useEffect(()=> {
      console.log("overThis:" + overThisDropBox)
    }, [overThisDropBox])

    const onDragOverHandle =  (e)=> 
    {
      if(!children) e.preventDefault();
      if(!overDropBoxFromPlayboard)
      {
         setOverThisDropBox(true)
         OverDropBoxChangeHandle(boxId)
      }
    }

    const onDragLeaveHandle =  (e)=> 
    {
       setOverThisDropBox(false)
       OverDropBoxChangeHandle(false)
    }

    return (
    <>
        <div  onDragOver={onDragOverHandle} onDragLeave={onDragLeaveHandle}
              className = { `playboard__dropfield__boxtodrop ${((overDropBoxFromPlayboard == boxId) && !children )?"playboard__dropfield__boxtodrop-overthisbox":""}`} >
              {children}
        </div>
    </>
    )
  }

export default PuzzleDropBox;