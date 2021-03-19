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
import DisplayByProvider from '../pages/DisplayByProvider';
import DisplayTypeMovementClient from '../pages/DisplayTypeMovementClient';
import DisplayTypeMovementProvider from '../pages/DisplayTypeMovementProvider';
import DisplayByBasketsClient from '../pages/DisplayByBasketsClient';
import DisplayByBasketsProvider from '../pages/DisplayByBasketsProvider';
import PdfPreview from '../pages/PdfPreview';
import DisplayFiltersClient from '../pages/displayFiltersClient'


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
          <Route path="/displayTypeMovementClient" component={DisplayTypeMovementClient} />;
          <Route path="/displayTypeMovementProvider" component={DisplayTypeMovementProvider} />;
          <Route path="/displayByProvider" component={DisplayByProvider} />
          <Route path="/displayByBasketsClient" component={DisplayByBasketsClient} />
          <Route path="/displayByBasketsProvider" component={DisplayByBasketsProvider} />
          <Route path="/pdfPreview" component={PdfPreview} />
          <Route path="/displayFiltersClient" component={DisplayFiltersClient} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
