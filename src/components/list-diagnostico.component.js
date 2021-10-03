import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { retrieveDiagnosticosEp, createDiagnostico, updateDiagnostico, deleteDiagnostico } from "../actions/diagnostico";
import { retrieveEnfermedad } from "../actions/enfermedad";
class ListaDiagnostico extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales 
        this.state = {
            show:false,
            showNuevo:false,
            nomEnfermedad:'',
            fechaEnfermedad:'',
            currentIndex:'',
            indexAgregar:6,
            campo:{
                enfermedad:'',
                fecha:''
                },
            idEditado:'',
        }
    }

    componentDidMount() {
        this.props.retrieveDiagnosticosEp(4);
        this.props.retrieveEnfermedad();
    }


    convertirFormatoFecha(string){
        var info = string.split('-');
        return info[2] + '/' + info[1] + '/' + info[0];
    }

    editar(enfermedad, fecha, iddiagnostico){
        this.setState({show:true, showNuevo:false, nomEnfermedad:enfermedad, fechaEnfermedad:fecha, idEditado:iddiagnostico, campo:{enfermedad:""}});
    }

    guardar(){
        let idEnfermedad=this.state.campo.enfermedad;
        let fechaEnfermedad=this.state.campo.fecha;
        let id=this.state.idEditado;
        if(idEnfermedad!=='' & fechaEnfermedad!=='' ){
            var data = {
                fecha: fechaEnfermedad,
                idpersonaep: 4,
                idenfermedad: idEnfermedad,
              };
            this.props
                .updateDiagnostico(id, data)
                .then(() => {
                    this.props.retrieveDiagnosticosEp(4);
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{enfermedad:'', fecha:''},
                        show:false
                });
        };
    }

    cancelar(){
        this.setState({show:false, showNuevo:false, campo:{enfermedad:"", fecha:""}})
    }

    detectarCambio(field, e){
        let campo=this.state.campo;
        campo[field]=e.target.value;
        this.setState({
            campo
        });
        console.log(campo);
    }

    agregar(){
        this.setState({showNuevo:true, show:false})
    }

    cargarNuevo(){
        let idEnfermedad=this.state.campo.enfermedad;
        let fechaEnfermedad=this.state.campo.fecha;
        if(idEnfermedad!=='' & fechaEnfermedad!=='' ){
            this.props
                .createDiagnostico(fechaEnfermedad, 4, idEnfermedad)
                .then((datadiagnostico) => {
                        console.log(datadiagnostico,'Diagnostico creado');
                        this.props.retrieveDiagnosticosEp(4);
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{enfermedad:'', fecha:''},
                        showNuevo:false
                });
        };
    }

    eliminar(iddiagnostico){
        this.props
            .deleteDiagnostico(iddiagnostico)
            .then(() => {
                    this.props.retrieveDiagnosticosEp(4);
             })
        this.setState({show:false});
    }

    render() {
            const paciente='Hernan Gutierrez';
            const {show, showNuevo}=this.state;
            const {diagnosticos, enfermedades} = this.props;
            //console.log(diagnosticos[0].idenfermedad.idenfermedad);

        return (
            <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto" style={{paddingTop:20}}>
                <div className="mb-4 col-12 col-md-9 col-lg-12 col-xl-10">
                    <h3 className="mt-4">Diagnostico de Enfermadades</h3>
                <hr />
                <div className="row">
                <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <a><b>Nombre y Apellido:</b> {paciente}</a>
                </div>
                <div className="mb-4 col-12 col-md-6 col-lg-6 col-xl-6" style={{textAlign:'right'}}>
                <button type="button" className="btn btn-primary" onClick={() => this.agregar()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                    </svg>Agregar</button>
                </div>
                </div>
                
                <span>
                {showNuevo ? (
                <div className="border-top-sm m-0 row form-paciente m-md-3 rounded shadow container-lg mx-md-auto">
                    <h4 className="mt-4">Nuevo Diagnostico</h4>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Nombre de Enfermedad</label>
                        <select className="form-select" placeholder="Ingrese enfermedad..." id="enfermedad" onChange={this.detectarCambio.bind(this, "enfermedad")} value={this.state.campo["enfermedad"] || ''}>
                                <option value="">Elegir</option>
                                {enfermedades &&
                                    enfermedades.map((enfermedad, index) => (
                                        <option
                                            value={enfermedad.idenfermedad}
                                            key={index}
                                            >
                                            {enfermedad.nombre}
                                        </option>
                                    ))}
                            </select>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Fecha de Diagnostico</label>
                        <input type="date" className="form-control" id="fecha" onChange={this.detectarCambio.bind(this, "fecha")}/>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4" style={{textAlign:'center', paddingTop:38}}>
                        <button type="submit" className="btn btn-success" style={{width:'40%'}} onClick={() => this.cargarNuevo()}>Confirmar</button>
                        <button type="submit" className="btn btn-danger" style={{width:'40%', marginLeft:10}} onClick={() => this.cancelar()}>Cancelar</button>
                    </div>
                </div>
                ):('')}
                </span>

                <span>
                {show ? (
                <div className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto">
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Nombre de Enfermedad</label>
                            <select className="form-select" placeholder="Ingrese enfermedad..." id="enfermedad" onChange={this.detectarCambio.bind(this, "enfermedad")} value={this.state.campo["enfermedad"] || ''}>
                                <option value="">Elegir</option>
                                {enfermedades &&
                                    enfermedades.map((enfermedad, index) => (
                                        <option
                                            value={enfermedad.idenfermedad}
                                            key={index}
                                            >
                                            {enfermedad.nombre}
                                        </option>
                                    ))}
                            </select>
                        <span style={{ color: "red", paddingLeft:10 }}>{this.state.nomEnfermedad}</span>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Fecha de Diagnostico</label>
                        <input type="date" className="form-control" id="fecha" onChange={this.detectarCambio.bind(this, "fecha")}/>
                        <span style={{ color: "red", paddingLeft:10 }}>{this.state.fechaEnfermedad}</span>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4" style={{textAlign:'center', paddingTop:38}}>
                        <button type="submit" className="btn btn-success" style={{width:'40%'}} onClick={() => this.guardar()}>Confirmar</button>
                        <button type="submit" className="btn btn-danger" style={{width:'40%', marginLeft:10}} onClick={() => this.cancelar()}>Cancelar</button>
                    </div>
                </div>
                ):('')}
                </span>
                
                <div className="row">
                <div className="col-12">
                <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Nombre de Enfermedad</th>
                    <th scope="col">Fecha de Diagnostico</th>
                    <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                    {diagnosticos &&
                                    diagnosticos.map((diagnostico, index) => (
                                        <tr key={index}>
                                        <td >{diagnostico.idenfermedad.nombre}</td>
                                        <td>{this.convertirFormatoFecha(diagnostico.fecha)}</td>
                                        <td><button type="button" className="btn btn-success" style={{marginRight:10}} onClick={() => this.editar(diagnostico.idenfermedad.nombre, diagnostico.fecha, diagnostico.iddiagnostico)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg></button>
                                            <button type="button" className="btn btn-danger" onClick={() => this.eliminar(diagnostico.iddiagnostico)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
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
      diagnosticos: state.diagnostico,
      enfermedades: state.enfermedad
    };
};

export default connect(mapStateToProps, { retrieveDiagnosticosEp, createDiagnostico, updateDiagnostico, deleteDiagnostico, retrieveEnfermedad })(ListaDiagnostico);