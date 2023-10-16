import './App.css';
import './css/main-chat.css'
import LeftMenu from './menu/LeftMenu';

function App() {
  return (
    <div className="App">
      <LeftMenu></LeftMenu>
      <div className='main-chat-container' id="portal-root">

      </div>
    </div>
  );
}

export default App;
