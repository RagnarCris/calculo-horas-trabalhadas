// Importando o React
import React, { Component } from 'react'
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, Input, Button } from 'react-materialize';
// Importando o componente para o formulário
import Formulario from './Formulario'

class Home extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Row>
            <Col m={2} s={12}>
                {/* Gambiarra para centralizar o conteúdo */}
            </Col>
            <Col m={8} s={12}>
                <h5 className="subtitle">Funcionalidade</h5>
                <Card>
                    <div>
                    <p>Essa página foi feita para a realização do cálculo de horas trabalhadas de acordo com a seguinte regra:</p>
                    <br/>
                    <p>Para fins da legislação trabalhista brasileira, considera-se horário noturno todo o período trabalhado entre as 22:00 e as 05:00. Por consequência, considera-se horário diurno todo o período trabalhado entre as 05:00 e as 22:00.</p>
                    <br/>
                    <p>Na seção abaixo, digite seu período de trabalho, o formato deve ser HH:MM tanto para entrada quanto para a saída.</p>
                    </div>
                </Card>
                <h5 className="subtitle">Período de Trabalho</h5>
                <Formulario />
            </Col>
            </Row>
        )
    }
}

export default Home;