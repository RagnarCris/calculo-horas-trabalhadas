// Importando o React
import React, { Component } from 'react'
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, Input, Button } from 'react-materialize';

class Formulario extends Component {
    constructor(props){
        super(props);
        this.horaEntrada = "";
        this.horaSaida = "";
        this.horasDiurnas = 0;
        this.horasNoturnas = 0;
        this.minutosDiurnos = 0;
        this.minutosNoturnos = 0;
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
    //Função responsável pelo cálculo e exibição do resultado, se o formulário for válido
    _calculaHoras(evento){
        evento.preventDefault(); //Evita o reload da página
        evento.stopPropagation();
        if(this.handleValidation()){
            console.log("Hora entrada: " + this.horaEntrada + " Hora saída: " + this.horaSaida)
            var partsEntrada = this.horaEntrada.split(":");
            var partsSaida = this.horaSaida.split(":");
            var intHrEntrada = parseInt(partsEntrada[0]);
            var intMinEntrada = parseInt(partsEntrada[1]);
            var intHrSaida = parseInt(partsSaida[0]);
            var intMinSaida = parseInt(partsSaida[1]);
            //Verifica se o intervalo é diurno
            if((intHrEntrada >= 5 && intHrEntrada < 22) && (intHrSaida >= 5 && intHrSaida <= 22)){
                //Verifica se a saída ocorre minutos após as 22h
                if(intHrSaida == 22 && intMinSaida > 0){
                    this.horasDiurnas = intHrSaida - intHrEntrada;
                    this.horasNoturnas = 0;
                    this.minutosNoturnos = intMinSaida;
                    if(intMinEntrada>0){
                        this.minutosDiurnos = 60-intMinEntrada;
                        this.horasDiurnas = this.horasDiurnas-1;
                    }
                }
                else{
                    var horas = intHrSaida - intHrEntrada;
                    var minutos = intMinSaida - intMinEntrada;
                    if(horas < 0){
                        this.horasDiurnas = (22 - intHrEntrada) + (intHrSaida-5);
                        this.horasNoturnas = 7;
                        this.minutosNoturnos = 0;
                        if(minutos >= 0){
                            this.minutosDiurnos = minutos;
                        }
                        else{
                            this.minutosDiurnos = 60-(minutos*(-1)); //minutos estava negativo aqui
                            this.horasDiurnas = this.horasDiurnas-1;
                        }
                    }
                    else if(horas > 0){
                        this.horasDiurnas = horas;
                        this.horasNoturnas = 0;
                        if(minutos >= 0){
                            this.minutosDiurnos = minutos;
                        }
                        else{
                            this.minutosDiurnos = 60-(minutos*(-1)); //minutos estava negativo aqui
                            this.horasDiurnas = this.horasDiurnas-1;
                        }
                    }
                    else{
                        alert("Erro: 24 horas trabalhadas, tempo máximo excedido!")
                    }
                    
                }
            }
            else if((intHrEntrada >= 22 || intHrEntrada < 5) && (intHrSaida >= 22 || intHrSaida <= 5)){
                //Verifica se a saída ocorre minutos após as 5h
                if(intHrSaida == 5 && intMinSaida > 0){
                    this.horasNoturnas = intHrSaida+24 - intHrEntrada;
                    this.horasDiurnas = 0;
                    this.minutosDiurnos = intMinSaida;
                    if(intMinEntrada>0){
                        this.minutosNoturnos = 60-intMinEntrada;
                        this.horasNoturnas = this.horasNoturnas-1;
                    }
                }
                else{
                    if(intHrSaida >= 0 && intHrSaida <= 5){
                        intHrSaida = intHrSaida+24;
                    }
                    var horas = intHrSaida - intHrEntrada;
                    var minutos = intMinSaida - intMinEntrada;
                    if(horas < 0){
                        if(intHrEntrada > 22){
                            this.horasNoturnas = (intHrSaida - 22) + (29-intHrEntrada);    
                        }
                        else{
                            this.horasNoturnas = (intHrSaida - 22) + (5-intHrEntrada);
                        }
                        this.horasDiurnas = 17;
                        this.minutosDiurnos = 0;
                        if(minutos >= 0){
                            this.minutosNoturnos = minutos;
                        }
                        else{
                            this.minutosNoturnos = 60-(minutos*(-1)); //minutos estava negativo aqui
                            this.horasNoturnas = this.horasNoturnas-1;
                        }
                    }
                    else if(horas > 0){
                        this.horasNoturnas = horas;
                        this.horasDiurnas = 0;
                        if(minutos >= 0){
                            this.minutosNoturnos = minutos;
                        }
                        else{
                            this.minutosNoturnos = 60-(minutos*(-1)); //minutos estava negativo aqui
                            this.horasNoturnas = this.horasNoturnas-1;
                        }
                    }
                    else{
                        alert("Erro: 24 horas trabalhadas, tempo máximo excedido!")
                    }
                    
                }
            }
            //Se o horário começou noturno e acabou dentro do diurno
            else if((intHrEntrada >= 22 || intHrEntrada < 5) && (intHrSaida >= 5 && intHrSaida < 22)){
                this.horasDiurnas = intHrSaida-5;
                if(intHrEntrada > 22){
                    this.horasNoturnas = 29-intHrEntrada;    
                }
                else{
                    this.horasNoturnas = 5-intHrEntrada;
                }
                this.minutosDiurnos = intMinSaida;
                if(intMinEntrada > 0){
                    this.minutosNoturnos = 60 - intMinEntrada;
                    this.horasNoturnas = this.horasNoturnas-1;    
                }
                else{
                    this.minutosNoturnos = 0;
                }
            }
            //Se o horário começou no diurno e terminou no noturno
            else if((intHrEntrada >= 5 && intHrEntrada < 22) && (intHrSaida >= 22 || intHrSaida < 5)){
                console.log("Entrou aqui, valor do intHrEntrada: "+intHrEntrada+" e do intHrSaida: "+intHrSaida);
                this.horasDiurnas = 22-intHrEntrada;
                if(intHrSaida > 22){
                    this.horasNoturnas = intHrSaida-22;    
                }
                else{
                    this.horasNoturnas = (intHrSaida+24) - 22;
                }
                if(intMinEntrada > 0){
                    this.minutosDiurnos = 60 - intMinEntrada;
                    this.horasDiurnas= this.horasDiurnas-1;    
                }
                else{
                    this.minutosDiurnos = 0;
                }
                this.minutosNoturnos = intMinSaida;
                
            }
            else{
                alert("Não foi possível calcular")
            }
            if(this.minutosDiurnos < 10){
                this.minutosDiurnos = "0"+this.minutosDiurnos.toString();
            }
            if(this.minutosNoturnos < 10){
                this.minutosNoturnos = "0"+this.minutosNoturnos.toString();
            }
            if(this.horasDiurnas < 10){
                this.horasDiurnas = "0"+this.horasDiurnas.toString();
            }
            if(this.horasNoturnas < 10){
                this.horasNoturnas = "0"+this.horasNoturnas.toString();
            }
            alert("Resultado:\nHoras Diurnas: "+this.horasDiurnas+":"+this.minutosDiurnos+"\nHoras Noturnas: "+this.horasNoturnas+":"+this.minutosNoturnos)
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
