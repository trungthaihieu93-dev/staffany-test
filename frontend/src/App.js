import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { JWT } from 'constants/env';
import { routes } from 'constants/routes';
import Authentication from 'screens/Authentication';
import Homepage from 'screens/Homepage';
import Shifts from 'screens/Shifts';
import ShiftForm from 'screens/ShiftForm';

import 'styles/global.css';

function App() {
  const jwt = window.localStorage.getItem(JWT);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={routes.shifts}>
            <Shifts />
          </Route>
          <Route path={`${routes.shifts}/:id`} children={<ShiftForm />} />
          <Route path={routes.home}>
            <Homepage />
          </Route>
          <Route path="/" >
            {jwt ? <Redirect to="/home" /> : <Authentication />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
