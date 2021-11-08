// import React from 'react';
// import Swal from 'sweetalert2';
// import {Redirect} from 'react-router-dom';

import React, {useState, useEffect} from "react";

// // reactstrap components
// import {
//   CardHeader,
//   UncontrolledTooltip,
//   Table,
//   Container,
//   Button,
//   Row,
//   Col,
// } from "reactstrap";
// import { RepositoryFactory } from "repositories/RepositoryFactory";
// const userRepository = RepositoryFactory.get('user');

// const { SearchBar } = Search;

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  input,
  FormGroup,
  label,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

function addTaller2() {
  return (
    <>
    <div className="p-0">
                        <Card className="bg-info border-0 mb-0 opacity-25" >
                          <CardHeader className="bg-transparent pb-1">
                            <div className="text text-center mt-2 mb-3">
                              <large>Agregar Taller2</large>
                            </div>
                          </CardHeader>
                          <CardBody className="px-lg-5 py-lg-8">
                            {/* <div className="text-center text-muted mb-6">
                              <large>Fecha de Taller</large>
                            </div> */}
                            <Form role="form">
                              <FormGroup>
                              <label class="col-xs-2" for="nombre">Fecha Taller:</label>
      {/* <div class="col-xs-4">
      <Input class="form-control" id="nombre" name="nombre" type="text" placeholder="Nombre"/>
      </div> */}
                                <InputGroup className="input-group-merge input-group-alternative mx-2 my-3 mb-3">
                                  <InputGroupAddon addonType="prepend">
                                      <i className="ni ni-calendar-grid-58" />
                                  </InputGroupAddon>
                                  <div class="col-sm-4 text-center">
                                  <Input 
                                    placeholder="Fecha"
                                    type="date"

                                  />
                                  </div>
                                </InputGroup>
                              </FormGroup>

                              <div className="text-center text-muted mb-3">
                              <large>Tipo de Taller</large>
                            </div>
                              <FormGroup>
                                <InputGroup className=" text-center input-group mb-3 ">
                                  <select class="custom-select" id="inputGroupSelect01">
                                    <option selected>Seleccionar...</option>
                                    <option value="1">Educación Fisica</option>
                                    <option value="2">Danza</option>
                                    <option value="3">Arte</option>
                                  </select>                                  
                                </InputGroup>
                              </FormGroup>



                              <div className="text-center text-muted mb-4">
                              <large>Actividades:</large>
                            </div>
                              <FormGroup                                
                              >

                                <div className="mb-1 mx-3  d-flex justify-content-between justify-content-md-around col-12 col-md-2 mx-md-0">
                                    <div className="form-check">
                                      <input className="form-check-input " type="checkbox" value="" id="vive_solo" />
                                    </div>
                                    <label htmlFor="vive_solo">Caminata</label>
                                </div>
                                <div className="mb-1 mx-3  d-flex justify-content-between justify-content-md-around col-12 col-md-2 mx-md-0">
                                    <div className="form-check">
                                      <input className="form-check-input " type="checkbox" value="" id="vive_solo" />
                                    </div>
                                    <label htmlFor="vive_solo">Caminata + Objeto</label>
                                </div>
                                <div className="mb-1 mx-3  d-flex justify-content-between justify-content-md-around col-12 col-md-2 mx-md-0">
                                    <div className="form-check">
                                      <input className="form-check-input " type="checkbox" value="" id="vive_solo" />
                                    </div>
                                    <label htmlFor="vive_solo">Cantar</label>
                                </div>
                                <div className="mb-1 mx-3  d-flex justify-content-between justify-content-md-around col-12 col-md-2 mx-md-0">
                                    <div className="form-check">
                                      <input className="form-check-input " type="checkbox" value="" id="vive_solo" />
                                    </div>
                                    <label htmlFor="vive_solo">Bailar</label>
                                </div>


                              </FormGroup>
                             
                            
                              <div className="text-center">
                                <Button
                                  className="my-4"
                                  color="primary"
                                  type="button"
                                >
                                  Guardar
                                </Button>
                              </div>
                              <div className="text-center">
                                <Button
                                  className="my-4"
                                  color="danger"
                                  type="button"
                                  // onClick={() =>}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </Form>
                          </CardBody>
                        </Card>
                      </div>
        </>

    );
}


export default addTaller2;