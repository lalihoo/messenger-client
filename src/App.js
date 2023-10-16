import './App.css';
import LeftMenu from './LeftMenu';
import MainChat from './MainChat';


function App() {
  return (
    <div className="App">
      <LeftMenu></LeftMenu>
      <div id="portal-root"></div> {/* Элемент для портала */}
    </div>
  );
}

export default App;
