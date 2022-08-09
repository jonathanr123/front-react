import React from "react";
import { eventRespository } from "../services/event.service";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.css";

class Events extends React.Component {
    // Defino los estados locales
    state = {
      typeEvent: [],
      namePersonEP: [],
      error: {},
      events: {
        idEvento: 0,
        fechaDesde:'',
        fechaHasta:'',
        motivo:'',
        idpersonaep:0,
        idtipoevento:0
      }
    };
  componentDidMount() {
    this.getPersonAll();
    this.getTipeEvent();
  }
  // Función que obtiene la lista de personas con ep
  getPersonAll = async () => {
    let response = await eventRespository.getPersonAll();
    if (response) {
      this.setState({ namePersonEP: response.data });
    }
  };

  // Función que obtiene la lista de tipos de eventos
  getTipeEvent = async () => {
    let response = await eventRespository.getEventAll();
    if (response) {
      this.setState({ typeEvent: response.data });
    }
  };


  handleChange = (e) => {
    this.setState({
      events: {
        ...this.state.events,
        [e.target.name]: e.target.value,
      },
    });
  };

  guardarNuevo() {
    let data = {};
    data = {
      fechadesde: this.state.events.fechaDesde,
      fechahasta: this.state.events.fechaHasta,
      motivo: this.state.events.motivo,
      idpersonaep:this.state.events.idpersonaep,
      idtipoevento: this.state.events.idtipoevento,
      borrado: 0,
    };

    eventRespository
      .createEvent(data)
      .then((response) => {
        if (response) {
          this.notificacionExito();
        }
      })
      .catch((error) => {
        this.notificacionError();
      });
  };

//notificaciones
  notificacionExito() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Se ha guardado con éxito",
    });
  }
  //notificaciones
  notificacionError() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "Error: Hubo un problema en la carga.",
    });
  }
  validateDate (fechaDesde, fechaHasta) {
    if (fechaDesde !== "" && fechaHasta !== "") {
      return fechaDesde > fechaHasta;
    }
    return false
  }
  render() {
    const validate = this.validateDate(this.state.events.fechaDesde,this.state.events.fechaHasta);
    console.log(this.state.events, validate);
    return (
      <div className="container">
        <form id="myForm"> 
          <main className="justify-content-center row container-lg m-md-3 shadow mx-md-auto border-top-sm m-0">
            <h1 className="mt-4 mt-md-2 text-center">Gestion de eventos</h1>
            <h3 className="ms-4 text-center">Eventos</h3>
            <div className="row">
              <div className="form-grup mb-4">
                <label htmlFor="fechaDesde" className="control-label">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  name="fechaDesde"
                  id="fechaDesde"
                  className="form-control"
                  placeholder="Fecha de inicio"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-grup mb-4 ">
                <label htmlFor="fechaHasta" className="control-label">
                  Fecha de finalizacion
                </label>
                <input
                  type="date"
                  name="fechaHasta"
                  id="fechaHasta"
                  className="form-control"
                  placeholder="Fecha de finalizacion"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {validate &&
              <div className="row">
              <span style={{ color: 'red' }}><strong>La Fecha de finalizacion es menor a la Fecha de inicio</strong>. Coloque una fecha de finalizacion mayor a la fecha de inicio.</span>
              </div>
            }
            <div className="row">
              <div className="form-grup">
                <label htmlFor="motivo" className="control-label">
                  Motivo
                </label>
                <textarea
                  type="text"
                  name="motivo"
                  id="motivo"
                  className="form-control"
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>
            <br></br>
            <h3 className=" mt-4 ms-4 text-center">Tipo de Evento</h3>
            <div className="row">
              <div className="form-grup mb-4">
                <label htmlFor="idpersonaep" className="control-label">
                  Nombre del de la persona con ep
                </label>
                <select
                  className="form-select"
                  placeholder="Ingrese persona"
                  name="idpersonaep"
                  onChange={this.handleChange}
                  >
                  <option disabled={true} selected={true} defaultValue={-1}>Seleccione una persona</option>
                  {this.state.namePersonEP.map((element) => (
                    <option id="idpersonaep" key={element.idpersona.idpersona} value={element.idpersona.idpersona}>{element.idpersona.nombre} {element.idpersona.apellido}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-grup mb-4">
                <label htmlFor="idtipoevento" className="control-label">
                  Nombre del del tipo de evento
                </label>
                <select
                  className="form-select"
                  placeholder="Ingrese el tipo de evento"
                  name="idtipoevento"
                  onChange={this.handleChange}
                  >
                  <option disabled={true} selected={true} defaultValue={-1}>Seleccione un tipo de evento</option>
                  {this.state.typeEvent.map((element) => (
                      <option id='idtipoevento' key={element.idtipoevento}  value={element.idtipoevento} >{element.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className=" justify-content-center  d-flex mb-4">
                <button
                  type="button"
                  className="btn btn-azul"
                  disabled={validate}
                  onClick={() => this.guardarNuevo()}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                    </svg>Agregar
                </button>
              </div>
            </div>
          </main>
        </form>
      </div>
    );
  }
}
export default Events;
