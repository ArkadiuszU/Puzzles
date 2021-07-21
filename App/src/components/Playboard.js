import React , { useState, useEffect, useCallback  } from 'react';

const allPieces = ["A", "B", "C", "D"]

import SinglePuzzlePiece from "./SinglePuzzlePiece";
import PuzzleDropBox from "./PuzzleDropBox";

function Playboard() {

    const [piecesForGrabfield, setPiecesForGrabfield] = useState(allPieces);
    const [piecesForDropfield, setPiecesForDropfield] = useState([]);

    const [overDropBox, setOverDropBox] = useState(false)

    const MovePuzzlePieceEvent = (puzzlePieceId, direction)=>
    {
        console.log(`try move: ${puzzlePieceId} when over is: ${overDropBox} with dir ${direction}`);
        if(direction)
        {
         if(overDropBox)
        {
            setPiecesForGrabfield(prev => { return prev.filter(v =>  v !== puzzlePieceId)}); 
            piecesForDropfield[overDropBox -1] = puzzlePieceId;
            setOverDropBox(false);
        }
        }
        else
        {
            piecesForDropfield[piecesForDropfield.indexOf(puzzlePieceId)] = false;
            setPiecesForGrabfield(prev => [...prev, puzzlePieceId])

        }
    }

    const OverDropBoxChangeEvent = (puzzleDropBoxId)=>
    {
        setOverDropBox(puzzleDropBoxId);
    }

    return (
        
        <div className= "playboard" >

            <div className="playboard__grabfield">
                {
                    piecesForGrabfield.map((el, id) => {
                        return <SinglePuzzlePiece key={id} pieceId={el} MovePuzzlePieceHandle={MovePuzzlePieceEvent}/>
                    })
                }
            </div>

            <div className="playboard__dropfield">
                {
                    allPieces.map((el, id) => {
                    return( 
                            <PuzzleDropBox key={id} boxId={id + 1} OverDropBoxChangeHandle = {OverDropBoxChangeEvent}>
                                {(piecesForDropfield[id])?<SinglePuzzlePiece key={id} pieceId={piecesForDropfield[id]} MovePuzzlePieceHandle={MovePuzzlePieceEvent}/>:null}
                            </PuzzleDropBox>
                    )
                    })
                }

                <img className="playboard__dropfield__icon" src="/src/resources/img/wall-clock.png" />
                <img className="playboard__dropfield__icon" src="/src/resources/img/percentage.png" />
            </div>
        </div>
    );
  }

export default Playboard;