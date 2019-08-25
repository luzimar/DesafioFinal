import React from 'react';

import { Switch, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Create from '../pages/Create';
import Edit from '../pages/Edit';
import Details from '../pages/Details';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create" component={Create} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/details/:id" component={Details} />
      <Route path="/profile/:userId" component={Profile} />
    </Switch>
  );
}
