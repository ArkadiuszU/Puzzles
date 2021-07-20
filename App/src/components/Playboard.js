import React , { useState, useEffect, useCallback  } from 'react';

const allPieces = ["A", "B", "C", "D"]

import SinglePuzzlePiece from "./SinglePuzzlePiece";

function Playboard() {

    const [piecesInGrabfield, setPiecesInGrabfield] = useState(allPieces);
    const [piecesInDropfield, setPiecesInDropfield] = useState([]);

    const [overDropfield, setOverDropfield] = useState(false)

    const MovePuzzlePiece = (id)=>
    {
        console.log(`try move: ${id} when over is: ${overDropfield}`);
        if(overDropfield)
        {
            setPiecesInGrabfield(prev => { return prev.filter(v =>  v !== id)}); 
            setPiecesInDropfield(prev => [...prev, id]);
            setOverDropfield(false);
        }
    }

    return (
    <>
        <div className= "playboard" >

            <div className="playboard__grabfield">
                {
                    piecesInGrabfield.map((el, id) => {
                        return <SinglePuzzlePiece key={id} pieceId={el} change={MovePuzzlePiece}/>
                    })
                }
            </div>

            <div className="playboard__dropfield" onDragOver={(e)=> {e.preventDefault(); if(!overDropfield)setOverDropfield(true)}} onDragLeave={() => setOverDropfield(false)}>
                {
                    piecesInDropfield.map((el, id) => {
                    return <SinglePuzzlePiece key={id} pieceId={el} change={MovePuzzlePiece}/>
                    })
                }
            </div>

        </div>
    </>
    );
  }

export default Playboard;