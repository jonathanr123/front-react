import React, { Component } from "react";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { retrieveEnfermedad, createEnfermedad, updateEnfermedad, deleteEnfermedad } from "../actions/enfermedad";
import { retrieveMedicamento, createMedicamento, updateMedicamento, deleteMedicamento } from "../actions/medicamento";
import { retrieveObraSocial, createObraSocial, updateObraSocial, deleteObraSocial } from "../actions/obrasocial";

class Nomenclador extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales 
        this.state = {
            show:false,
            showNuevo:true,
            show2:false,
            showNuevo2:true,
            show3:false,
            showNuevo3:true,
            campo:{
                },
            isChecked:false,
            idEditado:'',
        }
        this.detectarCheck = this.detectarCheck.bind(this);
    }

    componentDidMount() {
        this.props.retrieveEnfermedad();
        this.props.retrieveMedicamento();
        this.props.retrieveObraSocial();
    }

    convertirCheck(opcion){
        if (opcion==false){
            return "0";
        }
        else {
            return "1";
        }
    }

    editarEnfermedad(nombre, idenfermedad){
        this.setState({show:true, showNuevo:false, idEditado:idenfermedad, campo:{enfermedad:nombre}});
    }

    editarMedicamento(nombre, idmedicamento){
        this.setState({show2:true, showNuevo2:false, idEditado2:idmedicamento, campo:{medicamento:nombre}});
    }

    editarObrasocial(nombre, idobrasocial){
        this.setState({show3:true, showNuevo3:false, idEditado3:idobrasocial, campo:{obrasocial:nombre}});
    }

    guardarEnfermedad(){
        let nomEnfermedad=this.state.campo.enfermedad;
        let id=this.state.idEditado;
        if(nomEnfermedad!==''){
            var data = {
                nombre: nomEnfermedad
              };
            this.props
                .updateEnfermedad(id, data)
                .then(() => {
                    this.props.retrieveEnfermedad();
                    this.notificacionGuardar();
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{enfermedad:''},
                        show:false,
                        showNuevo:true
                });
        };
    }

    guardarMedicamento(){
        let nomMedicamento=this.state.campo.medicamento;
        let id=this.state.idEditado2;
        if(nomMedicamento!==''){
            var data = {
                nombre: nomMedicamento
              };
            this.props
                .updateMedicamento(id, data)
                .then(() => {
                    this.props.retrieveMedicamento();
                    this.notificacionGuardar();
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{medicamento:''},
                        show2:false,
                        showNuevo2:true
                });
        };
    }

    guardarObrasocial(){
        let nomObrasocial=this.state.campo.obrasocial;
        let id=this.state.idEditado3;
        if(nomObrasocial!==''){
            var data = {
                nombre: nomObrasocial,
                esestatal: "0",
              };
            this.props
                .updateObraSocial(id, data)
                .then(() => {
                    this.props.retrieveObraSocial();
                    this.notificacionGuardar();
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{obrasocial:''},
                        show3:false,
                        showNuevo3:true
                });
        };
    }

    cancelar(){
        this.setState({show:false, showNuevo:true, show2:false, showNuevo2:true, show3:false, showNuevo3:true, campo:{enfermedad:"", medicamento:"", obrasocial:""}})
    }

    detectarCambio(field, e){
        let campo=this.state.campo;
        campo[field]=e.target.value;
        this.setState({
            campo
        });
        console.log(campo);
    }

    detectarCheck(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
        [name]: value    });
    }

    cargarNuevaEnfermedad(){
        let nomEnfermedad=this.state.campo.enfermedad;
        if(nomEnfermedad!==''){
            this.props
                .createEnfermedad(nomEnfermedad)
                .then(() => {
                        this.props.retrieveEnfermedad();
                        this.notificacionGuardar();
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{enfermedad:''} });
        };
    }

    cargarNuevoMedicamento(){
        let nomMedicamento=this.state.campo.medicamento;
        if(nomMedicamento!==''){
            this.props
                .createMedicamento(nomMedicamento)
                .then(() => {
                        this.props.retrieveMedicamento();
                        this.notificacionGuardar();
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{medicamento:''} });
        };
    }
    
    cargarNuevaObrasocial(){
        let nomObrasocial=this.state.campo.obrasocial;
        let esestatal=this.convertirCheck(this.state.isChecked);
        if(nomObrasocial!==''){
            this.props
                .createObraSocial(nomObrasocial, esestatal)
                .then(() => {
                        this.props.retrieveObraSocial();
                        this.notificacionGuardar();
                 })
                .catch((e) => {
                        console.log(e);
                 });
            this.setState({ campo:{obrasocial:''} });
        };
    }

    eliminar(id, nomenclador){
        switch (nomenclador) {
            case "enfermedad":{
                this.props
                .deleteEnfermedad(id)
                .then(() => {
                        this.props.retrieveEnfermedad();
                })
            }
            case "medicamento":{
                this.props
                .deleteMedicamento(id)
                .then(() => {
                        this.props.retrieveMedicamento();
                })
            }
            case "obrasocial":{
                this.props
                .deleteObraSocial(id)
                .then(() => {
                        this.props.retrieveObraSocial();
                })
            }
            }

        this.setState({show:false, show2:false, show3:false});
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

    notificacionEliminar(id, nomenclador){
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
                this.eliminar(id, nomenclador)
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
            const {show, showNuevo, show2, showNuevo2, show3, showNuevo3}=this.state;
            const {enfermedades, medicamentos, obrasociales} = this.props;

        return (
            <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto" style={{paddingTop:20}}>
                <div className="mb-4 col-12 col-md-9 col-lg-12 col-xl-10">
                    <h3 className="mt-4">Ingresar Nomcencladores</h3>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                            <div className="row">
                            <div className="mb-4 col-12 col-md-12 col-lg-12 col-xl-12 input-group">
                                <input type="text" className="form-control" placeholder="Enfermedad..." id="enfermedad" onChange={this.detectarCambio.bind(this, "enfermedad")} value={this.state.campo["enfermedad"] || ''}/>
                                
                                {showNuevo ? (
                                <button type="button" className="btn btn-primary" onClick={() => this.cargarNuevaEnfermedad()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                </svg></button>                              
                                ):('')}
                                {show ? (
                                <span>
                                <button type="button" className="btn btn-primary" onClick={() => this.guardarEnfermedad()}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg></button>
                                <button type="button" className="btn btn-danger" onClick={() => this.cancelar()}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg></button>
                                </span>
                                ):('')}
                               
                            </div>  
                            </div>

                            <div className="row">
                            <div className="mb-4 col-12 col-md-12 col-lg-12 col-xl-12" style={{position: "relative", height: "350px", overflow: "auto", display: "block"}}>
                            <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                            <thead>
                                <tr>
                                <th scope="col">Enfermedad</th>
                                <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody style={{verticalAlign:'middle'}}>
                                
                                {enfermedades &&
                                                enfermedades.map((enfermedad, index) => (
                                                    <tr key={index}>
                                                    <td>{enfermedad.nombre}</td>
                                                    <td><button type="button" className="btn btn-success" style={{marginRight:10}} onClick={() => this.editarEnfermedad(enfermedad.nombre, enfermedad.idenfermedad)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg></button>
                                                        <button type="button" className="btn btn-danger" onClick={() => this.notificacionEliminar(enfermedad.idenfermedad, "enfermedad")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
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


                        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                            <div className="row">
                            <div className="mb-4 col-12 col-md-12 col-lg-12 col-xl-12 input-group">
                                <input type="text" className="form-control" placeholder="Medicamento..." id="medicamento" onChange={this.detectarCambio.bind(this, "medicamento")} value={this.state.campo["medicamento"] || ''}/>
                                {showNuevo2 ? (
                                <button type="button" className="btn btn-primary" onClick={() => this.cargarNuevoMedicamento()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                </svg></button>
                                ):('')}
                                {show2 ? (
                                <span>
                                <button type="button" className="btn btn-primary" onClick={() => this.guardarMedicamento()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg></button>
                                <button type="button" className="btn btn-danger" onClick={() => this.cancelar()}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg></button>
                                </span>
                                ):('')}
                            </div>  
                            </div>

                            <div className="row">
                            <div className="mb-4 col-12 col-md-12 col-lg-12 col-xl-12" style={{position: "relative", height: "350px", overflow: "auto", display: "block"}}>
                            <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                            <thead>
                                <tr>
                                <th scope="col">Medicamento</th>
                                <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody style={{verticalAlign:'middle'}}>
                                
                                {medicamentos &&
                                                medicamentos.map((medicamento, index) => (
                                                    <tr key={index}>
                                                    <td>{medicamento.nombre}</td>
                                                    <td><button type="button" className="btn btn-success" style={{marginRight:10}} onClick={() => this.editarMedicamento(medicamento.nombre, medicamento.idmedicamento)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg></button>
                                                        <button type="button" className="btn btn-danger" onClick={() => this.notificacionEliminar(medicamento.idmedicamento, "medicamento")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
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


                        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                            <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 input-group">
                                <input type="text" className="form-control" placeholder="Obra Social..." id="obrasocial" onChange={this.detectarCambio.bind(this, "obrasocial")} value={this.state.campo["obrasocial"] || ''}/>
                                {showNuevo3 ? (
                                <button type="button" className="btn btn-primary" onClick={() => this.cargarNuevaObrasocial()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                </svg></button>
                                ):('')}
                                {show3 ? (
                                <span>
                                <button type="button" className="btn btn-primary" onClick={() => this.guardarObrasocial()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg></button>
                                <button type="button" className="btn btn-danger" onClick={() => this.cancelar()}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg></button>
                                </span>
                                ):('')}
                                
                            </div>
                                <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                <label className="col-form-label" style={{marginRight:10, marginLeft:10}}>Es Publica</label><input type="checkbox" name="isChecked" checked={this.state.isChecked} onChange={this.detectarCheck} />
                                </div>  
                            </div>

                            <div className="row">
                            <div className="mb-4 col-12 col-md-12 col-lg-12 col-xl-12" style={{position: "relative", height: "350px", overflow: "auto", display: "block"}}>
                            <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                            <thead>
                                <tr>
                                <th scope="col">Medicamento</th>
                                <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody style={{verticalAlign:'middle'}}>
                                
                                {obrasociales &&
                                                obrasociales.map((obrasocial, index) => (
                                                    <tr key={index}>
                                                    <td>{obrasocial.nombre}</td>
                                                    <td><button type="button" className="btn btn-success" style={{marginRight:10}} onClick={() => this.editarObrasocial(obrasocial.nombre, obrasocial.idobrasocial)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg></button>
                                                        <button type="button" className="btn btn-danger" onClick={() => this.notificacionEliminar(obrasocial.idobrasocial, "obrasocial")}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
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

                        
                    </div>
                </div>

                
                
                </div>

                

                
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        enfermedades: state.enfermedad,
        medicamentos: state.medicamento,
        obrasociales: state.obrasocial,
    };
};

export default connect(mapStateToProps, { retrieveEnfermedad, createEnfermedad, updateEnfermedad, deleteEnfermedad, retrieveMedicamento, createMedicamento, updateMedicamento, deleteMedicamento, retrieveObraSocial, createObraSocial, updateObraSocial, deleteObraSocial })(Nomenclador);