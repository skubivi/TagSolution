import { useSelector } from 'react-redux';
import Board from './Components/Board';
import GameField from './Components/GameField';
import HeightScroll from './Components/HeightScroll';
import WidthScroll from './Components/WidthScroll';
import './scss/app.scss';
import disableScroll from 'disable-scroll'

function App() {
  let firstWindow = useSelector((state) => state.gameField.ready)
  return (
    <div 
      className="App"
      onMouseEnter={(e) => {disableScroll.on()}}
      onMouseLeave={(e) => {disableScroll.off()}}
    >
      {!firstWindow && <GameField />}
      {firstWindow && <Board />}
      {firstWindow && <HeightScroll />}
      {firstWindow && <WidthScroll />}
    </div>
  );
}

export default App;
