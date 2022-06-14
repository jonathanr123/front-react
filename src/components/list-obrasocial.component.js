import React, { Component } from "react";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { retrieveOSEp, createOS, updateOS, deleteOS } from "../actions/os";
import { retrieveObraSocial } from "../actions/obrasocial";
class ListaObraSocial extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales 
        this.state = {
            show:false,
            showNuevo:false,
            campo:{
                obrasocial:'',
                },
            idEditado:'',
        }
    }

    componentDidMount() {
        this.props.retrieveObraSocial();
        this.props.retrieveOSEp(this.props.idEpElegido);
    }


    convertirTipo(tipo){
        if( tipo == 1 ){
            return 'Publica';
        } else{
            return 'Privada';
        }
    }

    editar(obrasocial, idos){
        this.setState({show:true, showNuevo:false, idEditado:idos, campo:{obrasocial:obrasocial}});
    }

    guardar(){
        let idObrasocial=this.state.campo.obrasocial;
        let id=this.state.idEditado;
        if(idObrasocial!=='' ){
            var data = {
                idpersonaep: this.props.idEpElegido,
                idobrasocial: idObrasocial,
                borrado:"0",
              };
            this.props
                .updateOS(id, data)
                .then(() => {
                    this.props.retrieveOSEp(this.props.idEpElegido);
                    this.notificacionGuardar();
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{obrasocial:''},
                        show:false
                });
        };
    }

    cancelar(){
        this.setState({show:false, showNuevo:false, campo:{obrasocial:""}})
    }

    detectarCambio(field, e) {
        let campo = this.state.campo;
        campo[field] = e.target.value;
        this.setState({
            campo
        });
        console.log(campo);
    }

    agregar(){
        this.setState({showNuevo:true, show:false, campo:{obrasocial:""}})
    }

    cargarNuevo(){
        let idObrasocial=this.state.campo.obrasocial;
        if(idObrasocial!=='' ){
            this.props
                .createOS(this.props.idEpElegido, idObrasocial, "0")
                .then((dataobrasocial) => {
                        console.log(dataobrasocial,'ObraSocial creado');
                        this.props.retrieveOSEp(this.props.idEpElegido);
                        this.notificacionGuardar();
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{obrasocial:""},
                        showNuevo:false
                });
        };
    }

    eliminar(idobrasocial, id){
        var data = {
                idpersonaep: this.props.idEpElegido,
                idobrasocial: idobrasocial,
                borrado:"1",
              };
        this.props
                .updateOS(id, data)
                .then(() => {
                    this.props.retrieveOSEp(this.props.idEpElegido);
                 })
                .catch((e) => {
                        console.log(e);
                 });
        this.setState({show:false});
    }

    //notificaciones
    notificacionGuardar(){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Se ha guardado con éxito'
          })
    }

    notificacionEliminar(idobrasocial, idOS){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success margenbutton',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Estas seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si!',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                this.eliminar(idobrasocial, idOS)
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Se ha eliminado el registro',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se eliminaron registros',
                'error'
              )
            }
          })
    }

    render() {
            const {show, showNuevo, arrayOS}=this.state;
            const {osociales, obrasociales, nombreEpElegido} = this.props;

        return (
            <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto" style={{paddingTop:20}}>
                <div className="mb-4 col-12 col-md-9 col-lg-12 col-xl-10">
                    <h3 className="mt-4">Obra Social de Persona con EP</h3>
                <hr />
                <div className="row">
                <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <a><b>Nombre y Apellido:</b> {nombreEpElegido}</a>
                </div>
                <div className="mb-4 col-12 col-md-6 col-lg-6 col-xl-6" style={{textAlign:'right'}}>
                <button type="button" className="btn btn-azul" onClick={() => this.agregar()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                    </svg>Agregar</button>
                </div>
                </div>
                
                <span>
                {showNuevo ? (
                <div className="border-top-sm m-0 row form-paciente m-md-3 rounded shadow container-lg mx-md-auto">
                    <h4 className="mt-4">Nueva Obra Social</h4>
                    <div className="mb-4 col-12 col-md-6 col-lg-6 col-xl-6">
                        <label className="col-form-label">Obra Social</label>
                        <select className="form-select" placeholder="Ingrese O.Social..." id="obrasocial" onChange={this.detectarCambio.bind(this, "obrasocial")} value={this.state.campo["obrasocial"] || ''}>
                                <option value="">Elegir</option>
                                {obrasociales &&
                                    obrasociales.map((obrasocial, index) => (
                                        <option
                                            value={obrasocial.idobrasocial}
                                            key={index}
                                            >
                                            {obrasocial.nombre}
                                        </option>
                                    ))}
                        </select>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-6 col-xl-6" style={{textAlign:'center', paddingTop:38}}>
                        <button type="submit" className="btn btn-verde" style={{width:'40%'}} onClick={() => this.cargarNuevo()}>Confirmar</button>
                        <button type="submit" className="btn btn-rojo" style={{width:'40%', marginLeft:10}} onClick={() => this.cancelar()}>Cancelar</button>
                    </div>
                </div>
                ):('')}
                </span>

                <span>
                {show ? (
                <div className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto">
                    <div className="mb-4 col-12 col-md-6 col-lg-6 col-xl-6">
                        <label className="col-form-label">Obra Social</label>
                            <select className="form-select" placeholder="Ingrese O.Social..." id="obrasocial" onChange={this.detectarCambio.bind(this, "obrasocial")} value={this.state.campo["obrasocial"] || ''}>
                                    <option value="">Elegir</option>
                                    {obrasociales &&
                                        obrasociales.map((obrasocial, index) => (
                                            <option
                                                value={obrasocial.idobrasocial}
                                                key={index}
                                                >
                                                {obrasocial.nombre}
                                            </option>
                                        ))}
                            </select>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4" style={{textAlign:'center', paddingTop:38}}>
                        <button type="submit" className="btn btn-verde" style={{width:'40%'}} onClick={() => this.guardar()}>Guardar</button>
                        <button type="submit" className="btn btn-rojo" style={{width:'40%', marginLeft:10}} onClick={() => this.cancelar()}>Cancelar</button>
                    </div>
                </div>
                ):('')}
                </span>
                
                <div className="row">
                <div className="col-12">
                <table className="table table-bordered table-hover shadow table-striped" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Obra Social</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                    {osociales &&
                                    osociales.filter(osocial => osocial.borrado == "0").map((osocial, index) => (
                                        <tr key={index}>
                                        <td>{osocial.idobrasocial.nombre}</td>
                                        <td>{this.convertirTipo(osocial.idobrasocial.esestatal)}</td>
                                        <td><button type="button" className="btn btn-verde" style={{marginRight:10}} onClick={() => this.editar(osocial.idobrasocial.idobrasocial, osocial.idos)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg></button>
                                            <button type="button" className="btn btn-rojo" onClick={() => this.notificacionEliminar(osocial.idobrasocial.idobrasocial, osocial.idos)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
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
      osociales: state.os,
        obrasociales: state.obrasocial,
      idEpElegido: state.global.idEpElegido,
      nombreEpElegido: state.global.nombreEpElegido
    };
};


export default connect(mapStateToProps, { retrieveOSEp, createOS, updateOS, deleteOS, retrieveObraSocial})(ListaObraSocial);