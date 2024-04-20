function Square({ value }) {
  // propsで受け取った値を表示する
  return <button className="square">{value}</button>
}

// Squareコンポーネントを宣言する
// export: この関数を他のファイルからアクセスできるようにする
// default: この関数を使うファイルに、この関数がメイン関数だと伝える
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>

      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>

      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
