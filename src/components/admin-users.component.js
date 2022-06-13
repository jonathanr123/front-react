import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/list-pacientesEp.css"
import { userRepository } from "../services/users.service";

class AdminUsuarios extends Component {

    constructor(props) {
        super(props);
        // Defino los estados locales 
        this.state = {
            show:false,
            campo: {
                buscador:'',
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
        console.log(campo);

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
            return "Administrador"
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

    editUser(user){
        this.setState({
            show:true,
            campo:{
                buscador:'',
                username:user.username,
                firstname:user.first_name,
                lastname:user.last_name,
                role: user.is_superuser,
                isActive: user.is_active
            }
        })
    }

    guardar(){
        let data = {}
        if(this.state.campo.password === ''){
            data ={
                user:this.state.campo.username,
                first_name:this.state.campo.firstname,
                last_name:this.state.campo.lastname,
                is_superuser: (this.state.campo.role === 'true') ? true : false,
                is_active: (this.state.campo.isActive === 'true') ? true : false
            }
        }else{
            data ={
                user:this.state.campo.username,
                first_name:this.state.campo.firstname,
                last_name:this.state.campo.lastname,
                password:this.state.campo.password,
                is_superuser: (this.state.campo.role === 'true') ? true : false,
                is_active: (this.state.campo.isActive === 'true') ? true : false
            }
        }
        
        userRepository.updateUser(data).then(response => {
            if (response) {
                console.log(response.data);
                this.clear();
                this.getUsers();
            }
        });
        
    }

    clear(){
        this.setState({show:false, campo:{buscador:'', password:'', username:'', firstname:'', lastname:'', role:'', isActive:''}})
    }


    render() {
            
            
            const { usuarios, show }= this.state;
            console.log(usuarios);
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

                {show ? (
                <div className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto">
                    <h4 className="mt-4">Editar Usuario</h4>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Nombre de Usuario</label>
                        <input type="text" disabled="true" className="form-control" placeholder="Nombre de usuario..." id="username" onChange={this.detectarCambio.bind(this, "username")} value={this.state.campo["username"] || ''}/>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder="Nombre..." id="firstname" onChange={this.detectarCambio.bind(this, "firstname")} value={this.state.campo["firstname"] || ''}/>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Apellido</label>
                        <input type="text" className="form-control" placeholder="Apellido..." id="lastname" onChange={this.detectarCambio.bind(this, "lastname")} value={this.state.campo["lastname"] || ''}/>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Nueva Contraseña</label>
                        <input type="text" className="form-control" placeholder="Contraseña..." id="password" onChange={this.detectarCambio.bind(this, "password")} value={this.state.campo["password"] || ''}/>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Rol</label>
                        <select className="form-select" placeholder="Ingrese enfermedad..." id="role" onChange={this.detectarCambio.bind(this, "role")} value={this.state.campo["role"] || ''}>
                                <option value="false">Usuario</option>
                                <option value="true">Administrador</option>
                        </select>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4">
                        <label className="col-form-label">Estado</label>
                        <select className="form-select" placeholder="Ingrese enfermedad..." id="isActive" onChange={this.detectarCambio.bind(this, "isActive")} value={this.state.campo["isActive"] || ''}>
                                <option value="false">Inactivo</option>
                                <option value="true">Activo</option>
                        </select>
                    </div>
                    <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4" style={{textAlign:'center', paddingTop:38}}>
                        <button type="submit" className="btn btn-verde" style={{width:'40%'}} onClick={() => this.guardar()}>Guardar</button>
                        <button type="submit" className="btn btn-rojo" style={{width:'40%', marginLeft:10}} onClick={() => this.clear()}>Cancelar</button>
                    </div>
                </div>
                ):('')}
                
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
                                        <button type="button" className="btn btn-verde" style={{marginRight:10}} onClick={() => this.editUser(usuario)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg></button>
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