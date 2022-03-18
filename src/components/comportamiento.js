import React, { Component, alert,componentRef } from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";
import ReactToPrint from "react-to-print";
import {useState} from 'react'; //2

import BootstrapTable from "react-bootstrap-table-next";

import {
  Col,
  Modal,
  Button,
  Card,
  Container,
  div,
  Row,
  FormGroup,
  CardBody,

} from "reactstrap";
import Example from "./Example";
let path =  window.location.hash.split('#')[1];
let di = '/comportamiento' + window.location.hash;
let a='';
let b='';
let c= 0;
class comportamiento extends Component {

  constructor(props) {
    super(props);

    this.listRef = React.createRef();
     this.state = {
      value: '',
      value2: '',
      value3: 0,
      options: [],
      // option2: []

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

  }



  handleChange(event) {
    // this.setState({value: event.target.value});
    let data=
      {
      'marcha': ['Elevacion Derecha','Elevacion Izquierda','otra'],
       'balanceo': ['Balanceo Derecho', 'Balanceo Izquierdo' , ''] ,
      'postura': ['Derecho', 'Inclinacion', 'otro']
    }

     console.log(data[event.target.value])
      this.setState({
        options: data[event.target.value],
        value: event.target.value,
        value2: event.target.value,
        // value3: event.tipoValor.value, //ver
        // options2: data[event.target.value],
      });
      a=event.target.value
      console.log(a)
  }

  handleChange2(event) {
    this.setState({value2: event.target.value});

    b=event.target.value
    console.log(b)
    // this.setState({value3: event.target.value});
  }
   handleChange3(event) {
    //  this.state.value3=event.target.value;
    // this.handleChange3({});
    // this.setState({value3: event.target.value});
  // this.setState({value3: event.target.value.tipoValor.select});
    c=event.target.value
    console.log('ver  ' + c);
    //  console.log(event.target.value)
  }



  handleSubmit(event) {

    console.log('hola ' + a + b + c);
    event.preventDefault();
    
    setTimeout(() => console.clear(), 1000);
    // event.preventDefault();
   }


    cancelCourse = e => {
      
      console.log('Form was submitted');
      window.location.reload(true);
    };
  
  // handleSubmit2(event3) {
  //   console.log('Your favorite flavor is: ' + this.state.value);
  //   event3.preventDefault();
  //   this.setState({value3: event3.target.value});
  //   // this.setState({value3: event3.target.tipoValor.select});
  // }



  render() {





    //  const arrayTiposTaller = [
    //    { id: 1, tipoTaller: "Marcha", value: "marcha" },
    //    { id: 2, tipoTaller: "Balanceo", value: "balanceo" },
    //   { id: 3, tipoTaller: "Postura", value: "postura" },
    //  ];

    const arrayTipoValor = [
      { id: 1, tipoValor: '0', value: '0' , name:0 },
      { id: 2, tipoValor: '1', value: '1' , name:1 },
      { id: 3, tipoValor: '2', value: '2' , name:2 },
    ];
   

  function handleSubmit_1 (e){
    // alert('A name was submitted: ');
    console.log('hola ' + a + b + c);
  }
    return (
      <form>
        <main
          className="border-top-sm m-0 row justify-content-center form-paciente m-md-3
                rounded shadow container-lg mx-md-auto noPrint"
                
        >
          <Col
            className="float-right "
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
            Datos del comportamiento de :
            <>&nbsp;</>
            {path}
            {/* {window.location.state} */}
            {/* {this.props.location.query}
            {window.URL} */}
          </h6>
          
          <hr/>
          <form>
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Unidad Observable</label>
            <div>
              <select
                className="form-select"
                id="tipoTaller"
                // onchange= { ()=> this.myFunction()}
                value={this.state.value}
                onChange={this.handleChange}
                required={this.required}
              >

                <option value=''>-</option>
                <option value="marcha">Marcha</option>
                <option value="balanceo">Balanceo</option>
                <option value="postura">Postura</option>

              </select>
              <span style={{ color: "red" }}></span>
            </div>
          </div>
          {/*  */}
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Variable de unidad de observación</label>
            <div>
            <select className="form-select" id= "tipoActividad" value={this.state.value2} onChange={this.handleChange2}
                            >
                    <option value="">-</option>
                    {
                      this.state.options.map((id) => <option value={id} key={id}>{id}</option>)
                    }
                  </select>
              <span style={{ color: "red" }}></span>
            </div>
            </div>

            {/* // */}

            <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Valor</label>
            <div>

            <select
                className="form-select"
                id="tipoValor"
                // onchange= { ()=> this.myFunction()}
                //  value={this.state.value3}
                 onChange={this.handleChange3}
              >
                <option value="">-</option>
                required={this.required}
                {arrayTipoValor &&
                  arrayTipoValor.map((tipoValor, id) => (
                    <option value={tipoValor.name} key={tipoValor.id}>
                      {tipoValor.tipoValor}
                    </option>
                  ))}
              </select>
              <span style={{ color: "red" }}></span>
            </div>
            </div>
          </form>

          {/* <Modal
            id="myModal"
            className="modal-dialog-centered"
            size="sm"
            isOpen={this.state.formModal2}
            toggle={() => this.setState({ setformModal2: true })}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary border-0 mb-0">

                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Fecha </small>
                  </div>

                </CardBody>
              </Card>
            </div>
          </Modal> */}

          <div className="w-100"></div>

          <div className="w-100 pull-right">
            <button
              type="submit"
              className="mb-3 col-3 btn btn-danger col-md-3 col-xl-2"
              style={{ float: "right", margin: 5 }}
              onClick={this.cancelCourse}
            >
              Cancelar
              <span class="glyphicon glyphicon-chevron-right"></span>
            </button>
            <Example nom={path} uo={a} va={b} val={c} dir={di}>
              </Example>
            
            {/* <Button
            color="primary"
            type="button"
            // onClick={(e) => (handleSubmit_1)}
            // onClick={handleSubmit_1}
            onClick={this.handleSubmit}

              onSubmit={this.handleSubmit}
              // type="submit"
              className="mb-3 col-3 btn btn-success col-md-3 col-xl-2 "
              style={{ float: "right", margin: 5 }}
            >
              
              Guardar
              <span class="glyphicon glyphicon-remove-sign"></span>
            </Button> */}
           
          </div>
                   
        </main>
      </form>
    );
  }
}

export default comportamiento;
