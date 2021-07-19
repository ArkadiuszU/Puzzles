import React , { useState, useEffect, useCallback  } from 'react';


const pieces = ["red", "green", "yellow", "blue"]

import SinglePuzzlePiece from "./SinglePuzzlePiece";
function Playboard() {
    const [lastSelected, setLastSelected] = useState(0)

    const selectedChange = (selectedPiece) =>
    {
        console.log(`last selected was ${selectedPiece}`)
        setLastSelected(selectedPiece)
    }
    return (
        <div className= "playboard">
        {
            pieces.map((el,id) => {
                return (
                    <SinglePuzzlePiece key={id} selected = {lastSelected}  pieceId={id} color = {el} startTop = {Math.random() * 80} startLeft= {Math.random() * 80} selectedHandle = {selectedChange} />
                )
            })
        }
        </div>
    );
  }

export default Playboard;