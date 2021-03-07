import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/app.css';

import Login from "../pages/Login";
import ThirdPartyRegistration from '../pages/ThirdPartyRegistration';
import AdminRegistration from '../pages/AdminRegistration'
import BasketsRegistration from '../pages/BasketsRegistration';
import LoanReturnClient from '../pages/LoanReturnClient';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={ThirdPartyRegistration} />
          <Route path="/adminRegistration" component={AdminRegistration} />
          <Route path="/basketsRegistration" component={BasketsRegistration} />
          <Route path="/loanReturnClient" component={LoanReturnClient} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
