import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { retrieveDiagnosticosEp } from "../actions/diagnostico";
import { retrieveEvolucionEp } from "../actions/evolucion";
import { retrieveOSEp } from "../actions/os";
import { retrieveIndicacionEp } from "../actions/indicacion";

class FichaMedica extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales
        this.state={
        }
    }

    componentDidMount() {
        this.props.retrieveDiagnosticosEp(this.props.idEpElegido);
        this.props.retrieveEvolucionEp(this.props.idEpElegido);
        this.props.retrieveOSEp(this.props.idEpElegido);
        this.props.retrieveIndicacionEp(this.props.idEpElegido)
    }


    convertirFormatoFecha(string){
        var info = string.split('-');
        return info[2] + '/' + info[1] + '/' + info[0];
    }

    convertirFormatoHora(string){
        var info = string.split(':');
        return info[0] + ':' + info[1];
    }

    convertirEstado(estado){
        if( estado == 1 ){
            return 'Vigente';
        } else{
            return 'Caducado';
        }
    }

    convertirTipo(tipo){
        if( tipo == 1 ){
            return 'Publica';
        } else{
            return 'Privada';
        }
    }


    render() {
            const {diagnosticos, evoluciones, osociales, indicaciones, nombreEpElegido} = this.props;

        return (
            <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto" style={{paddingTop:20}}>
                <div className="mb-4 col-12 col-md-9 col-lg-12 col-xl-10">
                    <h3 className="mt-4"><b>Ficha Médica</b></h3>
                <hr />
                <div className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                    <a><b>Nombre y Apellido:</b> {nombreEpElegido}</a>
                </div>
                </div>
                
                <div className="row" style={{verticalAlign:'middle'}}>
                    <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                    <h4 className="mt-4">Diagnósticos</h4>
                    </div>
                    <div className="mb-4 col-6 col-md-6 col-lg-6 col-xl-6" style={{textAlign:'right', paddingTop:'18px'}}>
                    <Link to={"/list-diagnostico"}><button className="btn btn-success" to={"/list-diagnostico"} >Editar</button></Link>
                    </div>
                </div>
                <div className="row">
                <div className="col-12">
                <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Nombre de Enfermedad</th>
                    <th scope="col">Fecha de Diagnóstico</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                    {diagnosticos &&
                                    diagnosticos.filter(diagnostico => diagnostico.borrado == "0").map((diagnostico, index) => (
                                        <tr key={index}>
                                        <td >{diagnostico.idenfermedad.nombre}</td>
                                        <td>{this.convertirFormatoFecha(diagnostico.fecha)}</td>
                                        </tr>
                                    ))}
                </tbody>
                </table>
                </div>
                </div>
                

                <div className="row" style={{verticalAlign:'middle'}}>
                    <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                    <h4 className="mt-4">Evolución</h4>
                    </div>
                    <div className="mb-4 col-6 col-md-6 col-lg-6 col-xl-6" style={{textAlign:'right', paddingTop:'18px'}}>
                    <Link to={"/list-evolucion"}><button className="btn btn-success" to={"/list-evolucion"} >Editar</button></Link>
                    </div>
                </div>
                <div className="row">
                <div className="col-12">
                <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Estado Evolutivo</th>
                    <th scope="col">Fecha de Observación</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                    {evoluciones &&
                                    evoluciones.filter(evolucion => evolucion.borrado == "0").map((evolucion, index) => (
                                        <tr key={index}>
                                        <td>Estado: {evolucion.escalaevolucion}</td>
                                        <td>{this.convertirFormatoFecha(evolucion.fecha)}</td>
                                        </tr>
                                    ))}
                </tbody>
                </table>
                </div>
                </div>

                <div className="row" style={{verticalAlign:'middle'}}>
                    <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                    <h4 className="mt-4">Obra Social</h4>
                    </div>
                    <div className="mb-4 col-6 col-md-6 col-lg-6 col-xl-6" style={{textAlign:'right', paddingTop:'18px'}}>
                    <Link to={"/list-obrasocial"}><button className="btn btn-success" to={"/list-obrasocial"} >Editar</button></Link>
                    </div>
                </div>
                <div className="row">
                <div className="col-12">
                <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Obra Social</th>
                    <th scope="col">Tipo</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                    {osociales &&
                                    osociales.filter(osocial => osocial.borrado == "0").map((osocial, index) => (
                                        <tr key={index}>
                                        <td>{osocial.idobrasocial.nombre}</td>
                                        <td>{this.convertirTipo(osocial.idobrasocial.esestatal)}</td>
                                        </tr>
                                    ))}
                </tbody>
                </table>
                </div>
                </div>

                <div className="row" style={{verticalAlign:'middle'}}>
                    <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                    <h4 className="mt-4">Indicación de Medicamentos</h4>
                    </div>
                    <div className="mb-4 col-6 col-md-6 col-lg-6 col-xl-6" style={{textAlign:'right', paddingTop:'18px'}}>
                    <Link to={"/list-indicacion"}><button className="btn btn-success" to={"/list-indicacion"} >Editar</button></Link>
                    </div>
                </div>
                <div className="row">
                <div className="col-12">
                <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Nombre de Medicamento</th>
                    <th scope="col">Dosis en mg</th>
                    <th scope="col">Hora de Toma</th>
                    <th scope="col">Fecha de Prescripción</th>
                    <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                    {indicaciones &&
                                        indicaciones.filter(indicacion => indicacion.borrado == "0").map((indicacion, index) => (
                                            <tr key={index}>
                                            <td >{indicacion.idmedicamento.nombre}</td>
                                            <td >{indicacion.cantidadmiligramos} mg</td>
                                            <td >Cada {this.convertirFormatoHora(indicacion.horadetoma)} hs</td>
                                            <td>{this.convertirFormatoFecha(indicacion.fechaprescripcion)}</td>
                                            <td >{this.convertirEstado(indicacion.estavigente)}</td>
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
      diagnosticos: state.diagnostico,
      evoluciones: state.evolucion,
      osociales: state.os,
      indicaciones: state.indicacion,
      idEpElegido: state.global.idEpElegido,
      nombreEpElegido: state.global.nombreEpElegido
    };
};

export default connect(mapStateToProps, { retrieveDiagnosticosEp, retrieveEvolucionEp, retrieveOSEp, retrieveIndicacionEp})(FichaMedica);