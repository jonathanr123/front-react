import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { cambiarID } from "../reducers/global";
import { retrievePacientes } from "../actions/persona-ep";

class ListaPaciente extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales 
        this.state = {
            
        }
    }

    componentDidMount() {
        this.props
            .retrievePacientes()
            .then(() => {
                console.log(this.props.pacientes,'PERSONA EP');
            })
    }

    verFichaMedica(id, nombre, apellido){
        let idpersona=id;
        let nombreid=nombre;
        let apellidoid=apellido;
        let nombrepersona= nombreid+' '+apellidoid;
        this.props.cambiarID(idpersona, nombrepersona);
        this.props.history.push("/ficha")
    }

    verDiagnostico(id, nombre, apellido){
        let idpersona=id;
        let nombreid=nombre;
        let apellidoid=apellido;
        let nombrepersona= nombreid+' '+apellidoid;
        this.props.cambiarID(idpersona, nombrepersona);
        this.props.history.push("/list-diagnostico")
    }

    verEvolucion(id, nombre, apellido){
        let idpersona=id;
        let nombreid=nombre;
        let apellidoid=apellido;
        let nombrepersona= nombreid+' '+apellidoid;
        this.props.cambiarID(idpersona, nombrepersona);
        this.props.history.push("/list-evolucion")
    }

    verIndicacion(id, nombre, apellido){
        let idpersona=id;
        let nombreid=nombre;
        let apellidoid=apellido;
        let nombrepersona= nombreid+' '+apellidoid;
        this.props.cambiarID(idpersona, nombrepersona);
        this.props.history.push("/list-indicacion")
    }


    render() {
            const {pacientes}=this.props;

        return (
            <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto" style={{paddingTop:20}}>
                <div className="mb-4 col-12 col-md-9 col-lg-12 col-xl-10">
                    <h3 className="mt-4">Personas con Enfermedad de Parkinson</h3>
                <hr />
                <div className="row">
                
                </div>
                
                <div className="row">
                <div className="col-12">
                <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Paciente</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                       {pacientes &&
                                    pacientes.map((paciente, index) => (
                                        <tr key={index}>
                                        <td>{paciente.idpersona.nombre} {paciente.idpersona.apellido}</td>
                                        <td><button type="button" className="btn btn-danger" style={{marginRight:10}} onClick={() => this.verFichaMedica(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                            </svg></button>

                                            <button type="button" className="btn btn-primary" style={{marginRight:10}} onClick={() => this.verDiagnostico(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                            </svg></button>

                                            <button type="button" className="btn btn-dark" style={{marginRight:10}} onClick={() => this.verEvolucion(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16">
                                            <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                            </svg></button>

                                            <button type="button" className="btn btn-warning" style={{marginRight:10}} onClick={() => this.verIndicacion(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
                                            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                            </svg></button>
                                        </td>
                                        </tr>
                                    ))}
                </tbody>
                </table>
                </div>
                </div>
                </div>

                
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        idEpElegido: state.global.idEpElegido,
        nombreEpElegido: state.global.nombreEpElegido,
        pacientes: state.paciente
    };
};



export default connect(mapStateToProps, { cambiarID, retrievePacientes })(ListaPaciente);