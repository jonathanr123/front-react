// import React from 'react';
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';

import React, {useState, useEffect} from "react";

// reactstrap components
import {
  CardHeader,
  UncontrolledTooltip,
  Table,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
// import { RepositoryFactory } from "repositories/RepositoryFactory";
// const userRepository = RepositoryFactory.get('user');

// const { SearchBar } = Search;


function Taller() {

  const [alert, setAlert] = React.useState(null);
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    // let data =  await userRepository.getUsers()
    // setUsers(data)
    return
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <Container className="mt--0 border-top-sm m-0 row justify-content-center form-paciente m-md-3 
                rounded shadow container-lg mx-md-auto" >
        <row>
          <Col className="order-xl-1" xl="13">
            <CardHeader className=" ">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0 mt-1">Taller</h3>
                </Col>
                
              </Row>
            </CardHeader>

            <Row>
                  <Col md="13" className="text-center">
                  <Button
                      block
                      color="primary"
                        type="button"
                     onClick={(e) => window.location.href = "./addTaller"}
                      style={{marginBottom: 10 , marginTop:10 , textAlign:'center'}}
                    >
                      Agregar Taller
                    </Button>
                    </Col>
                    <Col md="13" className="text-center">
                    <Button
                      block
                      color="primary"
                    // class="btn btn-primary mb1 bg-green"
                        type="button"
                     onClick={(e) => window.location.href = "./iniciarTaller"}
                      style={{marginBottom: 10 , marginTop:10 , textAlign:'center'}}
                    >
                      Iniciar Taller
                    </Button>
                    </Col>
                    <Col md="13" className="text-center">
                    {/* <Button
                      block
                      color="primary"
                        type="button"
                        onClick={(e) => window.location.href = "./editTaller"}
                        style={{marginBottom: 10 , marginTop:10 , textAlign:'center'}}
                    >
                      Editar Taller
                    </Button> */}
                    </Col>
                    </Row>

            {/* <Col xs={12} sm={6}>
              <div
                id="datatable-basic_filter"
                className="dataTables_filter px-9 pb-1 float-left "
              >
                <label>
                  Search:
                  <SearchBar
                    className="form-control-sm"
                  // placeholder=""
                  // {...props.searchProps}
                  />
                </label>
              </div>
            </Col> */}
          </Col>
          <div className="pl-lg-3 bg-white  ">
            
          </div>
        </row>
      </Container>
    </>
  );
}


export default Taller;