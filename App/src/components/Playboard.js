import React , { useState, useEffect, useCallback  } from 'react';


const pieces = ["red", "green", "yellow", "blue"]

import SinglePuzzlePiece from "./SinglePuzzlePiece";
function Playboard() {
    const [lastSelected, setLastSelected] = useState(0)
    const [playboardHover , setPlayboardHover] = useState(true);

    const selectedChange = (selectedPiece) =>
    {
        console.log(`last selected was ${selectedPiece}`)
        setLastSelected(selectedPiece)
    }

    useEffect(() => {
        if(playboardHover)
        {
          console.log("TAK")
        }
        else 
        console.log("NIE")
      }, [playboardHover]);

    return (
    <>
        <div className= "playboard">
        {
            pieces.map((el, id) => {
                return (
                    <SinglePuzzlePiece key={id} abovePlayboard = {playboardHover} selected = {lastSelected}  pieceId={id+1} selectedHandle = {selectedChange} />
                )
            })
        }
        </div>

        <div className= "dropfield" onMouseEnter = {(e)=> {e.stopPropagation(); setPlayboardHover(true)}} onMouseLeave = {(e)=> {e.stopPropagation(); setPlayboardHover(false)}}>
            {
            // pieces.map((el, id) => {
            //     return (
            //     <SinglePuzzlePiece key={id} abovePlayboard = {playboardHover} selected = {lastSelected}  pieceId={id+1} selectedHandle = {selectedChange} />
            //     )
            //     })
            }
        </div>

    </>

    );
  }

export default Playboard;