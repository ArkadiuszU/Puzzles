import React , {useState, useEffect} from 'react';

function PuzzleDropBox({boxId, OverDropBoxChangeHandle, children}) {

    const [overThisDropBox, setOverThisDropBox] = useState(false)


    useEffect(()=> {

        if(overThisDropBox)
          OverDropBoxChangeHandle(boxId)
        else
          OverDropBoxChangeHandle(false)

    }, [overThisDropBox])

    return (
    <>
        <div onDragOver={(e)=> { {(!children)?e.preventDefault():null} if(!overThisDropBox)setOverThisDropBox(true)}} onDragLeave={() => setOverThisDropBox(false)}
            className = { `playboard__dropfield__boxtodrop ${(overThisDropBox && !children )?"playboard__dropfield__boxtodrop-overthisbox":""}`} >
              {children}
        </div>
    </>
    )
  }

export default PuzzleDropBox;