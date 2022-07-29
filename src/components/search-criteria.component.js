import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { eventRespository } from "../services/event.service";
import Swal from "sweetalert2";
import {
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayPerson: [],
      // nombre: '',
      // apellido: '',
      searchArrayperson: {
        idpersona: 0,
        nombre: "",
        apellido: "",
        telefono:0,
        sexo:""
      },
    modalEdit: false,
    }
    this.buscarName = this.buscarName.bind(this);
    this.buscarLastName = this.buscarLastName.bind(this);
  }

  componentDidMount() {
    this.getPersonAll();
  }
  handleChange = (e) => {
    this.setState({
      searchArrayperson: {
        ...this.state.searchArrayperson,
        [e.target.name]: e.target.value,
      },
    });
  };
  edit = (data) => {
    let list = this.state.arrayPerson;
    let modifidedEvent;
    list.map((listdata) => {
      if (data.idpersona === listdata.idpersona.idpersona) {
        modifidedEvent = {
          id: data.idpersona,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          sexo: data.sexo
        }
        return modifidedEvent
      }
      return list
    });
    eventRespository.updatePerson(data.idpersona, modifidedEvent)
      .then((response) => {
        if (response) {
          this.notificacionExito();
          this.clear();
          this.getPersonAll();
        }
      })
      .catch((error) => {
        this.notificacionError();
      });
      this.setState({ list, modalEdit: false, error: "" });
  };

  showModalEdit = (data) => {
    this.setState({
      modalEdit: true,
      searchArrayperson: {idpersona: data.idpersona.idpersona, nombre: data.idpersona.nombre, apellido: data.idpersona.apellido, telefono:data.idpersona.telefono, sexo: data.sexo },
      error: "",
    });
  };
  handleModalEdit = () => {
    this.setState({ modalEdit: false });
  };
  clear() {
    this.setState({ searchArrayperson: { idpersona:0, nombre: "", apellido: "", telefono:0, sexo:"" } });
  }
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

  // Función que obtiene la lista de personas con ep
  getPersonAll = async () => {
    let response = await eventRespository.getAll();
    if (response) {
      this.setState({ arrayPerson: response.data });
      // this.setState({ searchArrayperson: this.state.arrayPerson });
      }
  };

   // Función que obtiene para eliminar un tipos de evento
  deletePerson = async (id) => {
    await eventRespository.deletePerson(id);
  };

  eliminar(id) {
    let arrayPersonas = this.state.arrayPerson.filter(function (person) {
      return person.idpersona.idpersona !== (id)
    });
    this.setState({ arrayPerson: arrayPersonas })
    this.setState({ searchArrayperson: this.state.arrayPerson })
    this.deletePerson(arrayPersonas.idpersona.idpersona);
  }
  
  buscar() {
    let nombre = this.state.searchArrayperson.nombre
    let apellido = this.state.searchArrayperson.apellido
    let arrayPersonas = this.state.arrayPerson.filter(function (person) {
      return person.idpersona.nombre.includes(nombre) && person.idpersona.apellido.includes(apellido)
    });
    this.setState({ searchArrayperson: arrayPersonas })
  }

  buscarName(event) {
    this.setState({
      nombre: event.target.value
    })
  }

  buscarLastName(event) {
    this.setState({
      apellido: event.target.value
    })
  }
  
  render() {
    return (
      <>
      <main className="border-top-sm m-0 row justify-content-center m-md-3 rounded shadow container-lg mx-md-auto">
        <div className="mt-1 mb-2">
          <label id="nombre" htmlFor="" className="me-1" >Nombre</label>
          <input type="text" nombre="nombre" id="nombre" onChange={this.buscarName} />
        </div>
        <div>
          <label id="apellido" htmlFor="" className="me-1">Apellido</label>
          <input type="text" nombre="apellido" id="apellido" onChange={this.buscarLastName} />
          <button type="button" className="btn btn-success col ms-3" onClick={() => this.buscar()}>Confirmar</button>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Telefono</th>
                <th scope="col">Sexo</th>
                <th scope="col">Accion</th>

              </tr>
            </thead>
            {this.state.arrayPerson.map((person, index) => (
                <tbody key={index}>
                    <tr key={person.idpersona.idpersona}>
                    <th scope="row">{person.idpersona.idpersona}</th>
                    <td>{person.idpersona.nombre}</td>
                    <td>{person.idpersona.apellido}</td>
                    <td>{person.idpersona.telefono}</td>
                    <td>{person.sexo}</td>
                    <td>
                    <button
                          type="button"
                          className="btn btn-verde me-1"
                          onClick={() => this.showModalEdit(person)}
                        >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width="16" 
                          height="16" 
                          fill="currentColor" 
                          className="bi bi-pencil-square" 
                          viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                          
                        </button>
                      <button type="button" className="btn btn-danger" onClick={() => this.eliminar(person.id)}>Eliminar</button>
                    </td>
                  </tr>
                </tbody>
            ))}
          </table>
        </div>
      </main>

       {/* EDITAR */}
       <Modal isOpen={this.state.modalEdit}>
       <ModalHeader>
         <div>
           <h2>Editar la persona con ep</h2>
         </div>
       </ModalHeader>
       <ModalBody>
         <Form>
           <FormGroup>
             <label htmlFor="idpersona" className="control-label">
               ID de la persona
             </label>
             <input
               type="text"
               name="idpersona"
               id="idpersona"
               className="form-control"
               readOnly
               onChange={this.handleChange}
               value={this.state.searchArrayperson.idpersona}
             />
           </FormGroup>
           <FormGroup>
             <label htmlFor="nombre" className="control-label">
               Nombre 
             </label>
             <input
               type="text"
               name="nombre"
               id="nombre"
               className="form-control"
               onChange={this.handleChange}
               value={this.state.searchArrayperson.nombre}
             />
           </FormGroup>
           <FormGroup>
             <label htmlFor="apellido" className="control-label">
              Apellido 
             </label>
             <input
               type="text"
               name="apellido"
               id="apellido"
               className="form-control"
               onChange={this.handleChange}
               value={this.state.searchArrayperson.apellido}
             />
           </FormGroup>
           <FormGroup>
             <label htmlFor="telefono" className="control-label">
              Telefono 
             </label>
             <input
               type="text"
               name="telefono"
               id="telefono"
               className="form-control"
               onChange={this.handleChange}
               value={this.state.searchArrayperson.telefono}
             />
           </FormGroup>
           <FormGroup>
             <label htmlFor="sexo" className="control-label">
              sexo 
             </label>
             <input
               type="text"
               name="sexo"
               id="sexo"
               className="form-control"
               onChange={this.handleChange}
               value={this.state.searchArrayperson.sexo}
             />
           </FormGroup>
         </Form>
       </ModalBody>
       <ModalFooter>
         <button
           type="button"
           className="btn btn-secondary"
           data-bs-dismiss="modal"
           onClick={() => this.handleModalEdit()}
         >
           Cancelar
         </button>
         <button
           type="button"
           className="btn btn-primary"
           onClick={() => this.edit(this.state.searchArrayperson)}
         >
           Guardar
         </button>
       </ModalFooter>
     </Modal>
     </>
    )
  }
}
export default Search;