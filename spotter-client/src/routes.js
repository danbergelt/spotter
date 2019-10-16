import React from 'react';

import { Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <Layout>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route component={NotFound}/>
    </Layout>
  )
}

export default Routes;