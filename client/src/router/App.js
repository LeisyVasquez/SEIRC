import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/app.css';

import Login from "../pages/Login";
import ThirdPartyRegistration from '../pages/ThirdPartyRegistration';
import AdminRegistration from '../pages/AdminRegistration'
import BasketsRegistration from '../pages/BasketsRegistration';
import LoanReturnClient from '../pages/LoanReturnClient';
import HomeAdmin from '../pages/HomeAdmin';
import HomeSuperUser from '../pages/HomeSuperUser';
import HomeThirdParty from '../pages/HomeThirdParty';
import DeleteClient from '../pages/DeleteClient';



function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/thirdPartyRegistration" component={ThirdPartyRegistration} />
          <Route path="/adminRegistration" component={AdminRegistration} />
          <Route path="/basketsRegistration" component={BasketsRegistration} />
          <Route path="/loanReturnClient" component={LoanReturnClient} />
          <Route path="/homeAdmin" component={HomeAdmin} />
          <Route path="/homeSuperUser" component={HomeSuperUser} />
          <Route path="/homeThirdParty" component={HomeThirdParty} />
          <Route path="/deleteClient" component={DeleteClient} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
