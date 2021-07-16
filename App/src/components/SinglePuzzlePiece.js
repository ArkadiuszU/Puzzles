import React from 'react';

function SinglePuzzlePiece({color}) {
    return (
    <>
        <div className = {`playboard__singlepuzzlepiece playboard__singlepuzzlepiece--color-${color}`} >
        </div>
    </>
    );
  }

export default SinglePuzzlePiece;

  