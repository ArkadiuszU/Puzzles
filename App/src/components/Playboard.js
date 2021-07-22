import React , { useState, useEffect, useCallback  } from 'react';

const allPieces = ["A", "B", "C", "D"]
const piecesPos = [0, -50, -100, -150]
const result = ["D", "C", "B", "A"]

import SinglePuzzlePiece from "./SinglePuzzlePiece";
import PuzzleDropBox from "./PuzzleDropBox";

function Playboard() {

    const [piecesForGrabfield, setPiecesForGrabfield] = useState(allPieces);
    const [piecesForDropfield, setPiecesForDropfield] = useState([]);
    const [gameStats, setGameStats] = useState({time:0, done:0});


    const [overDropBox, setOverDropBox] = useState(false)

    const MovePuzzlePieceEvent = (puzzlePieceId, direction) =>
    {
        //console.log(`try move: ${puzzlePieceId} when over is: ${overDropBox} with dir ${direction}`);
        if(direction)
        {
        if(overDropBox)
        {
            setPiecesForGrabfield(prev => { return prev.filter(v =>  v !== puzzlePieceId)}); 
            piecesForDropfield[overDropBox -1] = puzzlePieceId;
            setOverDropBox(false);

            CheckMove(puzzlePieceId, overDropBox)
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

    const CheckMove = (puzzle, place ) =>
    {
        if(result[place -1 ] == puzzle)
            setGameStats(prev => {return {...prev, done: prev.done + 1} })
        else
        console.log("NO");
    }


    useEffect(() => {

        const gameTimeInterval = setInterval( ()=> { setGameStats(prev => { return {...prev, time: prev.time+1}}) } , 1000);


        return () => 
        {
            clearInterval(gameTimeInterval);
        }

     }, [])

     useEffect(() => {

        //console.log(piecesForDropfield);
        //console.log(piecesForDropfield.length)

     }, [piecesForGrabfield])

    return (
        
        <div className= "playboard" >

            <div className="playboard__grabfield">
                {
                    piecesForGrabfield.map((el, id) => {
                        return <SinglePuzzlePiece key={id} pieceId={el} MovePuzzlePieceHandle={MovePuzzlePieceEvent} piecePos = {piecesPos[id]} />
                    })
                }
            </div>

            <div className="playboard__dropfield">
                <div className="playboard__dropfield__dropboxesarea" >
                    <div className="playboard__dropfield__dropboxesarea__image">
                    {
                        allPieces.map((el, id) => {
                            return( 
                                    <PuzzleDropBox key={id} boxId={id + 1} OverDropBoxChangeHandle = {OverDropBoxChangeEvent} overDropBoxFromPlayboard = {overDropBox}>
                                        {(piecesForDropfield[id])?<SinglePuzzlePiece key={id} pieceId={piecesForDropfield[id]} MovePuzzlePieceHandle={MovePuzzlePieceEvent} piecePos = {piecesPos[id]} />:null}
                                    </PuzzleDropBox>
                            )
                        })
                    }
                    </div>
                </div>
                
                <div className="playboard__dropfield__statarea">
                      <div> <p> {gameStats.time} s</p><img className="playboard__dropfield__statarea__icon" src="/src/resources/img/wall-clock.png" /> </div>
                      <div> <p> {gameStats.done * 100/ allPieces.length} %</p> <img className="playboard__dropfield__statarea__icon" src="/src/resources/img/percentage.png" /> </div>
                </div>

            </div>
        </div>
    );
  }

export default Playboard;