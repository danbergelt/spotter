import React from 'react';

import { Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const Routes = () => {
  return (
    <Layout>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </Layout>
  )
}

export default Routes;