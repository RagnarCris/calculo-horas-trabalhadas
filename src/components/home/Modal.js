import React, { Component } from 'react'

class Modal extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        const M = window.M;
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {});
          });
    }
    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div>
                <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h4>Resultado do Cálculo de Horas</h4>
                        <p>Horas Diurnas: {this.props.horasDiurnas}</p>
                        <br/>
                        <p>Horas Noturnas: {this.props.horasNoturnas}</p>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Ok</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal
