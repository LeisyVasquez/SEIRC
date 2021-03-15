import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/app.css';

import Login from "../pages/Login";
import ThirdPartyRegistration from '../pages/ThirdPartyRegistration';
import AdminRegistration from '../pages/AdminRegistration'
import BasketsRegistration from '../pages/BasketsRegistration';
import LoanReturnClient from '../pages/LoanReturnClient';
import LoanReturnProvider from '../pages/LoanReturnProvider'
import HomeAdmin from '../pages/HomeAdmin';
import HomeSuperUser from '../pages/HomeSuperUser';
import HomeThirdParty from '../pages/HomeThirdParty';
import DeleteMovementClient from '../pages/DeleteMovementClient';
import DeleteMovementProvider from '../pages/DeleteMovementProvider';
import NotAuthorized from '../pages/NotAuthorized';
import DisplayByClient from '../pages/DisplayByClient';
import TypeMovementClient from '../pages/TypeMovementClient';
import DisplayByProvider from '../pages/DisplayByProvider';
import DisplayByBaskets from '../pages/DisplayByBaskets';


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
          <Route path="/loanReturnProvider" component={LoanReturnProvider} />
          <Route path="/homeAdmin" component={HomeAdmin} />
          <Route path="/homeSuperUser" component={HomeSuperUser} />
          <Route path="/homeThirdParty" component={HomeThirdParty} />
          <Route path="/deleteMovementClient" component={DeleteMovementClient} />
          <Route path="/deleteMovementProvider" component={DeleteMovementProvider} />
          <Route path="/notAuthorized" component={NotAuthorized} />
          <Route path="/displayByClient" component={DisplayByClient} />
          <Route path="/typeMovementClient" component={TypeMovementClient} />;
          <Route path="/displayByProvider" component={DisplayByProvider} />
          <Route path="/displayByBaskets" component={DisplayByBaskets} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
