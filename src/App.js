function Square() {
  return <button className="square">1</button>
}

// Squareコンポーネントを宣言する
// export: この関数を他のファイルからアクセスできるようにする
// default: この関数を使うファイルに、この関数がメイン関数だと伝える
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>

      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>

      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
