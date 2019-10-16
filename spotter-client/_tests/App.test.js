import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../src/routes';
import { BrowserRouter as Router } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Routes /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});