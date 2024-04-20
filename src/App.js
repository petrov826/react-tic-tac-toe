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
export default function Board() {
  const [isXNext, setIsXNext] = useState(true)
  // チュートリアルサイトより引用
  // 複数の子コンポーネントからデータを収集したい、
  // あるいは 2 つの子コンポーネント同士で通信したい、と思ったら、
  // 代わりに親コンポーネントに共有の state を宣言するようにしてください
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    // 既に値が入っている時はreturnする(early return)
    if (squares[i]) {
      return
    }

    const updatedSquares = squares.slice() // squaresをコピーする

    if (isXNext) {
      updatedSquares[i] = "X" // i番目の値を上書きする
    } else {
      updatedSquares[i] = "O"
    }
    setIsXNext(!isXNext)

    setSquares(updatedSquares) // squaresを更新する
  }

  return (
    <>
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
