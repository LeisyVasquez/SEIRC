import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../pages/Login"
import ThirdPartyRegistration from '../pages/ThirdPartyRegistration'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"  component={Login} />
        <Route path="/register" component={ThirdPartyRegistration} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
