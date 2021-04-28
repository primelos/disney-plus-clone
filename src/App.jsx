import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './components/header';
import Home from './components/home';
import Login from './components/login'



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route  path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
