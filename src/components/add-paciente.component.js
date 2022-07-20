import React, { Component } from "react";
import Swal from "sweetalert2";
import { pacienteRepository } from "../services/pacienteService";
import { municipioRepository } from "../services/municipioService";
import Vivienda from "./AddPaciente/Vivienda";
import DatosPersonales from "./AddPaciente/DatosPersonales";

class AddPaciente extends Component {
  constructor(props) {
    super(props);
    this.savePersonaEP = this.savePersonaEP.bind(this);

    // Defino los estados locales
    this.state = {
      //Para validacion
      campo: {
        //Por lo menos uno tiene q ser "", porque sino me toma todos como string y eso provoca problemas
        calleR: "",
        numeroR: null,
        pisoR: null,
        calleEP: "",
        numeroEP: null,
        pisoEP: null,

        escolaridadEP: null,

        localidadR: null,
        localidadEP: null,

        municipioR: null,
        municipioEP: null,
      },
      error: {},
      enviado: false,
      progreso: 10,
    };
  }

  componentDidMount() {
    this.getMunicipios();
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
      error["nacimientoEP"] =
        "Por favor, ingresa la fecha de nacimiento del paciente.";
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
      error["ocupacionPEP"] =
        "Por favor, selecciona la ocupación previa del paciente.";
    }

    // Ocupacion actual de EP
    if (!campo["ocupacionAEP"]) {
      formularioValido = false;
      error["ocupacionAEP"] =
        "Por favor, selecciona la ocupacion actual del paciente.";
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
      error["nacimientoR"] =
        "Por favor, ingresa la fecha de nacimiento del referente.";
    }

    // Telefono de R
    if (!campo["telefonoR"]) {
      formularioValido = false;
      error["telefonoR"] = "Por favor, ingresa el telefono del referente.";
    }

    // Seteo el estado de error
    this.setState({
      error: error,
    });

    return formularioValido;
  }

  savePersonaEP() {
    const { campo } = this.state;

    pacienteRepository
      .guardarPaciente(campo)
      .then((response) => {
        if (response) {
          this.send();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Una vez que los campos del formulario han sido llenado correctamente
  // Mostramos un mensaje al usuario diciendo: 'Mensaje Enviado Satisfactoriamente !'
  enviarFormulario() {
    // Si la validación de los campos del formulario ha sido realizada
    if (this.validarFormulario()) {
      this.savePersonaEP();
      // Cambio el estado de 'enviado' a 'true'
      this.setState({ enviado: true });
    } else {
      //Muestra un mensaje de campos incompletos
      this.errorSend();
    }
  }

  // Detectamos cuando un campo del formulario es llenado y por ende cambia de estado
  detectarCambio(field, e) {
    console.log(field + e.target.value);
    let campo = this.state.campo;
    campo[field] = e.target.value;

    // Cambio de estado de campo
    this.setState({
      campo,
    });
  }

  send() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Formulario enviado con éxito!",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(window.location.reload(true), 1500);
  }

  errorSend() {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Formulario incompleto",
      text: "Campos vacíos o incorrectos.",
      confirmButtonText: "OK",
    });
  }

  sumarProgreso() {
    let suma = this.state.progreso + 20;
    this.setState({
      progreso: suma,
    });
  }

  // Función que obtiene la lista de municipios
  getMunicipios = async () => {
    let response = await municipioRepository.getAll();

    if (response) {
      let listMunicipios = response.data;
      this.setState({ municipios: listMunicipios });
    }
  };

  render() {
    const { progreso, municipios } = this.state;
    const arrayProvincias = [
      { id: 1, provincia: "Buenos Aires" },
      { id: 2, provincia: "Catamarca" },
      { id: 3, provincia: "Chaco" },
      { id: 4, provincia: "Chubut" },
      { id: 5, provincia: "Córdoba" },
      { id: 6, provincia: "Corrientes" },
      { id: 7, provincia: "Entre Ríos" },
      { id: 8, provincia: "Formosa" },
      { id: 9, provincia: "Jujuy" },
      { id: 10, provincia: "La Pampa" },
      { id: 11, provincia: "La Rioja" },
      { id: 12, provincia: "Mendoza" },
      { id: 13, provincia: "Misiones" },
      { id: 14, provincia: "Neuquén" },
      { id: 15, provincia: "Río Negro" },
      { id: 16, provincia: "Salta" },
      { id: 17, provincia: "San Juan" },
      { id: 18, provincia: "San Luis" },
      { id: 19, provincia: "Santa Cruz" },
      { id: 20, provincia: "Santa Fe" },
      { id: 21, provincia: "Santiago del Estero" },
      { id: 22, provincia: "Tierra del Fuego" },
      { id: 23, provincia: "Tucumán" },
    ];

    return (
      <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto">
        <div className="w-100">
          <div
            className="progress"
            style={{
              width: "80%",
              height: "25px",
              borderRadius: "10px",
              margin: "auto",
              marginTop: "25px",
            }}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={progreso}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progreso + "%" }}
            >
              {progreso}%
            </div>
          </div>
          <div className="w-100 text-end">
            <button
              type="submit"
              className="mb-3 col-6 btn btn-azul col-md-3 col-xl-2"
              onClick={() => this.sumarProgreso()}
            >
              Siguiente
            </button>
          </div>
        </div>

        <h1 className="mt-4 mt-md-2 text-center">Persona con EP</h1>
        <DatosPersonales tipo="EP" state={this.state}></DatosPersonales>

        <div className="mb-4 col-12 col-md-12 col-lg-4 col-xl-3">
          <label>
            <input
              className="form-check-input"
              type="checkbox"
              id="vive_solo"
              value=""
              style={{ marginRight: "10px" }}
            />
            Vive Solo
          </label>
        </div>

        <div className="mb-4 col-12 col-md-12 col-lg-4 col-xl-3">
          <label>
            <input
              className="form-check-input"
              type="checkbox"
              id="tiene_cuidador"
              value=""
              style={{ marginRight: "10px" }}
            />
            Tiene Cuidador
          </label>
        </div>

        <div className="mb-4 col-12 col-md-12 col-lg-4 col-xl-3">
          <label style={{ inlineSize: "max-content" }}>
            <input
              className="form-check-input"
              type="checkbox"
              id="tiene_acompañante"
              value=""
              style={{ marginRight: "10px" }}
            />
            Tiene Acompañante Terapeútico
          </label>
        </div>

        <Vivienda
          tipo="EP"
          state={this.state}
          arrayProvincias={arrayProvincias}
          municipios={municipios}
        ></Vivienda>

        <div className="container">
          <div className="row">
            <h3 className="mt-4">Otros Datos</h3>
            <hr />
            <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
              <label className="col-form-label">Maxima Escolaridad</label>
              <div>
                <select
                  className="form-select"
                  id="escolaridadEP"
                  onChange={this.detectarCambio.bind(this, "escolaridadEP")}
                  value={this.state.campo["escolaridadEP"] || ""}
                >
                  <option value="">Escolaridad </option>
                  <option value="Sin Escolaridad">Sin Escolaridad</option>
                  <option value="Primario">Primario</option>
                  <option value="Secundario">Secundario</option>
                  <option value="Terciario">Terciario</option>
                  <option value="Universitario">Universitario</option>
                </select>
                <span style={{ color: "red" }}>
                  {this.state.error["escolaridadEP"]}
                </span>
              </div>
            </div>

            <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
              <label className="col-form-label">Nivel Completado</label>
              <div>
                <select
                  className="form-select"
                  id="nivelCompletoEP"
                  onChange={this.detectarCambio.bind(this, "nivelCompletoEP")}
                  value={this.state.campo["nivelCompletoEP"] || ""}
                >
                  <option value="">Elegir </option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </select>
                <span style={{ color: "red" }}>
                  {this.state.error["nivelCompletoEP"]}
                </span>
              </div>
            </div>

            <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
              <label className="col-form-label">Ocupacion Previa</label>
              <div>
                <select
                  className="form-select"
                  id="ocupacionPEP"
                  onChange={this.detectarCambio.bind(this, "ocupacionPEP")}
                  value={this.state.campo["ocupacionPEP"] || ""}
                >
                  <option value="">Profesion</option>
                  <option value="Desocupado">Desocupado</option>
                  <option value="Ocupado">Ocupado</option>
                  <option value="Subocupado">Subocupado</option>
                </select>
                <span style={{ color: "red" }}>
                  {this.state.error["ocupacionPEP"]}
                </span>
              </div>
            </div>

            <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
              <label className="col-form-label">Ocupacion Actual</label>
              <div>
                <select
                  className="form-select"
                  id="ocupacionAEP"
                  onChange={this.detectarCambio.bind(this, "ocupacionAEP")}
                  value={this.state.campo["ocupacionAEP"] || ""}
                >
                  <option value="">Profesion</option>
                  <option value="Desocupado">Desocupado</option>
                  <option value="Ocupado">Ocupado</option>
                  <option value="Subocupado">Subocupado</option>
                </select>
                <span style={{ color: "red" }}>
                  {this.state.error["ocupacionAEP"]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="mt-4 mt-md-2 text-center">Referente</h1>

        <DatosPersonales tipo="R" state={this.state}>
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Parentesco con el paciente</label>
            <div>
              <select
                className="form-select"
                id="parentescoR"
                onChange={this.detectarCambio.bind(this, "parentescoR")}
                value={this.state.campo["parentescoR"] || ""}
              >
                <option value="">Parentesco</option>
                <option value="Familiar">Familiar</option>
                <option value="Empleado">Empleado</option>
                <option value="Conocido">Conocido</option>
              </select>
              <span style={{ color: "red" }}>
                {this.state.error["parentescoR"]}
              </span>
            </div>
          </div>
        </DatosPersonales>

        <Vivienda
          tipo="R"
          state={this.state}
          arrayProvincias={arrayProvincias}
          municipios={municipios}
        ></Vivienda>

        <button
          type="submit"
          className="mb-3 col-6 btn btn-success col-md-3 col-xl-2"
          onClick={() => this.enviarFormulario(this)}
        >
          Confirmar
        </button>
      </main>
    );
  }
}

export default AddPaciente;
