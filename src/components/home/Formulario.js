// Importando o React
import React, { Component } from 'react'
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, Input, Button } from 'react-materialize';

class Formulario extends Component {
    constructor(props){
        super(props);
        this.horaEntrada = "";
        this.horaSaida = "";
        this.state = {
            errors: {}
        }
    }
    //Função que verifica se houve algum erro no preenchimento do formulário
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        var listaHoraEntrada = this.horaEntrada.split("");
        var listaHoraSaida = this.horaSaida.split("");
        var partsEntrada = this.horaEntrada.split(":");
        var partsSaida = this.horaSaida.split(":");
        //Hora Entrada
        if(this.horaEntrada == ""){
            formIsValid = false;
            errors["horaEntrada"] = "Não pode ser vazio";
        }
        else if(listaHoraEntrada.length !== 5){
            formIsValid = false;
            errors["horaEntrada"] = "Hora deve ser no formato HH:MM";
        }
        else if(partsEntrada.length == 1){
            formIsValid = false;
            errors["horaEntrada"] = "Hora deve ser separada do Minuto por um ':'";
        }
        else if(!partsEntrada[0].match(/^[0-9]+$/) || !partsEntrada[1].match(/^[0-9]+$/)){
            formIsValid = false;
            errors["horaEntrada"] = "Deve-se ter apenas números";        
        }

        //Hora Saida
        if(this.horaSaida == ""){
            formIsValid = false;
            errors["horaSaida"] = "Não pode ser vazio";
        }
        else if(listaHoraSaida.length !== 5){
            formIsValid = false;
            errors["horaSaida"] = "Hora deve ser no formato HH:MM";
        }
        else if(partsSaida.length == 1){
            formIsValid = false;
            errors["horaSaida"] = "Hora deve ser separada do Minuto por um ':'";
        }
        else if(!partsSaida[0].match(/^[0-9]+$/) || !partsSaida[1].match(/^[0-9]+$/)){
            formIsValid = false;
            errors["horaSaida"] = "Deve-se ter apenas números";        
        }

        this.setState({errors: errors});
        return formIsValid;
    }
    //Função para salvar o input da hora de entrada
    _handleChangeHoraEntrada(evento){
        evento.stopPropagation(); //Evita que esse evento desencadeie outro evento
        this.horaEntrada = evento.target.value;
    }
    //Função para salvar o input da hora de saída
    _handleChangeHoraSaida(evento){
        evento.stopPropagation();
        this.horaSaida = evento.target.value;
    }    
    //Função que passa os dados para a função da classe pai responsável pelo cálculo e pela renderização do resultado
    _calculaHoras(evento){
        evento.preventDefault(); //Evita o reload da página
        evento.stopPropagation();
        if(this.handleValidation()){
            //alert("Formulário enviado");
            this.props.calculaHoras(this.horaEntrada, this.horaSaida);
         }else{
            alert("Formulário possui erros.")
         }
    }
    render() {
        return (
            <Card>
                <Row>
                    <form onSubmit={this._calculaHoras.bind(this)}>
                        <div>
                            <Input placeholder="HH:MM" type="text" onChange={this._handleChangeHoraEntrada.bind(this)} label="Horário de Entrada" s={12} />
                            <span style={{color: "red"}}>{this.state.errors["horaEntrada"]}</span>
                        </div>
                        <div>
                            <Input placeholder="HH:MM" type="text" onChange={this._handleChangeHoraSaida.bind(this)} label="Horário de Saída" s={12} />
                            <span style={{color: "red"}}>{this.state.errors["horaSaida"]}</span>
                        </div>
                        <Col s={12} m={12}>
                            <Button waves='light' className="right green darken-2">ENVIAR</Button>
                        </Col>
                    </form>
                </Row>
            </Card>
        )
    }
}

export default Formulario
