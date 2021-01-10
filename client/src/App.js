import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Home } from './components/Home';
import { Chat } from './components/Chat';
import io from 'socket.io-client';
import { Navbar } from './components/Navbar';
import { Register } from './components/Register';
import { Login } from './components/Login';
import {useSelector} from 'react-redux';
import { Component } from 'react';

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

const GuestRoute = ({component: Component, ...rest}) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <Route {...rest} render={
      (props) => {
        if(isLoggedIn) {
          return <Redirect to={{pathname: '/'}} />
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
          <GuestRoute exact path="/register" component={Register} />
          <GuestRoute exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
