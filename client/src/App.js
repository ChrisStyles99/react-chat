import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Home } from './components/Home';
import { Chat } from './components/Chat';
import io from 'socket.io-client';
import { Navbar } from './components/Navbar';
import { Register } from './components/Register';
import { Login } from './components/Login';
import {useSelector} from 'react-redux';

const URL = 'http://localhost:3001';

const socket = io.connect(URL);

const ProtectedRoute = ({component: Component, ...rest}) => {

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <Route {...rest} render={
      (props) => {
        if(!isLoggedIn) {
          return <Redirect to={{pathname: '/login'}} />
        } else {
          return <Component {...props} />
        }
      }
    }>
    </Route>
  )
}

function App() {
  return (
    <div className="App bg-gray-600">
      <Router>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/" component={(props) => <Home {...props} socket={socket} />} />
          <ProtectedRoute exact path="/chat" component={(props) => <Chat {...props} socket={socket} />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
