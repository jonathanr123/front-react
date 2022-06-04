import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { cambiarID } from "../reducers/global";
import { retrievePacientes } from "../actions/persona-ep";
import "../styles/list-pacientesEp.css"

class ListaPaciente extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales 
        this.state = {
            campo: {
                buscador:''
            }
        }
    }

    componentDidMount() {
        this.props
            .retrievePacientes()
            .then(() => {
                console.log(this.props.pacientes,'PERSONA EP');
            })
    }

    detectarCambio(field, e) {

        let campo = this.state.campo;
        campo[field] = e.target.value;

        // Cambio de estado de campo 
        this.setState({
            campo
        });

    }

    buscar(){
        this.setState({campo:{
            buscador:document.getElementById("buscador").value
        }})
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

    verOS(id, nombre, apellido){
        let idpersona=id;
        let nombreid=nombre;
        let apellidoid=apellido;
        let nombrepersona= nombreid+' '+apellidoid;
        this.props.cambiarID(idpersona, nombrepersona);
        this.props.history.push("/list-obrasocial")
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
                    <div className="mb-4 col-10 col-md-10 col-lg-6 col-xl-6" style={{marginBottom:"10px"}}>
                        <input type="search" className="form-control" placeholder="Buscar" id="buscador" aria-describedby="buscador" onChange={this.detectarCambio.bind(this, "buscador")} value={this.state.campo["buscador"] || ''}/>
                    </div>
                    <div className="mb-4 col-2 col-md-2 col-lg-6 col-xl-6" style={{paddingLeft:"0px"}}>
                        <button type="button" className="btn btn-verde" onClick={()=>this.buscar()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg></button>
                    </div>
                </div>
                
                <div className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12" style={{position: "relative", height: "350px", overflow: "auto", display: "block"}}>
                <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Paciente</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                       {pacientes &&
                                    pacientes.filter(paciente=>paciente.idpersona.nombre.toLowerCase().includes(this.state.campo.buscador)||paciente.idpersona.apellido.toLowerCase().includes(this.state.campo.buscador)||paciente.idpersona.nombre.toUpperCase().includes(this.state.campo.buscador)||paciente.idpersona.apellido.toUpperCase().includes(this.state.campo.buscador)).map((paciente, index) => (
                                        <tr key={index}>
                                        <td>{paciente.idpersona.nombre} {paciente.idpersona.apellido}</td>
                                        <td><button type="button" className="btn" title="Ver Ficha Médica" style={{marginRight:10, boxShadow:"3px 3px #13E000", backgroundImage: "linear-gradient(to right, #9bff92, #8efe86, #80fd79, #71fc6c, #5ffb5e, #58fb54, #51fb4a, #4afb3e, #51fc35, #57fd2a, #5efe1c, #64ff00)"}} onClick={() => this.verFichaMedica(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                            </svg></button>

                                            <button type="button" className="btn" title="Ver Diagnósticos" style={{marginRight:10, boxShadow:"3px 3px #FF9B00", backgroundImage: "linear-gradient(to right, #ffcf46, #ffcb3f, #ffc738, #ffc330, #ffbf28, #ffbc23, #ffb81d, #ffb516, #ffb111, #ffae0b, #ffaa05, #ffa600)"}} onClick={() => this.verDiagnostico(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                            </svg></button>

                                            <button type="button" className="btn" title="Ver Evolución" style={{marginRight:10, boxShadow:"3px 3px #D80000", backgroundImage: "linear-gradient(to right, #ff7171, #ff6867, #ff5e5d, #ff5453, #ff4948, #ff4140, #ff3938, #ff302f, #ff2826, #ff1f1d, #ff1311, #ff0000)"}} onClick={() => this.verEvolucion(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16">
                                            <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                            </svg></button>

                                            <button type="button" className="btn" title="Ver Obra Social" style={{marginRight:10, boxShadow:"3px 3px #9700CD", backgroundImage: "linear-gradient(to right, #e290ff, #e087ff, #dd7eff, #db74ff, #d86aff, #d561ff, #d258ff, #cf4eff, #cb42ff, #c634ff, #c122ff, #bc00ff)"}} onClick={() => this.verOS(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                            </svg></button>

                                            <button type="button" className="btn" title="Ver Indicaciones Médicas" style={{marginRight:10, boxShadow:"3px 3px #0059CD", backgroundImage: "linear-gradient(to right, #6ba7f6, #62a2f7, #599df8, #4f98f9, #4593fa, #3c8efb, #338afc, #2a85fd, #2080fe, #157afe, #0a75ff, #006fff)"}} onClick={() => this.verIndicacion(paciente.idpersona.idpersona, paciente.idpersona.nombre, paciente.idpersona.apellido)} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
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