import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayPerson: [
        { id: 1, name: 'juan', lastName: 'ortega' },
        { id: 2, name: 'Asmael', lastName: 'santos' },
      ],
      name: '',
      lastName: '',
      searchArrayperson: [],
    }
    this.buscarName = this.buscarName.bind(this);
    this.buscarLastName = this.buscarLastName.bind(this);
  }
  componentDidMount() {
    this.setState({ searchArrayperson: this.state.arrayPerson })
  }
  eliminar(id) {
    let arrayPersonas = this.state.arrayPerson.filter(function (person) {
      return person.id !== (id)
    });
    this.setState({ arrayPerson: arrayPersonas })
    this.setState({ searchArrayperson: this.state.arrayPerson })
  }
  buscar() {
    let name = this.state.name
    let lastName = this.state.lastName
    let arrayPersonas = this.state.searchArrayperson.filter(function (person) {
      return person.name.includes(name) || person.lastName.includes(lastName)
    });
    this.setState({ searchArrayperson: arrayPersonas })
  }
  buscarName(event) {
    this.setState({
      name: event.target.value
    })
  }
  buscarLastName(event) {
    this.setState({
      lastName: event.target.value
    })
  }
  render() {
    const arrayPersonas = this.state.searchArrayperson;
    console.log(this.state.searchArrayperson);
    return (
      <main className="border-top-sm m-0 row justify-content-center m-md-3 rounded shadow container-lg mx-md-auto">
        <div className="mt-1 mb-2">
          <label id="name" htmlFor="" className="me-1" >Nombre</label>
          <input type="text" name="name" id="name" onChange={this.buscarName} />
        </div>
        <div>
          <label id="lastName" htmlFor="" className="me-1">Apellido</label>
          <input type="text" name="lastName" id="lastName" onChange={this.buscarLastName} />
          <button type="button" className="btn btn-success col ms-3" onClick={() => this.buscar()}>Confirmar</button>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {arrayPersonas &&
                arrayPersonas.map((person) => (
                  <tr key={person.id}>
                    <th scope="row">{person.id}</th>
                    <td>{person.name}</td>
                    <td>{person.lastName}</td>
                    <td>
                      <button type="button" className="btn btn-success me-1">Editar</button>
                      <button type="button" className="btn btn-danger" onClick={() => this.eliminar(person.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main >
    )
  }
}
export default Search;