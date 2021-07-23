import React , { useState, useEffect, useCallback  } from 'react';

const W = 600;
const H = 450;
const count = 12
const wh = Math.round(Math.sqrt(W*H/count))
const C = Math.round(W/wh)
const R = Math.round(H/wh)

const allPuzzlePieces = [];

let step = 1;
for (let row = 0; row < R; row++) {

    for (let col = 0; col < C; col++) {
        allPuzzlePieces.push({id:step, posX: (col*wh), posY: row*wh})
        step++
    }
  }

console.log(allPuzzlePieces)



const result = ["D1", "C1", "B1", "A1"]

import SinglePuzzlePiece from "./SinglePuzzlePiece";
import PuzzleDropBox from "./PuzzleDropBox";

function Playboard() {

    const [piecesForGrabfield, setPiecesForGrabfield] = useState(allPuzzlePieces.map(el=> {return el.id}));
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
        }
        }
        else
        {
            piecesForDropfield[piecesForDropfield.indexOf(puzzlePieceId)] = false;
            setPiecesForGrabfield(prev => [...prev, puzzlePieceId])
        }

        CheckPoints();
    }
    const OverDropBoxChangeEvent = (puzzleDropBoxId)=>
    {
        setOverDropBox(puzzleDropBoxId);
    }

    const CheckPoints = () =>
    {
        let points = 0
        piecesForDropfield.forEach((el, id) => {
            if(el == result[id])
                points ++
        });

        setGameStats(prev => {return {...prev, done: (points * 100/ result.length)}})
    }


    useEffect(() => {

        //const gameTimeInterval = setInterval( ()=> { setGameStats(prev => { return {...prev, time: prev.time+1}}) } , 1000);

        return () => 
        {
            clearInterval(gameTimeInterval);
        }

     }, [])

     useEffect(() => {

        //console.log(piecesForGrabfield);
        //console.log(piecesForDropfield);
        //console.log(piecesForDropfield.length)

     }, [piecesForGrabfield])

    return (
        
        <div className= "playboard" >

            <div className="playboard__grabfield">
                <div className="playboard__grabfield__grabbox">
                {
                    piecesForGrabfield.map((el, id) => {
                        const puzzlePieces = allPuzzlePieces.filter(v =>  v.id == el)[0]; 
                        return <SinglePuzzlePiece key={id} pieceId={puzzlePieces.id} MovePuzzlePieceHandle={MovePuzzlePieceEvent} piecePos = {{x:puzzlePieces.posX, y:puzzlePieces.posY}} size={wh} />
                    })
                }
                    </div>
            </div>

            <div className="playboard__dropfield">
                <div className="playboard__dropfield__dropboxesarea" >
                    <div className="playboard__dropfield__dropboxesarea__image" style={{width:`${W}px`, height:`${H}px`}}>
                    {
                        allPuzzlePieces.map((el, id) => {
                            const puzzlePieces = allPuzzlePieces.filter(v =>  v.id == piecesForDropfield[id])[0]; 
                            return( 
                                    <PuzzleDropBox key={id} boxId={id + 1} OverDropBoxChangeHandle = {OverDropBoxChangeEvent} overDropBoxFromPlayboard = {overDropBox} size={wh} >
                                        {(puzzlePieces)?<SinglePuzzlePiece key={id} pieceId={puzzlePieces.id} MovePuzzlePieceHandle={MovePuzzlePieceEvent} piecePos = {{x:puzzlePieces.posX, y:puzzlePieces.posY}} size={wh} />:null}
                                    </PuzzleDropBox>
                            )
                        })
                    }
                    </div>
                </div>
                
                <div className="playboard__dropfield__statarea">
                      <div> <p> {gameStats.time} s</p><img className="playboard__dropfield__statarea__icon" src="/src/resources/img/wall-clock.png" /> </div>
                      <div> <p> {gameStats.done} %</p> <img className="playboard__dropfield__statarea__icon" src="/src/resources/img/percentage.png" /> </div>
                </div>

            </div>
        </div>
    );
  }

export default Playboard;