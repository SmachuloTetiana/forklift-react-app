import React from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import List from './components/List/List';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/signup" component={Signup} />
        <Route path="/list" component={List} />
      </Switch>
    </div>
  );
}

export default App;
