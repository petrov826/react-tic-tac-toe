import { useState } from "react";

// チュートリアルサイトより引用
// 親コンポーネント (Board) から子コンポーネント (Square) に伝えるために、
// propsを使用する
function Square({ value, onSquareClick }) {
  // propsで受け取ったvalueを表示し、
  // ボタンが押されたらonSquareClickを呼ぶ
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

// Boardコンポーネントを宣言する
// export: この関数を他のファイルからアクセスできるようにする
// default: この関数を使うファイルに、この関数がメイン関数だと伝える
function Board({ isXNext, squares, onPlay }) {
  // Gameにリフトアップしたのでstateをコメントアウトした
  // const [isXNext, setIsXNext] = useState(true)
  // チュートリアルサイトより引用
  // 複数の子コンポーネントからデータを収集したい、
  // あるいは 2 つの子コンポーネント同士で通信したい、と思ったら、
  // 代わりに親コンポーネントに共有の state を宣言するようにしてください
  // const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    // 既に値が入っている時はreturnする(early return)
    // 勝負が決まっている場合もreturnする
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const updatedSquares = squares.slice() // squaresをコピーする

    if (isXNext) {
      updatedSquares[i] = "X" // i番目の値を上書きする
    } else {
      updatedSquares[i] = "O"
    }
    // isXNextとSquaresはGameにリフトアップしたので、
    // 直接上書きすることはできない
    // チュートリアルサイトから引用（SquareからBoardにリフトアップした時の説明）
    // state はそれを定義しているコンポーネントにプライベートなものですので、
    // Square から Board の state を直接更新することはできません。
    // setIsXNext(!isXNext)
    // setSquares(updatedSquares) // squaresを更新する
    onPlay(updatedSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next Player: ${isXNext ? "X" : "O"}`
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* handleClick(0)と書くと関数が呼ばれてしまって、コールバックにならない
            アロー関数を使ってコールバックを作る */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [isXNext, setIsXNext] = useState(true)
  const [history, setHistory] = useState([
    Array(9).fill(null)
  ])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setIsXNext(!isXNext)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    setIsXNext(nextMove % 2 === 0)
  }
  
  // squares: historyから取り出された要素
  // move: historyから取り出された要素のインデックス
  const moves = history.map((squares, move) => {
    let description

    if (move > 0) {
      description = `Go to move#${move}`
    } else {
      description = "Go to game start"
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })
  
  return (
    <div className="game">
      <div className="game-board">
        <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    // 同じライン上のインデックスを取得する
    const [a, b, c] = lines[i]
    // aがnullではなく、aとbが同じで、aとcも同じなら...
    if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a]
    }
  }
  // それ以外の時は勝利者なし
  return null
}