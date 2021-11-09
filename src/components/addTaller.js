
import React, { Component } from "react";
import { Row,
  Col,
  Button
} from "reactstrap";

class addTaller extends Component {
    constructor(props) {
        // super(props);
        // this.listRef = React.createRef();
        super(props);
    this.state = {
      value: '',
      value2: '',
      options: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {

        let data= {
            'educacionFisica': ['Basketball', 'Caminata', 'Otra'] ,
             'danza': ['Baile', 'Canto' , 'otro'] ,
            'literario': ['Lectura', 'Escritura', 'otro']
          }
           console.log(data[event.target.value])
            this.setState({
              options: data[event.target.value],
              value: event.target.value
            });
        // const options = event.target.value === 'educacionFisica' ? ['Basketball', 'Caminata', 'Otra'] : 'danza' ? ['Baile', 'Canto'] : 'literario'['1' ,'2','3'] ;
        // console.log(options)
        //   this.setState({
        //     options,
        //     value: event.target.value
        //   });
      }
      
      handleChange2(event) {
        this.setState({value2: event.target.value});
        console.log(event.target.value.select)

      }
    
    
      handleSubmit(event) {
        event.preventDefault();
        alert(`${this.state.value} ${this.state.value2}`);
      }

     render() {

        // const arrayTiposTaller= [
        //     {id:1,tipoTaller:'Educacion Física'},{id:2,tipoTaller:'Danza'},
        //     {id:3,tipoTaller:'Literatura'}];
        
        return (
            
            <form>
            
{/* /// acá            */}
                
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
                    <div className="mb-3 col-12 col-md-6 col-lg-4 col-xl-3">
                        <label className=" col-form-label">Fecha de Taller</label>
                        <input type="date" className="form-control" placeholder="Fecha" 
                        id="fechaA" required/>
                    </div>
            <div className="mb-2 col-9 col-md-6 col-lg-4 col-xl-3">
                    <label className="col-form-label">Tipo Taller         
                        </label>
                <select className="form-select " value={this.state.value} onChange={this.handleChange} required>
                <option value=''>Seleccionar una opción</option>
                <option value="educacionFisica">Educación Física</option>
                <option value="danza">Danza</option>
                <option value="literario">Leterario</option>
              </select>
              </div>
              <div className="mb-2 col-12 col-md-6 col-lg-4 col-xl-3">
              <label className="col-form-label"> Tipo Actividad         
                        </label>
              <select className="form-select" value={this.state.value2} onChange={this.handleChange2} required>
                <option value=''>Seleccionar Actividad</option>
                {
                  this.state.options.map((item, index) => <option value={item} key={index}>{item}</option>)
                }
              </select>
              </div>
            
          

                  <div className="w-100 pull-right">
                  <button type="submit" className="mb-3 col-3 btn btn-danger col-md-3 col-xl-2" 
                  style={{ float: "right" , margin: 5 }} onClick={this.handleSubmit} >Cancelar
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    </button>
                    <button type="submit" className="mb-3 col-3 btn btn-success col-md-3 col-xl-2 " 
                     style={{ float: "right", margin: 5  }}
                     onClick={this.handleSubmit} >Guardar 
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
