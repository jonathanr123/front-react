
import React, { Component } from "react";
import { Row,
  Col,
  Button
} from "reactstrap";

class iniciarTaller extends Component {
  constructor(props) {
      super(props);
      this.listRef = React.createRef();
  }
   render() {

      
      
      return (
          <form>
              <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 
              rounded shadow container-lg mx-md-auto">
                   <Col className="float-right" xs="14"  style={{ marginTop: 10 , marginBottom:0}}  >
                  <Button
                    color="primary"
                    onClick={(e) => window.location.href = "/taller"}
                    size="sm"
                  >
                    Volver A Menu 
                  </Button>
                </Col>
                  <h1 className="mt-0 mt-md-0 text-center" > Iniciar Taller</h1>
                  
                  {/* <h6 className=" mt-2 text-center heading-small text-muted">Datos del taller</h6> */}
                 
                  <hr />
                  <div className="w-100"></div>
                    <Button  className="mb-3 col-6 btn btn-info col-md-3 col-xl-2" 
                      onClick={(e) => window.location.href = "/asistencia"}
                      > Asistencia
                    </Button>
                    <div className="w-100"></div>
                    <Button  className="mb-3 col-6 btn btn-info col-md-3 col-xl-2" 
                      onClick={(e) => window.location.href = "/addComportamiento"} >Comportamiento</Button>
                

                 </main>
                 </form>

      );
}
}


export default iniciarTaller;