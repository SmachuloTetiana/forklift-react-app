import React from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import SignIn from './components/SignIn';
import Home from './components/Home';
import Navbar from './components/Navbar';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/list" component={List} />
      </Switch>
    </div>
  );
}

export default App;
