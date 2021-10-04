import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { retrieveDiagnosticosEp } from "../actions/diagnostico";
import { retrieveEvolucionEp } from "../actions/evolucion";
class FichaMedica extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales
    }

    componentDidMount() {
        this.props.retrieveDiagnosticosEp(4);
        this.props.retrieveEvolucionEp(4)
    }


    convertirFormatoFecha(string){
        var info = string.split('-');
        return info[2] + '/' + info[1] + '/' + info[0];
    }


    render() {
            const paciente='Hernan Gutierrez';
            //const {show, showNuevo}=this.state;
            const {diagnosticos, evoluciones} = this.props;

        return (
            <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto" style={{paddingTop:20}}>
                <div className="mb-4 col-12 col-md-9 col-lg-12 col-xl-10">
                    <h3 className="mt-4">Ficha Médica</h3>
                <hr />
                <div className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                    <a><b>Nombre y Apellido:</b> {paciente}</a>
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
                                    diagnosticos.map((diagnostico, index) => (
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
                                    evoluciones.map((evolucion, index) => (
                                        <tr key={index}>
                                        <td>Estado: {evolucion.escalaevolucion}</td>
                                        <td>{this.convertirFormatoFecha(evolucion.fecha)}</td>
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
      evoluciones: state.evolucion
    };
};

export default connect(mapStateToProps, { retrieveDiagnosticosEp, retrieveEvolucionEp})(FichaMedica);