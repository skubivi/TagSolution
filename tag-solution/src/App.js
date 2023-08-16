import { useSelector } from 'react-redux';
import Board from './Components/Board';
import GameField from './Components/GameField';
import HeightScroll from './Components/HeightScroll';
import WidthScroll from './Components/WidthScroll';
import './scss/app.scss';
import disableScroll from 'disable-scroll'
import LoaderScreen from './Components/LoaderScreen';
import NeighborsMenu from './Components/NeighborsMenu';

function App() {
  let firstWindow = !useSelector((state) => state.gameField.ready)
  let secondWindow = !useSelector((state) => state.gameField.ready1)
  const start = () => {
    return !firstWindow
  }
  const end = () => {
      return !secondWindow
  }

  const showNeighbors = useSelector((state) => state.neighbors.show)
  const neighbors = useSelector((state) => state.neighbors.neighbors)
  return (
    <div 
      className="App"
      onMouseEnter={(e) => {disableScroll.on()}}
      onMouseLeave={(e) => {disableScroll.off()}}
    >
      {secondWindow && <GameField />}
      {!secondWindow && <Board />}
      {!secondWindow && <HeightScroll />}
      {!secondWindow && <WidthScroll />}
      <LoaderScreen start={start()} end={end()} />
      {showNeighbors && <NeighborsMenu neighbors={neighbors}/>}
    </div>
  );
}

export default App;
