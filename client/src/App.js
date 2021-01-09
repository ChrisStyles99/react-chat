import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './components/Home';
import { Chat } from './components/Chat';
import io from 'socket.io-client';
import { Navbar } from './components/Navbar';
import { Register } from './components/Register';
import { Login } from './components/Login';
// import { Component } from 'react';

const URL = 'http://localhost:3001';

const socket = io.connect(URL);

// const ProtectedRoute = ({component: Component, ...rest}) => {
//   return (
//     <Route {...rest} render={
//       (props) => {
//         if(token === null) {
          
//         }
//       }
//     }>
//     </Route>
//   )
// }

function App() {
  return (
    <div className="App bg-gray-600">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={(props) => <Home {...props} socket={socket} />} />
          <Route exact path="/chat" component={(props) => <Chat {...props} socket={socket} />} />
          <Route exact path="/register" component={(props) => <Register {...props} />} />
          <Route exact path="/login" component={(props) => <Login {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
