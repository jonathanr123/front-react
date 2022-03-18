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

  function addComportamiento() {

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
                    <h3 className="mb-0">Comportamiento</h3>
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
                      visible: false
                    },
                    {
                      dataField: "position",
                      text: "Apellido",
                      sort: true,
                    },
                    { dataField: "button",
                    sort: true,
                    text: "Comportamiento",
                       
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
                          Buscar Paciente : 
                          <SearchBar
                            className="form-control-sm"
                            placeholder="Buscar"
                            srText=""
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
                </Container>
                </>
  );
}
                export default addComportamiento;