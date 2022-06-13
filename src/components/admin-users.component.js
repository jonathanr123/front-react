import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/list-pacientesEp.css"
import { userRepository } from "../services/users.service";

class AdminUsuarios extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales 
        this.state = {
            campo: {
                buscador:''
            }
        }
    }

    componentDidMount() {
        this.getUsers();
        //La linea de abajo servirá para que la lista se actualicé en tiempo real
        //setInterval(() => {this.getUsers()}, 3000);
    }

    detectarCambio(field, e) {

        let campo = this.state.campo;
        campo[field] = e.target.value;

        // Cambio de estado de campo 
        this.setState({
            campo
        });

    }

    getUsers = async () => {
                    let response = await userRepository.getUsers();
            
                    if (response) {
                        console.log(response.data);
                        this.setState({ usuarios: response.data })
                    }
                };


    convertRole(role) {
        if (role === true) {
            return "Super Usuario"
        } else {
            return "Usuario"
        }
    }
            
    convertStateUser(state) {
        if (state === true) {
            return "Activo"
        } else {
            return "Inactivo"
        }
    }


    render() {
            
            
            const { usuarios }= this.state;
            console.log(usuarios+"trolo");
        return (
            <main className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto" style={{paddingTop:20}}>
                <div className="mb-4 col-12 col-md-9 col-lg-12 col-xl-10">
                    <h3 className="mt-4">Administrar Usuarios</h3>
                <hr />
                <div className="row">
                    <div className="mb-4 col-10 col-md-10 col-lg-6 col-xl-6" style={{marginBottom:"10px"}}>
                        <input type="search" className="form-control" placeholder="Buscar" id="buscador" aria-describedby="buscador" onChange={this.detectarCambio.bind(this, "buscador")} value={this.state.campo["buscador"] || ''}/>
                    </div>
                    <div className="mb-4 col-2 col-md-2 col-lg-6 col-xl-6" style={{paddingLeft:"0px"}}>
                        <button type="button" className="btn btn-verde" onClick={()=>this.buscar()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg></button>
                    </div>
                </div>
                
                <div className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12" style={{position: "relative", height: "350px", overflow: "auto", display: "block"}}>
                <table className="table table-bordered table-hover shadow" style={{width:'100%'}}>
                <thead>
                    <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre Completo</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody style={{verticalAlign:'middle'}}>
                    
                       {usuarios &&
                                    usuarios.filter(usuario=>usuario.username.toLowerCase().includes(this.state.campo.buscador)||usuario.name.toLowerCase().includes(this.state.campo.buscador)||usuario.username.toUpperCase().includes(this.state.campo.buscador)||usuario.name.toUpperCase().includes(this.state.campo.buscador)).map((usuario, index) => (
                                        <tr key={index}>
                                        <td>{usuario.username}</td>
                                        <td>{usuario.name}</td>
                                        <td>{this.convertRole(usuario.is_superuser)}</td>
                                        <td>{this.convertStateUser(usuario.is_active)}</td>

                                        <td>
                                        </td>
                                        
                                        </tr>
                                    ))}
                </tbody>
                </table>
                </div>
                </div>
                </div>

                
            </main>
        )
    }
}


export default (AdminUsuarios);