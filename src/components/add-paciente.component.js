import React, { Component } from "react";
import Swal from 'sweetalert2';
import { connect } from "react-redux";
import { createPersona } from "../actions/persona";
import { createPersonaEp } from "../actions/persona-ep";
import { createDireccion } from "../actions/direccion";
import { retrieveLocalidades } from "../actions/localidad";
import { retrieveMunicipios } from "../actions/municipio";

class AddPaciente extends Component {

    constructor(props) {
        super(props);
        this.savePersonaEP = this.savePersonaEP.bind(this);

        // Defino los estados locales 
        this.state = {
            //Para validacion
            campo: {
                //Por lo menos uno tiene q ser "", porque sino me toma todos como string y eso provoca problemas
                calleR:"",
                numeroR: null,
                pisoR:null,
                calleEP:"",
                numeroEP: null,
                pisoEP:null,

                escolaridadEP:null,

                localidadR:null,
                localidadEP:null,

                municipioR:null,
                municipioEP:null
            },
            error: {},
            enviado: false,
            //Para añadir personaEP a la base de datos
            //idPersonaEP:"",

            hoy:new Date(),

           
        };
    }

    componentDidMount() {
        this.props.retrieveLocalidades();
        this.props.retrieveMunicipios();
      }

    // Valido los campos del formulario 
    validarFormulario() {
        let campo = this.state.campo;
        let error = {};
        let formularioValido = true;

        //Datos de Paciente con Parkinson
        // Nombre de EP 
        if (!campo["nombreEP"]) {
            formularioValido = false;
            error["nombreEP"] = "Por favor, ingresa el nombre del paciente.";
        }

        // Apellido de EP 
        if (!campo["apellidoEP"]) {
            formularioValido = false;
            error["apellidoEP"] = "Por favor, ingresa el apellido del paciente.";
        }

        // Sexo de EP 
        if (!campo["sexoEP"]) {
            formularioValido = false;
            error["sexoEP"] = "Por favor, selecciona el sexo del paciente.";
        }

        // Fecha de Nacimiento de EP 
        if (!campo["nacimientoEP"]) {
            formularioValido = false;
            error["nacimientoEP"] = "Por favor, ingresa la fecha de nacimiento del paciente.";
        }

        // Telefono de EP 
        if (!campo["telefonoEP"]) {
            formularioValido = false;
            error["telefonoEP"] = "Por favor, ingresa el telefono del paciente.";
        }

        // Provincia de EP 
        if (!campo["provinciaEP"]) {
            formularioValido = false;
            error["provinciaEP"] = "Por favor, selecciona la provincia del paciente.";
        }

        // Localidad de EP 
        if (!campo["localidadEP"]) {
            formularioValido = false;
            error["localidadEP"] = "Por favor, selecciona la localidad del paciente.";
        }

        // Municipio de EP 
        if (!campo["municipioEP"]) {
            formularioValido = false;
            error["municipioEP"] = "Por favor, selecciona el municipio del paciente.";
        }

        // Ocupacion previa de EP 
        if (!campo["ocupacionPEP"]) {
            formularioValido = false;
            error["ocupacionPEP"] = "Por favor, selecciona la ocupación previa del paciente.";
        }

        // Ocupacion actual de EP 
        if (!campo["ocupacionAEP"]) {
            formularioValido = false;
            error["ocupacionAEP"] = "Por favor, selecciona la ocupacion actual del paciente.";
        }
        
        //Datos Referente
        // Nombre de R 
        if (!campo["nombreR"]) {
            formularioValido = false;
            error["nombreR"] = "Por favor, ingresa el nombre del referente.";
        }

        // Apellido de R 
        if (!campo["apellidoR"]) {
            formularioValido = false;
            error["apellidoR"] = "Por favor, ingresa el apellido del referente.";
        }

        // Sexo de R
        if (!campo["sexoR"]) {
            formularioValido = false;
            error["sexoR"] = "Por favor, selecciona el sexo del referente.";
        }

        // Fecha de Nacimiento de R 
        if (!campo["nacimientoR"]) {
            formularioValido = false;
            error["nacimientoR"] = "Por favor, ingresa la fecha de nacimiento del referente.";
        }

        // Telefono de R
        if (!campo["telefonoR"]) {
            formularioValido = false;
            error["telefonoR"] = "Por favor, ingresa el telefono del referente.";
        }

        // Seteo el estado de error 
        this.setState({
            error: error
        });

        return formularioValido;
    }
    
    savePersonaEP() {
        const { campo, hoy } = this.state;
        console.log(campo);
        //let perro=0;
        //if(perro==0) {} funciona
        
        this.props
          .createDireccion(campo.calleR, "A", campo.numeroR, campo.pisoR, campo.localidadR)
          .then((data) => {
            console.log(data,'direccion R')
            this.props
            .createDireccion(campo.calleEP, "A", campo.numeroEP, campo.pisoEP, campo.localidadEP)
            .then((data2) => {
                console.log(data2, 'direccion EP');
                this.props
                .createPersona(campo.nombreR, campo.apellidoR, campo.telefonoR, data.iddireccion)
                .then((data3) => {
                    console.log(data3, 'persona R')
                    this.props
                    .createPersona(campo.nombreEP, campo.apellidoEP, campo.telefonoEP, data2.iddireccion)
                    .then((data4) => {
                        console.log(data4, 'persona EP');
                        console.log(data4.idpersona,'asa');
                        this.props
                            .createPersonaEp("0", hoy, campo.nacimientoEP, campo.escolaridadEP, campo.sexoEP, "1", "0", "1", campo.ocupacionPEP, campo.ocupacionAEP, data4.idpersona, data3.idpersona)
                            .then((data5) => {
                                console.log(data5,'PERSONA EP');
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                })
                .catch((e) => {
                    console.log(e);
                });

            })
            .catch((e) => {
                console.log(e);
            });

        })
        .catch((e) => {
            console.log(e);
        });
          
      }

    // Una vez que los campos del formulario han sido llenado correctamente 
    // Mostramos un mensaje al usuario diciendo: 'Mensaje Enviado Satisfactoriamente !'
    enviarFormulario(e) {
        e.preventDefault();

        // Si la validación de los campos del formulario ha sido realizada 
        if (this.validarFormulario()) {
            this.savePersonaEP();
            // Cambio el estado de 'enviado' a 'true'
            this.setState({ enviado: true });

            // Muestro el mensaje que se encuentra en la función mensajeEnviado()
           
            return this.send();
        }
        else {
            //this.savePersonaEP();
            console.log(this.state.localidades)
            return this.errorSend();
        }

    }


    // Detectamos cuando un campo del formulario es llenado y por ende cambia de estado 
    detectarCambio(field, e) {

        let campo = this.state.campo;
        campo[field] = e.target.value;

        // Cambio de estado de campo 
        this.setState({
            campo
        });
        console.log(campo.localidadEP, campo.localidadR, campo.municipioEP, campo.municipioR, campo.provinciaEP, campo.provinciaR, 's')

    }

    send() {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Formulario enviado con éxito!',
            showConfirmButton: false,
            timer: 1500,
        });
        //setTimeout('window.location.reload(true)', 1500);
    }

    errorSend() {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Formulario incompleto',
            text: 'Campos vacíos o incorrectos.',
            confirmButtonText: 'OK',
        });
    }

    render() {
        const {campo} = this.state;
        const {localidades, municipios} = this.props;
        const arrayProvincias= [{id:1,provincia:'Buenos Aires'},{id:2,provincia:'CABA'},{id:3,provincia:'Catamarca'},
                                {id:4,provincia:'Chaco'},{id:5,provincia:'Chubut'},{id:6,provincia:'Cordoba'},
                                {id:7,provincia:'Corrientes'},{id:8,provincia:'Entre Rios'},{id:9,provincia:'Formosa'},
                                {id:10,provincia:'Jujuy'},{id:11,provincia:'La Pampa'},{id:12,provincia:'La Rioja'},
                                {id:13,provincia:'Mendoza'},{id:14,provincia:'Misiones'},{id:15,provincia:'Neuquen'},
                                {id:16,provincia:'Rio Negro'},{id:17,provincia:'Salta'},{id:18,provincia:'Santa Cruz'},
                                {id:19,provincia:'Santa Fe'},{id:20,provincia:'Santiago del Estero'},{id:21,provincia:'San Luis'},
                                {id:22,provincia:'San Juan'},{id:23,provincia:'Tierra del Fuego'},{id:24,provincia:'Tucuman'}
                                ];
        
        return (
            <form onSubmit={this.enviarFormulario.bind(this)}>
                <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto">

                    <h1 className="mt-4 mt-md-2 text-center">Persona con EP</h1>
                    <h3 className=" mt-4">Datos Personales</h3>
                    <hr />
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder="Nombre" id="nombreEP" aria-describedby="nombreEPHelp" onChange={this.detectarCambio.bind(this, "nombreEP")} value={this.state.campo["nombreEP"] || ''} />
                        <span style={{ color: "red" }}>{this.state.error["nombreEP"]}</span>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className=" col-form-label">Apellido</label>
                        <input type="text" className="form-control" placeholder="Apellido" id="apellidoEP" aria-describedby="apellidoEPHelp" onChange={this.detectarCambio.bind(this, "apellidoEP")} value={this.state.campo["apellidoEP"] || ''} />
                        <span style={{ color: "red" }}>{this.state.error["apellidoEP"]}</span>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className=" col-form-label">Sexo</label>
                        <select className="form-select" id="sexoEP" onChange={this.detectarCambio.bind(this, "sexoEP")} value={this.state.campo["sexoEP"] || ''}>
                            <option value="">Sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <span style={{ color: "red" }}>{this.state.error["sexoEP"]}</span>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className=" col-form-label">Fecha de Nacimiento</label>
                        <input type="date" className="form-control" placeholder="Fecha de Nacimiento" id="nacimientoEP" aria-describedby="nacimientoEPHelp" onChange={this.detectarCambio.bind(this, "nacimientoEP")} value={this.state.campo["nacimientoEP"] || ''} />
                        <span style={{ color: "red" }}>{this.state.error["nacimientoEP"]}</span>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3 ">
                        <label className=" col-form-label ">Telefono</label>
                        <input type="number" className="form-control" placeholder="Telefono" id="telefonoEP" aria-describedby="telefonoEPHelp" onChange={this.detectarCambio.bind(this, "telefonoEP")} value={this.state.campo["telefonoEP"] || ''} />
                        <span style={{ color: "red" }}>{this.state.error["telefonoEP"]}</span>
                    </div>

                    <div className="w-100"></div>

                    <div className="mb-4 mx-3  d-flex justify-content-between justify-content-md-around col-12 col-md-4 mx-md-0">
                        <label htmlFor="vive_solo">Vive Solo</label>
                        <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="vive_solo" />
                        </div>
                    </div>

                    <div className="mb-4 mx-3 d-flex justify-content-between justify-content-md-around col-12 col-md-4 mx-md-0">
                        <label htmlFor="tiene_cuidador">Tiene Cuidador</label>
                        <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="tiene_cuidador" />
                        </div>
                    </div>

                    <div className="mb-3 mx-3 d-flex justify-content-between justify-content-md-around col-12 col-md-4 mx-md-0">
                        <label htmlFor="tiene_acompañante_terapeutico">Tiene Acompañante Terapeutico</label>
                        <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="tiene_acompañante_terapeutico" />
                        </div>
                    </div>
                    <h3 className="mt-4">Vivienda</h3>
                    <hr />
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Provincia</label>
                        <div>
                            <select className="form-select" id="provinciaEP" onChange={this.detectarCambio.bind(this, "provinciaEP")} value={this.state.campo["provinciaEP"] || ''}>
                                <option value="">Provincia</option>
                                {arrayProvincias &&
                                    arrayProvincias.map((provincia, index) => (
                                        <option
                                            value={provincia.provincia}
                                            key={index}
                                            >
                                            {provincia.provincia}
                                        </option>
                                    ))}
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["provinciaEP"]}</span>
                        </div>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Municipio</label>
                        <div>
                            <select className="form-select" id="municipioEP" onChange={this.detectarCambio.bind(this, "municipioEP")} value={this.state.campo["municipioEP"] || ''}>
                                <option value="">Municipio</option>
                                {municipios &&
                                    municipios.filter(municipio=>municipio.provincia==campo.provinciaEP).map((municipio, index) => (
                                        <option
                                            value={municipio.idmunicipio}
                                            key={index}
                                            >
                                            {municipio.nombre}
                                        </option>
                                    ))}
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["municipioEP"]}</span>
                        </div>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Localidad</label>
                        <div>
                            <select className="form-select" id="localidadEP" onChange={this.detectarCambio.bind(this, "localidadEP")} value={this.state.campo["localidadEP"] || ''}>
                                <option value="">Localidad</option>
                                {localidades &&
                                    localidades.filter(localidad=>localidad.municipio_idmunicipio==campo.municipioEP).map((localidad, index) => (
                                        <option
                                            value={localidad.idlocalidad}
                                            key={index}
                                            >
                                            {localidad.nombre}
                                        </option>
                                    ))}
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["localidadEP"]}</span>
                        </div>
                    </div>                    
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Calle</label>
                        <div>
                            <input type="number" className="form-control" placeholder="Calle" id="calleEP" aria-describedby="calleEPHelp" onChange={this.detectarCambio.bind(this, "calleEP")} value={this.state.campo["calleEP"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["calleEP"]}</span>
                        </div>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Numero</label>
                        <div>
                            <input type="number" className="form-control" placeholder="Numero" id="numeroEP" aria-describedby="numeroEPHelp" onChange={this.detectarCambio.bind(this, "numeroEP")} value={this.state.campo["numeroEP"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["numeroEP"]}</span>
                        </div>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Piso</label>
                        <div>
                            <input type="text" className="form-control" placeholder="Piso" id="pisoEP" aria-describedby="pisoEPHelp" onChange={this.detectarCambio.bind(this, "pisoEP")} value={this.state.campo["pisoEP"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["pisoEP"]}</span>
                        </div>
                    </div>

                    <h3 className="mt-4">Datos Academicos</h3>
                    <hr />
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-lg-4 col-lg-4 col-xl-3">
                        <label className="col-form-label">Maxima Escolaridad</label>
                        <div>
                            <select className="form-select" id="escolaridadEP" onChange={this.detectarCambio.bind(this, "escolaridadEP")} value={this.state.campo["escolaridadEP"] || ''}>
                                <option value="">Escolaridad </option>
                                <option value="1">Primario </option>
                                <option value="2">Secundario</option>
                                <option value="3">Terciario</option>
                                <option value="4">Univercitario</option>
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["escolaridadEP"]}</span>
                        </div>
                    </div>

                    <h3 className="mt-4">Ocupación</h3>
                    <hr />
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-lg-4 col-xl-3">
                        <label className="col-form-label">Ocupacion Previa</label>
                        <div>
                            <select className="form-select" id="ocupacionPEP" onChange={this.detectarCambio.bind(this, "ocupacionPEP")} value={this.state.campo["ocupacionPEP"] || ''}>
                                <option value="">Profesion</option>
                                <option value="1">Desocupado</option>
                                <option value="2">Ocupado</option>
                                <option value="3">Subocupado</option>
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["ocupacionPEP"]}</span>
                        </div>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-lg-4 col-xl-3">
                        <label className="col-form-label">Ocupacion Actual</label>
                        <div>
                            <select className="form-select" id="ocupacionAEP" onChange={this.detectarCambio.bind(this, "ocupacionAEP")} value={this.state.campo["ocupacionAEP"] || ''}>
                                <option value="">Profesion</option>
                                <option value="1">Desocupado</option>
                                <option value="2">Ocupado</option>
                                <option value="3">Subocupado</option>
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["ocupacionAEP"]}</span>
                        </div>
                    </div>
                    <hr />
                    <h1 className="mt-4 mt-md-2 text-center">Referente</h1>
                    <h3 className=" mt-4">Datos Personales</h3>
                    <hr />
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Nombre</label>
                        <div>
                            <input type="text" className="form-control" placeholder="Nombre" id="nombreR" aria-describedby="nombreRHelp" onChange={this.detectarCambio.bind(this, "nombreR")} value={this.state.campo["nombreR"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["nombreR"]}</span>
                        </div>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Apellido</label>
                        <div>
                            <input type="text" className="form-control" placeholder="Apellido" id="apellidoR" aria-describedby="apellidoRHelp" onChange={this.detectarCambio.bind(this, "apellidoR")} value={this.state.campo["apellidoR"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["apellidoR"]}</span>
                        </div>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3 ">
                        <label className="col-form-label">Sexo</label>
                        <div>
                            <select className="form-select" id="sexoR" onChange={this.detectarCambio.bind(this, "sexoR")} value={this.state.campo["sexoR"] || ''}>
                                <option value="">Sexo</option>
                                <option value="1">Masculino</option>
                                <option value="2">Femenino</option>
                                <option value="3">Otro</option>
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["sexoR"]}</span>
                        </div>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Fecha de Nacimiento</label>
                        <div>
                            <input type="date" className="form-control" placeholder="Fecha de Nacimiento" id="nacimientoR" aria-describedby="nacimientoRHelp" onChange={this.detectarCambio.bind(this, "nacimientoR")} value={this.state.campo["nacimientoR"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["nacimientoR"]}</span>
                        </div>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label ">Telefono</label>
                        <div>
                            <input type="number" className="form-control" placeholder="Telefono" id="telefonoR" aria-describedby="telefonoRHelp" onChange={this.detectarCambio.bind(this, "telefonoR")} value={this.state.campo["telefonoR"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["telefonoR"]}</span>
                        </div>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Parentesco con la 'Persona con EP'</label>
                        <div>
                            <select className="form-select" id="parentescoR" onChange={this.detectarCambio.bind(this, "parentescoR")} value={this.state.campo["parentescoR"] || ''}>
                                <option value="">Parentesco</option>
                                <option value="1">Familiar</option>
                                <option value="2">Empleado</option>
                                <option value="3">Conocido</option>
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["parentescoR"]}</span>
                        </div>
                    </div>
                    <h3 className="mt-4">Vivienda</h3>
                    <hr />
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Provincia</label>
                        <div>
                            <select className="form-select" id="provinciaR" onChange={this.detectarCambio.bind(this, "provinciaR")} value={this.state.campo["provinciaR"] || ''}>
                                <option value="">Provincia</option>
                                <option value="1">Buenos Aires</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["provinciaR"]}</span>
                        </div>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Municipio</label>
                        <div>
                            <select className="form-select" id="municipioR" onChange={this.detectarCambio.bind(this, "municipioR")} value={this.state.campo["municipioR"] || ''}>
                                <option value="">Municipio</option>
                                {municipios &&
                                    municipios.map((municipio, index) => (
                                        <option
                                            value={municipio.idmunicipio}
                                            key={index}
                                            >
                                            {municipio.nombre}
                                        </option>
                                    ))}
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["municipioR"]}</span>
                        </div>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Localidad</label>
                        <div>
                            <select className="form-select" id="localidadR" onChange={this.detectarCambio.bind(this, "localidadR")} value={this.state.campo["localidadR"] || ''}>
                                <option value="">Localidad</option>
                                {localidades &&
                                    localidades.filter(localidad=>localidad.municipio_idmunicipio==campo.municipioR).map((localidad, index) => (
                                        <option
                                            value={localidad.idlocalidad}
                                            key={index}
                                            >
                                            {localidad.nombre}
                                        </option>
                                    ))}
                            </select>
                            <span style={{ color: "red" }}>{this.state.error["localidadEP"]}</span>
                        </div>
                    </div>                    
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Calle</label>
                        <div>
                            <input type="number" className="form-control" placeholder="Calle" id="calleR" aria-describedby="calleRHelp" onChange={this.detectarCambio.bind(this, "calleR")} value={this.state.campo["calleR"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["calleR"]}</span>
                        </div>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Numero</label>
                        <div>
                            <input type="number" className="form-control" placeholder="Numero" id="numeroR" aria-describedby="numeroRHelp" onChange={this.detectarCambio.bind(this, "numeroR")} value={this.state.campo["numeroR"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["numeroR"]}</span>
                        </div>
                    </div>

                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Piso</label>
                        <div>
                            <input type="text" className="form-control" placeholder="Piso" id="pisoR" aria-describedby="pisoRHelp" onChange={this.detectarCambio.bind(this, "pisoR")} value={this.state.campo["pisoR"] || ''} />
                            <span style={{ color: "red" }}>{this.state.error["pisoR"]}</span>
                        </div>
                    </div>
                    <div className="w-100"></div>
                    <button type="submit" className="mb-3 col-6 btn btn-success col-md-3 col-xl-2" >Confirmar</button>
                </main>
            </form>

        )
    }
}


const mapStateToProps = (state) => {
    return {
      localidades: state.localidad,
      municipios: state.municipio
    };
};
//onClick={this.send}
//export default AddPaciente;
export default connect(mapStateToProps, { createPersona, createPersonaEp, createDireccion, retrieveLocalidades, retrieveMunicipios })(AddPaciente);
