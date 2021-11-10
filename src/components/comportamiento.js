import React, { Component, alert } from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";

import {
  Col,
  Modal,
  Button,
  Card,
  CardBody,
  FormGroup,
  CardHeader,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";

class comportamiento extends Component {

  constructor(props) {
    super(props);

    this.listRef = React.createRef();
    // this.state = false;
    // this.state = { formModal2: false };
    this.state = {value: '3'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // const [formModal2, setformModal2] = useState(false);    
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  //  myFunction() {
  //   var option_value = document.getElementById("numbers").value;
  //   if (option_value === "3") {
  //     "#myModal".modal();
  //   }
  // }

  

  

  render() {
    
    
    const arrayTiposTaller = [
      { id: 1, tipoTaller: "Marcha", value: "1" },
      { id: 2, tipoTaller: "Balanceo", value: "2" },
      { id: 3, tipoTaller: "Postura", value: "3" },
    ];

    return (
      <form >
        <main
          className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 
                rounded shadow container-lg mx-md-auto"
        >
          <Col
            className="float-right"
            xs="14"
            style={{ marginTop: 10, marginBottom: 0 }}
          >
            <Button
              color="primary"
              onClick={(e) => (window.location.href = "/addComportamiento")}
              size="sm"
            >
              Volver Atrás
            </Button>
          </Col>
          <h1 className="mt-0 mt-md-0 text-center"> Añadir Comportamiento</h1>

          <h6 className=" mt-2 text-center heading-small text-muted">
            Datos del taller
          </h6>

          <hr />
          <form onSubmit={this.handleSubmit}>
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Unidad Observable</label>
            <div>
              <select
                className="form-select"
                id="tipoTaller"
                // onchange= { ()=> this.myFunction()} 
                value={this.state.value} 
                onChange={this.handleChange}
              >
                <option value="">-</option>
                {arrayTiposTaller &&
                  arrayTiposTaller.map((tipoTaller, index) => (
                    <option value={tipoTaller.tipoTaller} key={index}>
                      {tipoTaller.tipoTaller}
                    </option>
                  ))}
              </select>
              <span style={{ color: "red" }}></span>
            </div>
          </div>
          <div className="col-xl-3 col-form-label y-index-2">
            {/* <label className="col-form-label"> </label> */}
            <div> 
              {/* <input className="form-buttom btn btn-warning" type="submit" value="Ir" /> */}
              <Button
                className="form-buttom btn btn-warning"
                id="tipoTaller"
                type="submit"
                // onClick={() => {
                //   // setModalChange(false);
                //   this.deleteEventSweetAlert();
                // }}
                // onClick={}
              >
                {" "}
                ir
              </Button>
            </div>
          </div>
          </form>

          <Modal
            id="myModal"
            className="modal-dialog-centered"
            size="sm"
            isOpen={this.state.formModal2}
            toggle={() => this.setState({ setformModal2: true })}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary border-0 mb-0">
                <CardHeader className="bg-transparent pb-1">
                  <div className="text text-center mt-2 mb-3">
                    <large>Agregar Peso</large>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Fecha </small>
                  </div>
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Fecha" type="date" />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center text-muted mb-4">
                      <small>Peso</small>
                    </div>
                    <FormGroup>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-ruler-pencil" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Peso"
                          type="text"
                          // onFocus={() => setFocusedPassword(true)}
                          // onBlur={() => setFocusedPassword(false)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="button">
                        Guardar
                      </Button>
                    </div>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="danger"
                        type="button"
                        onClick={() => this.setState({formModal2:false})}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>

          <div className="w-100"></div>

          <div className="w-100 pull-right">
            <button
              type="submit"
              className="mb-3 col-3 btn btn-danger col-md-3 col-xl-2"
              style={{ float: "right", margin: 5 }}
            >
              Cancelar
              <span class="glyphicon glyphicon-chevron-right"></span>
            </button>
            <button
              type="submit"
              className="mb-3 col-3 btn btn-success col-md-3 col-xl-2 "
              style={{ float: "right", margin: 5 }}
            >
              Guardar
              <span class="glyphicon glyphicon-remove-sign"></span>
            </button>
          </div>
        </main>
      </form>
    );
  }
}

export default comportamiento;
