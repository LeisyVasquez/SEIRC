import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../pages/Login"
import RegistroTerceros from '../pages/RegistroTerceros'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"  component={Login} />
        <Route path="/register" component={RegistroTerceros} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
