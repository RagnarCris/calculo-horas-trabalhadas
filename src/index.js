// Importando o React
import React from 'react';
// Importando o React Dom para injetar o <APP /> na tag <div id="root"></div> do index.html
import ReactDOM from 'react-dom';
// Importando o componenet APP
import App from './App';
// Importando a nossa Lib de rotas
import { BrowserRouter } from 'react-router-dom'
// Importando o css
import './index.css';

// Renderizando o component APP (com seus sub componenets e etc) em <div id="root"></div> do index.html
// O <BrowserRouter> em torno de <App /> faz com que as rotas fiquem disponíveis no nosso APP todo
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))