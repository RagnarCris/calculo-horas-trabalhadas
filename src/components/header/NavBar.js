// Importando o React
import React, { Component } from 'react'

//Criação de uma navbar utilizando o Materialize CSS ao invés do react-materialize
class NavBar extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div class="nav-wrapper green darken-2">
                        <a href="#" class="brand-logo center">Hour Calculator</a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar
