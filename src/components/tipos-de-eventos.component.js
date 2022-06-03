import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
const data = [
  { id: 0, nameTypeEvent: "Movilidad impedida", checkTaller: true },
  { id: 1, nameTypeEvent: "Fallecimiento", checkTaller: true },
  { id: 2, nameTypeEvent: "Retorno de actividades", checkTaller: false },
];

class TypeEvents extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      nameTypeEvent: "",
      checkTaller: false,
    },
    modalInsert: false,
    modalEdit: false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  showModalInsert = () => {
    this.setState({ modalInsert: true });
  };

  handleModalInsert = () => {
    this.setState({ modalInsert: false });
  };

  showModalEdit = (data) => {
    this.setState({ modalEdit: true, form: data });
  };

  handleModalEdit = () => {
    this.setState({ modalEdit: false });
  };

  addNewEvent = () => {
    let newValue = { ...this.state.form };
    newValue.id = this.state.data.length + 1;

    let list = this.state.data;
    list.push(newValue);
    this.setState({ data: list, modalInsert: false });
  };

  edit = (data) => {
    let cont = 0;
    let list = this.state.data;
    list.map((listdata) => {
      if (data.id === listdata.id) {
        list[cont].nameTypeEvent = data.nameTypeEvent;
        list[cont].checkTaller = data.checkTaller;
      }
      cont++;
    });
    this.setState({ data: list, modalEdit: false });
  };

  delete = (data) => {
    let opcion = window.confirm(
      "Realmente desea eliminar el tipo de evento" + data.id
    );
    if (opcion) {
      let cont = 0;
      let list = this.state.data;
      list.map((listdata) => {
        if (data.id === listdata.id) {
          list.splice(cont, 1);
        }
        cont++;
      });
      this.setState({ data: list });
    }
  };

  render() {
    return (
      <>
        <Container>
          <button
            className="btn btn-primary mb-2 mt-2"
            onClick={() => this.showModalInsert()}
          >
            Insertar nuevo tipo de evento
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Desactivar Taller</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((element) => (
                <tr key={element.id}>
                  <td key={element.id}>{element.id}</td>
                  <td key={element.toString()}>{element.nameTypeEvent}</td>
                  <td>
                    <div className="form-check ms-5" key={element.toString()}>
                      <input
                        type="checkbox"
                        value={element.checkTaller}
                        className="form-check-input"
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success me-1"
                      onClick={() => this.showModalEdit(element)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.delete(element)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>

        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader>
            <div>
              <h2>Ingresar nuevo tipo de evento</h2>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label htmlFor="idTable" className="control-label">
                ID:
              </label>
              <input
                type="text"
                name="idTable"
                id="idTable"
                className="form-control"
                value={this.state.data.length}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="nameTypeEvent" className="control-label">
                Nombre de tipo de evento:
              </label>
              <input
                type="text"
                name="nameTypeEvent"
                id="nameTypeEvent"
                className="form-control"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="checkTaller" className="control-label">
                Desactivar taller:
              </label>
              <input
                type="checkbox"
                name="checkTaller"
                id="checkTaller"
                readOnly
                className="form-check-input"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => this.handleModalInsert()}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.addNewEvent()}
            >
              Agregar
            </button>
          </ModalFooter>
        </Modal>

        {/* EDITAR */}

        <Modal isOpen={this.state.modalEdit}>
          <ModalHeader>
            <div>
              <h2>Editar tipo de evento</h2>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label htmlFor="idTable" className="control-label">
                ID:
              </label>
              <input
                type="text"
                name="idTable"
                id="idTable"
                className="form-control"
                readOnly
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="nameTypeEvent" className="control-label">
                Nombre de tipo de evento:
              </label>
              <input
                type="text"
                name="nameTypeEvent"
                id="nameTypeEvent"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.form.nameTypeEvent}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="checkTaller" className="control-label">
                Desactivar taller:
              </label>
              <input
                type="checkbox"
                name="checkTaller"
                id="checkTaller"
                className="form-check-input"
                onChange={this.handleChange}
                value={this.state.form.checkTaller}
              />
            </FormGroup>
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
              onClick={() => this.edit(this.state.form)}
            >
              Editar
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default TypeEvents;
