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

import 'styles/global.css';

function App() {
  let jwt = window.localStorage.getItem(JWT);

  if (jwt === 'null') { jwt = null; }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={routes.home}>
            <Homepage />
          </Route>
          <Route path={routes.shifts}>
            <Shifts />
          </Route>
          <Route path="/" >
            {jwt ? <Redirect to={routes.home} /> : <Authentication />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
