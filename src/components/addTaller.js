
import React, { Component } from "react";
import { Row,
  Col,
  Button
} from "reactstrap";

class addTaller extends Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }
     render() {

        const arrayTiposTaller= [
            {id:1,tipoTaller:'Educacion Física'},{id:2,tipoTaller:'Danza'},
            {id:3,tipoTaller:'Literatura'}];
        
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
                    <h1 className="mt-0 mt-md-0 text-center" > Agregar Taller</h1>
                    
                    <h6 className=" mt-2 text-center heading-small text-muted">Datos del taller</h6>
                   
                    <hr />
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className=" col-form-label">Fecha de Taller</label>
                        <input type="date" className="form-control" placeholder="Fecha" 
                        id="fechaA"/>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className="col-form-label">Tipo Taller</label>
                        <div>
                            <select className="form-select" id="tipoTaller"
                            >
                                <option value="">-</option>
                                {arrayTiposTaller &&
                                    arrayTiposTaller.map((tipoTaller, index) => (
                                        <option
                                            value={tipoTaller.tipoTaller}
                                            key={index}
                                            >
                                            {tipoTaller.tipoTaller}
                                        </option>
                                    ))}
                            </select>
                            <span style={{ color: "red" }}></span>
                        </div>
                    </div>

                    <div className="w-100"></div>

                    <div className="mb-4 mx-3  d-flex justify-content-between justify-content-md-around col-0 col-md-1 mx-md-3">
                    <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="Caminata" />
                        </div>
                        <label htmlFor="Caminata">Caminata Libre</label>
                        
                    </div>
                    <div className="mb-4 mx-3 d-flex justify-content-between justify-content-md-around col-0 col-md-1 mx-md-3">
                    <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="CaminataPelota" />
                        </div>
                        <label htmlFor="CaminataPelota">Caminata con Objeto</label>
                        
                    </div>

                   

                    <div className="mb-4 mx-3  d-flex justify-content-between justify-content-md-around col-0 col-md-2 mx-md-3">
                    <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="CaminataMarcas" />
                        </div>
                        <label htmlFor="CaminataMarcas">Caminata con marcas</label>
                        
                    </div>
                    <div className="mb-3 mx-3 d-flex justify-content-between justify-content-md-around col-0 col-md-1 mx-md-3">
                    <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="Cantar" />
                        </div>
                        <label htmlFor="Cantar">Cantar</label>
                    </div>
                    <div className="mb-3 mx-3 d-flex justify-content-between justify-content-md-around col-0 col-md-1 mx-md-3">
                    <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="Basketball" />
                        </div>
                        <label htmlFor="Cantar">Basketball</label>
                    </div>
                    <div className="mb-3 mx-3 d-flex justify-content-between justify-content-md-around col-0 col-md-1 mx-md-3">
                    <div className="form-check">
                            <input className="form-check-input " type="checkbox" value="" id="Lectura" />
                        </div>
                        <label htmlFor="Cantar">Lectura</label>
                    </div>
                  

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

                   </main>
                   </form>

        );
}
}
export default (addTaller);
//  connect(mapStateToProps, { createPersona, createPersonaEp, createDireccion, retrieveLocalidades, retrieveMunicipios })(AddPaciente);
