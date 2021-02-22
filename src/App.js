// Importando o React
import React, { Component } from 'react';
// Importando o Component NavBar
import NavBar from './components/header/NavBar';
// Importando o component Main
import Main from './main'
// Importando o component Modal
//import Modal from './components/home/Modal'
//<Modal show={this.state.show} horasDiurnas={this.state.diurnas} horasNoturnas={this.state.noturnas}/>
// Importando o component Modal
//import Home from './components/home/Home'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Main />
      </div>
    );
  }
}

export default App;