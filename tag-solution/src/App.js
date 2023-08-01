import Board from './Components/Board';
import HeightScroll from './Components/HeightScroll';
import WidthScroll from './Components/WidthScroll';
import './scss/app.scss';

function App() {
  return (
    <div className="App">
      <Board />
      <HeightScroll />
      <WidthScroll />
    </div>
  );
}

export default App;
