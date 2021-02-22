// Importando o React
import React, { Component } from 'react';
// Importando o Component NavBar
import NavBar from './components/header/NavBar';
// Importando o component Main
import Main from './main'
// Importando o component Modal
import Modal from './components/home/Modal'
// Importando o component Modal
//import Home from './components/home/Home'

class App extends Component {
  constructor(){
    super();
    this.state = {
      show: false
    };
  }
  showModal(evento){
    this.setState({
      show: !this.state.show
    });
  };
  calculaHoras(horaEntrada, horaSaida){
    console.log("Hora entrada: " + horaEntrada + " Hora saída: " + horaSaida)
    var partsEntrada = horaEntrada.split(":");
    var partsSaida = horaSaida.split(":");
    var intHoraEntrada = parseInt(partsEntrada[0]);
    var intMinutoEntrada = parseInt(partsEntrada[1]);
    var intHoraSaida = parseInt(partsSaida[0]);
    var intMinutoSaida = parseInt(partsSaida[1]);
    console.log(intHoraEntrada);
    console.log(intMinutoEntrada);
    console.log(intHoraSaida);
    console.log(intMinutoSaida);
  }
  render() {
    return (
      <div>
        <NavBar />
        <Main calculaHoras={this.calculaHoras}/>
        <Modal show={this.state.show} />
      </div>
    );
  }
}

export default App;