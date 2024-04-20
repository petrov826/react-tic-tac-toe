import { useState } from "react";

function Square() {
  const [value, setValue] = useState(null)

  function handleClick() {
    setValue("X")
  }

  // propsで受け取った値を表示する
  return <button className="square" onClick={handleClick}>{value}</button>
}

// Squareコンポーネントを宣言する
// export: この関数を他のファイルからアクセスできるようにする
// default: この関数を使うファイルに、この関数がメイン関数だと伝える
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>

      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>

      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>
    </>
  );
}
