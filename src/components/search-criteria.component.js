import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      show:false,
      showNuevo:false,
      namePerson:'',
      lastNamePerson:'',
      arrayPerson: [
        {id:1,name:'juan',lastName:'asdsa'},
        {id:2,name:'Asma',lastName:'asdads'},
      ],

      campo:{
        name:'',
        lastName:''
        }
    }
  }
  eliminar(index){
    const arrayPersonas=this.state.arrayPerson.filter(person=>person.id!==(index));
    this.setState({arrayPerson:arrayPersonas, show:false})
}
    render() {
      const {arrayEnfermedades}=this.state;
      const paciente='Hernan Gutierrez';
      const {show, showNuevo}=this.state;
        return (
            <main className="border-top-sm m-0 row justify-content-center m-md-3 rounded shadow container-lg mx-md-auto">
                <div class="mt-1 mb-2">
                    <label id="name" htmlFor="" class="me-1">Nombre</label>
                    <input type="text" name="" id="name" />
                </div>
                <div>
                    <label id="lastName" htmlFor="" class="me-1">Apellido</label>
                    <input type="text" name="" id="lastName" />                  
                <button type="button" class="btn btn-success col ms-3">Confirmar</button>
                </div>
                <div>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    <tr>
                    <td></td>
                    <td></td>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>
                        <button type="button" class="btn btn-success me-1">Editar</button>
                        <button type="button" class="btn btn-danger" onClick={() => this.eliminar(1)}>Eliminar</button>
                    </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>
                        <button type="button" class="btn btn-success me-1">Editar</button>
                        <button type="button" class="btn btn-danger">Eliminar</button>
                    </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>
                        <button type="button" class="btn btn-success me-1">Editar</button>
                        <button type="button" class="btn btn-danger">Eliminar</button>
                    </td>
                    </tr>
                  </tbody>
                </table>
                </div>
            </main>
        )
    }
}
export default Search;