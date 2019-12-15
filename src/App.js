import React from 'react';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import SignIn from 'containers/SignIn';
import Home from 'containers/Home/Home';
import List from 'containers/List';
import Signup from 'containers/Signup';

import Navbar from 'components/Navbar/Navbar';
import { AuthProvider } from 'components/Auth/Auth';

function App() {
  return (
    <div className="container-fluid px-0">
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/list" component={List} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
