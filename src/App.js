import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './components/Home';
import MapPage from './components/Map';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="appContainer">
            <div className="header">
              <div className="headerHome">
                <Link className="home-link" to="/"><img className="home" src="../images/plane.png"></img></Link>
              </div>
            </div>
            <Route exact path="/map" component={MapPage}/>
            <Route exact path="/" component={Home}/>
          </div>
        </Router>
    );
  }
}

export default App;
