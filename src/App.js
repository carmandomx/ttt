import { useState, useEffect } from 'react'
import Title from './Title';
import './App.css';


function determineWinner(board) {

    const winningPositions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for (let i = 0; i < winningPositions.length; i++) {
      const [a,b,c] = winningPositions[i];

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
      
    }

    return null;
}

function App() {
  const [history, setHistory] = useState([new Array(9).fill(null)])
  const [gameState, setGameState] = useState(history[history.length - 1]) // <--
  const [isXNext, setIsXNext] = useState(true);
  const [historyIdx, setHistoryIdx] = useState(0)

  useEffect(() => {
    setGameState(history[history.length -1])
  }, [history])


  const winner = determineWinner(gameState); // <-- 

  const handleOnClick = (i) => {
    if (historyIdx !== history.length - 1) return
    const copiedBoard = [...gameState];
    const copiedHistory = [...history];
    if (copiedBoard[i] || winner) return;

    copiedBoard[i] = isXNext ? 'X' : 'O';
    setIsXNext((prev) => !prev) // <-- Forma 2 - función
    // setGameState(copiedBoard) // <-- Forma 1 - pasar nuevo valor
    setHistoryIdx((prev) => prev +1)
    setHistory([...copiedHistory, copiedBoard]);

  }

  const handleOnChangeHistory = (bState, idx) => {
    setHistoryIdx(idx);
    setGameState(bState)

  }
  
  const list = gameState.map((value, index) => <Tile value={value} idx={index} key={index} handleOnClick={handleOnClick} />)
  const listOfMoves = history.map((value, index) => <HistoryListItem boardState={value} idx={index} handler={handleOnChangeHistory} key={index} />)
  return (
    <div className="App">
      <Title winner={winner} turn={isXNext ? 'O' : 'X'} />
      <main className='Board' >

        {list}
      </main>
      <aside>
        {listOfMoves}
      </aside>
    </div>
  );
}


function HistoryListItem({ boardState, idx, handler }) {

  if (idx === 0) return null;

  return (
    <li onClick={() => handler(boardState, idx)}>
      Turn { idx } 
    </li>
  )
}


function Tile({ value, handleOnClick, idx }) {

  

  return (
    <button className='Tile' onClick={() => {
      handleOnClick(idx);
    }} >
      { value }
    </button>
  );
}

export default App;
