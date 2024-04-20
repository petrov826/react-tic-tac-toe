import { useState } from "react";

function Square({ value, onSquareClick }) {
  // propsで受け取ったvalueを表示し、
  // ボタンが押されたらonSquareClickを呼ぶ
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

// Boardコンポーネントを宣言する
// export: この関数を他のファイルからアクセスできるようにする
// default: この関数を使うファイルに、この関数がメイン関数だと伝える
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    const updatedSquares = squares.slice() // squaresをコピーする
    updatedSquares[i] = "X" // i番目の値を上書きする
    setSquares(updatedSquares) // squaresを更新する

    // 参考: stateをコピーせずに直接上書きしようとしても動かない
    // squares[i] = "X"
    // setSquares(squares)
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
