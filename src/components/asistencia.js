import React from "react";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from 'react-bootstrap-table-next';


// reactstrap components
import {
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  input,
  Button,
  label,
} from "reactstrap";

import  dataTable  from "./general";

const { SearchBar } = Search;
function asistencia() {

  return (
    <>
      <Container className="mt--0" >
        <row>
          <Col className="order-xl-1" xl="13">
            <CardHeader>
            <Col className="float-right" xs="14"  style={{ marginTop: 10 , marginBottom:0}}  >
                    <Button
                      color="primary"
                      onClick={(e) => window.location.href = "/iniciarTaller"}
                      size="sm"
                    >
                      Volver Atrás
                    </Button>
                  </Col>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Asistencia</h3>
                </Col>
              </Row>
            </CardHeader>
          </Col>


          <ToolkitProvider
                data={dataTable}
                keyField="name"
                columns={[
                  {
                    dataField: "name",
                    text: "nombre",
                    sort: true,
                  },
                  {
                    dataField: "position",
                    text: "Apellido",
                    sort: true,
                  },
                  { dataField: "manual",
                  sort: true,
                  text: "Presente",
                      render: function (data,type,row) {
                          if (data === true) {
                            return '<input type="checkbox" checked>';
                          } else {
                            return '<input type="checkbox">';
                          }
                        return data;
                      }
                    },

                ]}
                search
              >
                  {(props) => (
                  <div className="py-4 table-responsive">
                    <div
                      id="datatable-basic_filter"
                      className="dataTables_filter px-4 pb-1"
                    >
                      <label>
                        Buscar Paciente:
                        <SearchBar
                          className="form-control-sm"
                          placeholder="Buscar"
                          text=""
                          {...props.searchProps}
                        />
                      </label>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      bootstrap4={true}
                      bordered={false}
                    />
                  </div>
                )}
              </ToolkitProvider>

        </row>
        <div className="w-100 pull-right">
                  <button type="submit" className="mb-3 col-3 btn btn-danger col-md-3 col-xl-2"
                  style={{ float: "right" , margin: 5 }} >Cancelar
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    </button>
                    <button type="submit" className="mb-3 col-3 btn btn-success col-md-3 col-xl-2 "
                     style={{ float: "right", margin: 5  }}>Guardar
                    <span class="glyphicon glyphicon-remove-sign"></span>
                    </button>

                    </div>
      </Container>
    </>
  );
}

export default asistencia;