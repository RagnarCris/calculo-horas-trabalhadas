// Importantando o React
import React, { Component } from 'react'
// Importantando o component Home
import Home from "./components/home/Home";
// Importando os components necessárias da lib react-materialize
import { Container } from 'react-materialize';
// Importanto o component <Switch /> e <Route /> da nossa Lib de rotas
import { Switch, Route } from 'react-router-dom'

//React Router usado para o caso de necessitar de adicionar uma nova tela, já fica prático adicionar aqui.
class Main extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <main>
                <Container>
                <Switch>
                    <Route exact path='/' render={props => <Home {...props} />}/>
                </Switch>
                </Container>
            </main>
        )
    }
}  

export default Main;