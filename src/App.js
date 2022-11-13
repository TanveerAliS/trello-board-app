import BoardContextProvider from './contexts/BoardContext'
import Board from './container/board/Board'

function App() {
  return (
    <BoardContextProvider>
      <Board />
    </BoardContextProvider>
  );
}

export default App;
