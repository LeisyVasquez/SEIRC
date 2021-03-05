import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/app.css';

import Login from "../pages/Login"
import ThirdPartyRegistration from '../pages/ThirdPartyRegistration'
import BasketsRegistration from '../pages/BasketsRegistration'


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={ThirdPartyRegistration} />
          <Route path="/basketsRegistration" component={BasketsRegistration} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
