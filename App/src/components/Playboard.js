import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

import Profile from "./Profile"

import timeImg from "../resources/img/wall-clock.png";
import percentImg from "../resources/img/percentage.png";



let gameTimeInterval;
let result;

import SinglePuzzlePiece from "./SinglePuzzlePiece";
import PuzzleDropBox from "./PuzzleDropBox";


function Playboard() {

    const [allPieces, setAllPieces] = useState();
    const [piecesForGrabfield, setPiecesForGrabfield] = useState();
    const [piecesForDropfield, setPiecesForDropfield] = useState([]);
    const [gameStats, setGameStats] = useState({ timeS: 0, timeM: 0, done: 0, moves:0 });
    const [overDropBox, setOverDropBox] = useState(false)
    const [endGame, setEndGame] = useState(false)
    const [uncover, SetUncover] = useState(false)

    const [puzzleTask, setPuzzleTask] = useState()
    const [contentLoaded, SetContentLoaded] = useState(false)

    const [boxSize, setBoxSize] = useState()
    let { id } = useParams();


    const checkWindowWidth = () => {
        const w = window.innerWidth;
        if (w < 1199.98) {
            if (w < 991.98) {
                if (w < 767.98) {
                    if (w < 575.98) {
                        setBoxSize(75);
                    }
                    else {
                        setBoxSize(100);
                    }

                }
                else {
                    setBoxSize(100);
                }

            }
            else {
                setBoxSize(125);
            }
        }
        else {
            setBoxSize(150);
        }
    }

    const prepareLayout = (boxSize) =>
    {
        const allPuzzlePieces = [];
        let step = 1;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                allPuzzlePieces.push({ id: step, posX: (col * boxSize * -1), posY: row * boxSize * -1 })
                step++
            }
        }

        return allPuzzlePieces;
    }

  


    useEffect(() => {

        window.addEventListener('resize', e => {
            checkWindowWidth();
        }
        );

        setTimeout(_ => {

            fetch(`${BASEURL}/api/PuzzleTask/${id}`)
                .then(response => response.json())
                .then(data => { setPuzzleTask(data); SetContentLoaded(true) });


        }, 1000)

        checkWindowWidth();

    }, [])

    useEffect(() => {
        setAllPieces(prepareLayout(boxSize));
    }, [boxSize])

    useEffect(() => {
        if(allPieces != undefined && piecesForGrabfield == undefined)
        {
            result = allPieces.map(el => { return el.id })
            setPiecesForGrabfield(result)
        }
    }, [allPieces])



    const MovePuzzlePieceEvent = (puzzlePieceId, direction) => {
      
        if (direction) {
            if (overDropBox) {
                setPiecesForGrabfield(prev => { return prev.filter(v => v !== puzzlePieceId) });
                piecesForDropfield[piecesForDropfield.indexOf(puzzlePieceId)] = false;
                piecesForDropfield[overDropBox - 1] = puzzlePieceId;
                setOverDropBox(false);
            }
        }
        else {
            piecesForDropfield[piecesForDropfield.indexOf(puzzlePieceId)] = false;
            setPiecesForGrabfield(prev => [...prev, puzzlePieceId])
        }

        
        CheckPoints();
    }
    const OverDropBoxChangeEvent = (puzzleDropBoxId) => {
        setOverDropBox(puzzleDropBoxId);
    }

    const CheckPoints = () => {
        let points = 0
        piecesForDropfield.forEach((el, id) => {
            if (el == result[id])
                points++
        });

        setGameStats(prev => { return { ...prev, done: (Math.round(points * 100 / result.length)) } })

        if (points * 100 / result.length == 100) {
            console.log("zwycięstwo")
            clearInterval(gameTimeInterval);
            setPiecesForDropfield([])
            setEndGame(true)
            setAllPieces([]);
        }
    }

    useEffect(() => {

        gameTimeInterval = setInterval(() => { setGameStats(prev => { return { ...prev, timeS: prev.timeS + 1 } }) }, 1000);
        return () => {
            clearInterval(gameTimeInterval);
        }

    }, [])

    useEffect(() => {
        if (gameStats.timeS >= 60)
            setGameStats(prev => { return { ...prev, timeS: 0, timeM: prev.timeM + 1 } })
    }, [gameStats.timeS])

    if (contentLoaded && allPieces != undefined && piecesForGrabfield != undefined) {
        return (
            <>
                <Profile />
                <div className="playboard" style={{ "--image": `url(${puzzleTask.imagePath})` }}>
                    {!endGame ?
                        <div className="playboard__grabfield">
                            <div className="playboard__grabfield__grabbox">
                                {
                                    piecesForGrabfield.map((el, id) => {
                                        const puzzlePieces = allPieces.filter(v => v.id == el)[0];
                                        return <SinglePuzzlePiece key={id} pieceId={puzzlePieces.id} MovePuzzlePieceHandle={MovePuzzlePieceEvent} piecePos={{ x: puzzlePieces.posX, y: puzzlePieces.posY }} size={boxSize} onGrabfield={true} image={puzzleTask.imagePath} />
                                    })
                                }
                            </div>
                        </div>
                        : null
                    }

                    <div className="playboard__dropfield">
                        <div className="playboard__dropfield__dropboxesarea" >
                            <div className={`playboard__dropfield__dropboxesarea__image ${uncover ? "playboard__dropfield__dropboxesarea__image-uncovered" : ""}  ${endGame ? "playboard__dropfield__dropboxesarea__image-exposed" : ""}`} style={{ width: `${boxSize * 4}px`, height: `${boxSize * 3}px` }}>
                                {
                                    allPieces.map((el, id) => {
                                        const puzzlePieces = allPieces.filter(v => v.id == piecesForDropfield[id])[0];
                                        return (
                                            <PuzzleDropBox key={id} boxId={id + 1} OverDropBoxChangeHandle={OverDropBoxChangeEvent} overDropBoxFromPlayboard={overDropBox} size={boxSize} >
                                                {(puzzlePieces) ? <SinglePuzzlePiece key={id} pieceId={puzzlePieces.id} MovePuzzlePieceHandle={MovePuzzlePieceEvent} piecePos={{ x: puzzlePieces.posX, y: puzzlePieces.posY }} size={boxSize} onGrabfield={false} image={puzzleTask.imagePath} /> : null}
                                            </PuzzleDropBox>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {!endGame ?
                            <div className="playboard__dropfield__statarea">
                                <div> <p> {gameStats.timeM > 0 ? `${gameStats.timeM}m` : ""}{gameStats.timeS}s</p><img className="playboard__dropfield__statarea__icon" src={timeImg} /> </div>
                                <div> <p> {gameStats.done} %</p> <img className="playboard__dropfield__statarea__icon" src={percentImg} /> </div>
                                <div className="playboard__dropfield__statarea__hint"  onTouchStart={ _=> SetUncover(true)}  onMouseDownCapture={ _=> SetUncover(true)} onTouchEnd={_=> SetUncover(false)} onMouseUpCapture={_=> SetUncover(false)} onMouseLeave={_=> SetUncover(false)}> show hint </div> 
                            </div>
                            :
                            <div className="playboard__dropfield__statarea">
                                <h4>"Zwycięstwo !!!"</h4>
                                <p> {gameStats.timeM > 0 ? `${gameStats.timeM}m` : ""}{gameStats.timeS}s</p>
                            </div>
                        }

                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <Profile />
                <Loading />
            </>
        )
    }

}

export default Playboard;