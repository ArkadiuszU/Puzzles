import React , { useState, useEffect, useCallback  } from 'react';
import { useParams} from 'react-router-dom';

const W = 600;
const H = 450;
const count = 12
const wh = Math.round(Math.sqrt(W*H/count))
const C = Math.round(W/wh)
const R = Math.round(H/wh)
const allPuzzlePieces = [];
let gameTimeInterval;

const colors = ["red", "blue"]

let step = 1;
for (let row = 0; row < R; row++) {

    for (let col = 0; col < C; col++) {
        allPuzzlePieces.push({id:step, posX: (col*wh *-1), posY: row*wh*-1})
        step++
    }
  }

console.log(allPuzzlePieces)

const result = allPuzzlePieces.map(el=> {return el.id})

import SinglePuzzlePiece from "./SinglePuzzlePiece";
import PuzzleDropBox from "./PuzzleDropBox";

import image1 from "../resources/img/puzzle-task-image-1.png"
import image2 from "../resources/img/puzzle-task-image-2.jpg"
import image3 from "../resources/img/puzzle-task-image-3.jpg"
import image4 from "../resources/img/puzzle-task-image-4.jpg"
import image5 from "../resources/img/puzzle-task-image-5.jpg"
import image6 from "../resources/img/puzzle-task-image-6.jpg"
import image7 from "../resources/img/puzzle-task-image-7.jpg"
import image8 from "../resources/img/puzzle-task-image-8.jpg"

const images =  [image1, image2, image3, image4, image5, image6, image7, image8]

function Playboard() {
    
    const [allPieces, setAllPieces] = useState(allPuzzlePieces);
    const [piecesForGrabfield, setPiecesForGrabfield] = useState(result);
    const [piecesForDropfield, setPiecesForDropfield] = useState([]);
    const [gameStats, setGameStats] = useState({timeS:0, timeM:0, done:0});
    const [overDropBox, setOverDropBox] = useState(false)
    const [endGame, setEndGame] = useState(false)

    let { id } = useParams();
    const MovePuzzlePieceEvent = (puzzlePieceId, direction) =>
    {
        //console.log(`try move: ${puzzlePieceId} when over is: ${overDropBox} with dir ${direction}`);
        if(direction)
        {
            if(overDropBox)
            {
                setPiecesForGrabfield(prev => { return prev.filter(v =>  v !== puzzlePieceId)});
                piecesForDropfield[piecesForDropfield.indexOf(puzzlePieceId)] = false;
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

        setGameStats(prev => {return {...prev, done: (Math.round(points * 100/ result.length))}})

        if(points * 100/ result.length == 100)
        {
            console.log("zwycięstwo")
            clearInterval(gameTimeInterval);
            setPiecesForDropfield([])
            setEndGame(true)
            setAllPieces([]);
        }
    }

    useEffect(() => {

        gameTimeInterval = setInterval( ()=> { setGameStats(prev => { return {...prev, timeS: prev.timeS+1}}) } , 1000);
        console.log(id)
        return () => 
        {
            clearInterval(gameTimeInterval);
        }

     }, [])

     useEffect(() => {
        if(gameStats.timeS>=60)
            setGameStats(prev => {return {...prev, timeS: 0, timeM: prev.timeM+1}})
     }, [gameStats.timeS])

    return (
        <div className= "playboard" style = {{"--color" : colors[id -1], "--image" : `url(${images[id-1]})`}}>
        {!endGame?
            <div className="playboard__grabfield">
                <div className="playboard__grabfield__grabbox">
                {
                    piecesForGrabfield.map((el, id) => {
                        const puzzlePieces = allPuzzlePieces.filter(v =>  v.id == el)[0]; 
                        return <SinglePuzzlePiece key={id} pieceId={puzzlePieces.id} MovePuzzlePieceHandle={MovePuzzlePieceEvent} piecePos = {{x:puzzlePieces.posX, y:puzzlePieces.posY}} size={wh} onGrabfield = {true} image = {images[id-1]} />
                    })
                }
                </div>
            </div>
            :null
        }

            <div className="playboard__dropfield">
                <div className="playboard__dropfield__dropboxesarea" >
                    <div className= {`playboard__dropfield__dropboxesarea__image ${endGame?"playboard__dropfield__dropboxesarea__image-exposed":""}`} style={{width:`${W}px`, height:`${H}px`}}>
                    {
                        allPieces.map((el, id) => {
                            const puzzlePieces = allPieces.filter(v =>  v.id == piecesForDropfield[id])[0]; 
                            return( 
                                    <PuzzleDropBox key={id} boxId={id + 1} OverDropBoxChangeHandle = {OverDropBoxChangeEvent} overDropBoxFromPlayboard = {overDropBox} size={wh} >
                                        {(puzzlePieces)?<SinglePuzzlePiece key={id} pieceId={puzzlePieces.id} MovePuzzlePieceHandle={MovePuzzlePieceEvent} piecePos = {{x:puzzlePieces.posX, y:puzzlePieces.posY}} size={wh} onGrabfield = {false} image = {images[id-1]}  />:null}
                                    </PuzzleDropBox>
                            )
                        })
                    }
                    </div>
                </div>

                {!endGame?
                <div className="playboard__dropfield__statarea">
                      <div> <p> {gameStats.timeM>0?`${gameStats.timeM}m`:""}{gameStats.timeS}s</p><img className="playboard__dropfield__statarea__icon" src="/src/resources/img/wall-clock.png" /> </div>
                      <div> <p> {gameStats.done} %</p> <img className="playboard__dropfield__statarea__icon" src="/src/resources/img/percentage.png" /> </div>
                </div>
                :
                <div className="playboard__dropfield__statarea">
                    <h4>"Zwycięstwo !!!"</h4>
                    <p> {gameStats.timeM>0?`${gameStats.timeM}m`:""}{gameStats.timeS}s</p>
                </div>
                }

            </div>
        </div>
    );
  }

export default Playboard;