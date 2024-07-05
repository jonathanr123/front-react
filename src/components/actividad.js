import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import utils from "../utils/utils";

import { actiRepository } from "../services/actService";
import { tallerRespository } from "../services/tallerService";

const Actividad = () => {
    const [type, setType] = useState('');
    const [act, setActividades] = useState([]);
    const [talleres, setTalleres] = useState([]);

    const [campo, setCampo] = useState({nombreAct: '', idTaller: '', idEditado: ''});

    useEffect(() => {
        getActividades();
        getTalleres();

    }, [])

    // Funcion que obtiene la lista de enfermedades
    const getActividades = async () => {
        let response = await actiRepository.getAll().catch(() => undefined);
        if (response && response.data) {
            setActividades(response.data);
            console.log(response.data);
        } else {
            console.error("Error al obtener las actividades");
        }
    };

    const getTalleres  = async () => {
        let response = await tallerRespository.getAll().catch(() => undefined);
        if (response && response.data) {
            setTalleres(response.data);
            console.log(response.data);
        } else {
            console.error("Error al obtener las actividades");
        }
    };



    // Funcion que guarda el valor de los campos
    const detectarCambio = (e) => {
        const { name, value } = e.target;
        setCampo({...campo, [name]: value});
        console.log('hola4', campo);
    }


    // Funcion que habilita la edicion de un registro de la tabla seleccionada
    const editar = (tipo, info, id) => {
        setType(tipo);

        switch (tipo) {
            case 'actividad':
                setCampo({actividad: info.nombre, idEditado : id});
                break;
           
            default:
                break;
        }
    }

    // Funcion que cancela la edicion de la tabla seleccionada
    const cancelar = () => {
        setType('');
        setCampo({nombreAct: '', idTaller:'', idEditado: ''});
    }

    // Funcion que guarda la edicion de la tabla seleccionada
    const guardar = async (tipo, valortaller) => {
        let nombre = campo[tipo];
        let taller = campo[valortaller];
        let id = campo.idEditado;
        if (nombre !== '') {
            switch (tipo, valortaller){
                case 'nombreAct, idTaller':
                    {
                        const response = await actiRepository.update(id, {nombre}, {taller}).catch(e => console.log(e));
                        if (response) {
                            getActividades();
                            utils.notificacionGuardar();
                        }
                    }                   
                default:
                    break;
            }
            cancelar()
        }
    }

    // Funcion que elimina un registro de la tabla elegida
    const eliminar = async (tipo, valortaller, id) => {
        switch (tipo, valortaller){
            case 'act':
                {
                    const response = await actiRepository.delete(id).catch(e => console.log(e));
                    if (response) {
                        getActividades();
                    }
                }
                break;
            default:
                break;
        }
        cancelar()
    }

    // Funcion que agrega un registro a la tabla elegida
    const cargarNuevo = async (tipo, valortaller) => {
        let nombre = campo[tipo];
        let taller = valortaller;
    console.log(taller)
        if (nombre !== '' && taller !== '') {
            try {
                const response = await actiRepository.create({ nombre, taller });
                if (response) {
                    getActividades();
                    utils.notificacionGuardar();
                }
            } catch (error) {
                console.error("Error al crear la actividad:", error);
            }
            cancelar();
        } else {
            console.error("Error: nombre o idtaller no definido");
        }
    }


        return (
            
                <div className="row">
                    <div className="mt-4 mb-4 col-12 col-md-12 col-lg-4 col-xl-4">
                        <div className="row">
                            <div className="mb-2 col-12 col-md-12 col-lg-12 col-xl-12 input-group">
                                <input type="text" className="form-control" placeholder="actividad nombre..." id="nombreAct" name="nombreAct" onChange={detectarCambio} value={(!campo.nombreAct)? "": campo.nombreAct}/>
                                <input type="text" className="form-control" placeholder="idTaller" id="idTaller" name="idTaller" onChange={detectarCambio} value={(!talleres.idTaller)? "": talleres.idTaller}/>

                                {(type === 'actividad, idTaller') ? (
                                    <span>
                                    <button type="button" className="btn btn-azul-simple" onClick={() => guardar('nombreAct', 'idTaller')}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                    </svg></button>
                                    <button type="button" className="btn btn-rojo-simple" onClick={() => cancelar()}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg></button>
                                    </span>                         
                                ):(
                                    
                                    <button type="button" className="btn btn-azul-simple" onClick={() => cargarNuevo('nombreAct', 'idTaller')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                                    </svg></button>  
                                )}
                            </div>  
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 col-xl-12" style={{position: "relative", maxHeight: "350px", overflow: "auto", display: "block"}}>
                                <table className="table table-bordered table-hover shadow table-striped" style={{width:'100%'}}>
                                    <thead>
                                        <tr>
                                            <th scope="col">nombre Actividad</th>
                                            <th scope="col">idtaller</th>

                                            <th scope="col">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{verticalAlign:'middle'}}>
                                        {act &&
                                            act.map((act, index) => (
                                                <tr key={index}>
                                                    <td>{act.nombre}</td>
                                                    <td>{act.idtaller}</td>

                                                    <td>
                                                        <button type="button" className="btn btn-verde" style={{marginRight:10}} onClick={() => editar('act', {nombre: act.nombre}, act.idactividad)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                        </svg></button>
                                                        <button type="button" className="btn btn-rojo" onClick={() => utils.notificacionEliminar("act", act.idactividad, eliminar)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                        </svg></button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                                       
                </div>
        )
}

export default (Actividad);