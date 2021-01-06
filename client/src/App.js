import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './components/Home';
import { Chat } from './components/Chat';

function App() {
  return (
    <div className="App bg-green-100">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={(props) => <Chat {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
