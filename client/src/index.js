import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

//Estilos de react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Estilos de react-bootstrap

//Pages
import RegistroTerceros from './pages/RegistroTerceros'
//Pages

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/" exact component={() => <RegistroTerceros />} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

