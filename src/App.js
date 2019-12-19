import React, { Component } from 'react';
import './App.css'
import { withData } from './Context.js'
import Home from "./Home.js"

class App extends Component {


  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default withData(App);