import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './components/Home';
import { Chat } from './components/Chat';
import io from 'socket.io-client';

const URL = 'http://localhost:3001';

const socket = io.connect(URL);

function App() {
  return (
    <div className="App bg-green-100">
      <Router>
        <Switch>
          <Route exact path="/" component={(props) => <Home {...props} socket={socket} />} />
          <Route exact path="/chat" component={(props) => <Chat {...props} socket={socket} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
