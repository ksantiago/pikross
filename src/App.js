import React from 'react';
import Home from './client/home'
import Board from './client/board'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Footer from './client/footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/board" component={Board} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
