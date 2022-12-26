function Title({ winner, turn }) {
    return (
      <h5>
        { winner ? 'Winner:' : 'Tic Tac Toe' } { winner && turn } 
      </h5>
    )
  }


export default Title;