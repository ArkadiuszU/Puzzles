import React , {useState, useEffect} from 'react';

function PuzzleDropBox({boxId, OverDropBoxChangeHandle, children, overDropBoxFromPlayboard, size}) {

    const onDragOverHandle =  (e)=> 
    {
     
      if(!children) e.preventDefault();
      if(!overDropBoxFromPlayboard)
      {
         OverDropBoxChangeHandle(boxId)
        
      }
    }

    const onDragLeaveHandle =  (e)=> 
    {
       OverDropBoxChangeHandle(false)
      
    }

    return (
    <>
        <div  onDragOver={onDragOverHandle} onDragLeave={onDragLeaveHandle}
        style = {{ width : `${size}px`, height : `${size}px`  } }
              className = { `playboard__dropfield__dropboxesarea__image__boxtodrop ${((overDropBoxFromPlayboard == boxId) && !children )?"playboard__dropfield__dropboxesarea__image__boxtodrop-overthisbox":""}`} >
              {children}
        </div>
    </>
    )
  }

export default PuzzleDropBox;