import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './header';
import Login from './login'



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Login} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
