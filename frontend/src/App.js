import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Authorization from 'screens/Authorization';

import 'styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Authorization</Link>
            </li>
            <li>
              <Link to="/shifts">Shifts</Link>
            </li>
            <li>
              <Link to="/update-shift">Update Shift</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/update-shift">
            {() => <div>Update Shift</div>}
          </Route>
          <Route path="/shifts">
            {() => <div>Shifts</div>}
          </Route>
          <Route path="/">
            <Authorization />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
