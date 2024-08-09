import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import { encuentroRepository } from "../services/encuentroService";
import { tallerRespository } from "../services/tallerService";
import { actiRepository } from "../services/actService";
import { actividadRealizadaRepository } from "../services/actividadRealizadaService";

import Swal from "sweetalert2";
import utils from "../utils/utils";


const Encuentro = () => {

  const [taller, setTaller] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [actividadesF, setActividadesF] = useState([]); //estado para las actividades basadas en el idtaller seleccionado (taller en específico)

  //const [editIndex, setEditIndex] = useState(-1);
  const [encuentro, setEncuentro] = useState([]);
  //const [isEditing, setIsEditing] = useState("");
  const [isVirtual, setIsVirtual] = useState(1); // Estado para controlar si el checkbox está marcado o no

  const [form, setForm] = useState({
    idencuentro: 0,
    idtaller: 0,
    nombreTaller: "",
    fecha: "",
    virtual: 1,
    //selectedTypeTaller: -1,
  });

  const [idEditado, setIdEditado] = useState('');
  const [actividadesRealizadasIds, setActividadesRealizadasIds] = useState([]);

  const [modalInsert, setModalInsert] = useState(false); // showNuevo ---> SetShowNuevo 
  const [modalEdit, setModalEdit] = useState(false); // show ---> setShow
  const [editActivities, setEditActivities] = useState([]); // Estado para almacenar las actividades seleccionadas para el encuentro en edición


  const [editIndex, setEditIndex] = useState(-1); // Estado para almacenar el índice del encuentro que se está editando


  useEffect(() => {
    getEncuentroAll();
    getTallerAll();
    getActividadAll();

  }, []);

  // Función que obtiene la lista de encuentros
  const getEncuentroAll = async () => {
    const response = await encuentroRepository.getEncuentroAll();
    if (response) {
      setEncuentro(response.data);
      console.log("todos los encuentros", response)
    } else {
      console.error("Error al obtener los encuentros");
    }
  };


  // Función que obtiene la lista de talleres
  const getTallerAll = async () => {
    const response = await tallerRespository.getTallerAll();
    if (response) {
      setTaller(response.data);
      console.log("todos los talleres", response)

    } else {
      console.error("Error al obtener los talleres");
    }
  };


  // Función que obtiene la lista de actividades
  const getActividadAll = async () => {
    const response = await actiRepository.getAll();
    if (response) {
      setActividad(response.data);
      console.log("todas las actividades", response)
    } else {
      console.error("Error al obtener las actividades");
    }
  };


  const handleChange = (e) => {
    if (e.target.id === 'virtual') {
      setForm({
        ...form,
        [e.target.name]: e.target.checked,
      });

    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }

    // Verificar si el campo modificado es el nombre del taller
    if (e.target.name === 'nombreTaller') {
      // Obtener el idtaller seleccionado

      const idTallerSeleccionado = e.target.value;
      console.log("id del taller para traer las actividades", idTallerSeleccionado);
      console.log("todas las actividades", actividad);


      // Filtrar las actividades basadas en el idtaller seleccionado
      const actividadesFiltradas = actividad.filter(item => item.idtaller === parseInt(idTallerSeleccionado));

      // Actualizar el estado de las actividades con las actividades filtradas
      setActividadesF(actividadesFiltradas);
      console.log("actividades del taller seleccionado", actividadesFiltradas);

    }

    console.log(e.target.value, ",", form.idtaller, ",", form.fecha, ",", form.nombreTaller);

  };


  /** manejador de estados de los checkboxes para crear */
  const handleActividadCheck = (index) => {
    const updatedActividades = [...actividadesF];
    updatedActividades[index].checked = !updatedActividades[index].checked;
    setActividadesF(updatedActividades);

    console.log("actividades marcadas", actividadesF);
  };

  /** manejador de estados de los checkboxes para editar */
  const handleActividadCheckEdit = (index) => {
    const updatedActividades = [...editActivities];
    updatedActividades[index].checked = !updatedActividades[index].checked;
    setEditActivities(updatedActividades);

    console.log("actividades marcadas en el editar", updatedActividades);
  };

  const handleChangeVirtual = (e) => {
    // Manejar el cambio de estado del checkbox
    setIsVirtual(e.target.checked ? 1 : 0); // Guarda 1 si está marcado, 0 si está desmarcado
    console.log("es virtual o no", isVirtual);
  };

  //guarda en la tabla actividadrealizada el par idencuentro-idactividad
  const guardarActividadesSeleccionadas = (idEncuentro) => {

    const actividadesSeleccionadas = actividadesF.filter(actividad => actividad.checked);
    const actividadesToSave = actividadesSeleccionadas.map(actividad => ({
      idencuentro: idEncuentro,
      idactividad: actividad.idactividad // Asumiendo que cada actividad tiene una propiedad `id`
    }));

    console.log("entro en guardarActividadesSeleccionadas", actividadesToSave);

    actividadesToSave.forEach(actividad => {
      actividadRealizadaRepository.create(actividad)
        .then(response => {
          if (response) {
            console.log('Actividad guardada:', actividad);
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
    
  };


  const guardarNuevo = () => {
    let idTaller = form.nombreTaller;
    let fechaTaller = form.fecha;
    let virtual = form.virtual; //ver cual es la diferencia entre isVirtual donde se guarda lo de la virtualidad

    console.log("mentira", ",", form.idtaller, ",", fechaTaller, ",", form.fecha)

    if (idTaller !== '' & fechaTaller !== '' & virtual !== '') {
      let data = {
        fecha: fechaTaller,
        idtaller: idTaller,
        virtual: isVirtual, //y si pongo form.virtual que pasa?, es lo mismo?
      };

      encuentroRepository.createEncuentro(data).then(response => {
        if (response) {
          // Obtener el id del encuentro creado
          const idEncuentro = response.data.idencuentro; // Asegúrate de que este es el camino correcto para obtener el id
          console.log("id del encuentro", idEncuentro);
          // Guardar las actividades seleccionadas
          guardarActividadesSeleccionadas(idEncuentro);
          getEncuentroAll();
          notificacionExito();
        }
      })
        .catch((e) => {
          console.log(e);
        });
      setForm({ nombreTaller: '', fecha: '', isVirtual });
      setModalInsert(false);
    };
  }

  //edita un encuentro
  const guardarEdición = async () => { 

    // Actualizar el encuentro en la tabla `encuentro`
    let idTaller = form.nombreTaller;
    let fechaTaller = form.fecha;
    //let id = idEditado;
    let virtual = isVirtual;

    try {
      // Actualizar los detalles del encuentro
      if (virtual !== "") {
        const updatedEncuentro = {
          virtual: virtual,
          fecha: fechaTaller,

          idtaller: idTaller
        }
        console.log("datos para editar", form.idencuentro, updatedEncuentro);

        await encuentroRepository.updateEncuentro(form.idencuentro, updatedEncuentro);
        console.log("Encuentro actualizado con éxito");

        // Elimina las actividades realizadas existentes antes de agregar las nuevas
      console.log("los id de las actividades realizaas", actividadesRealizadasIds );
        await Promise.all(actividadesRealizadasIds.map(id => actividadRealizadaRepository.delete(id)));

        // Obtener las actividades seleccionadas para despues guardarlas
        const actividadesSeleccionadas = editActivities.filter(actividad => actividad.checked);
        const actividadesToSave = actividadesSeleccionadas.map(actividad => ({
          idencuentro: form.idencuentro,
          idactividad: actividad.idactividad // Asegurando que `idactividad` es la propiedad correcta
        }));
        console.log("Actividades a guardar:", actividadesToSave);

        // Guardar las actividades seleccionadas
        actividadesToSave.forEach(actividad => {
          actividadRealizadaRepository.create(actividad)
            .then(response => {
              if (response) {
                console.log('Actividad guardada:', actividad);
              }
            })
            .catch(e => {
              console.log(e);
            });
        });
      }
      getEncuentroAll();
      notificacionExito();
      // Cierra el modal de edición
      setModalEdit(false);
    } catch (error) {
      console.log("Error al actualizar el encuentro y las actividades", error);

    }


  };


  //notificaciones
  const notificacionExito = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Se ha guardado con éxito",
    });

  }


  const notificacionError = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "Error: Hubo un problema en la carga.",
    });
  }

  //////////////////////////
  const showModalInsert = () => {
    setModalInsert(true);
  };

  const handleModalInsert = () => {
    setModalInsert(false);
  };


  //al editar un taller en especifico muestra sus valores 
  const showModalEdit = async (data) => {
    setModalEdit(true);   //abre el modal de edición
    setForm({ //carga los datos del encuentro seleccionado en el formulario de edición
      idencuentro: data.idencuentro,
      fecha: data.fecha,
      virtual: data.virtual,
      nombreTaller: data.idtaller
    });

    const idTallerSeleccionado = data.idtaller;
    console.log("id del taller para traer las actividades", idTallerSeleccionado);
    console.log("todas las actividades", actividad);

    try {
      const response = await actividadRealizadaRepository.get(data.idencuentro);

      // Obtener las actividades filtradas basadas en el idtaller seleccionado
      const actividadesFiltradas = actividad.filter(item => item.idtaller === parseInt(idTallerSeleccionado));
      console.log("actividades del taller", actividadesFiltradas);
      console.log("actividades marcadas", response);

     

      // Modificar editActivities para incluir el estado inicial de cada actividad, es decir me muestra las actividades que marqué cuando creé un ecuentro 
      const actividadesConEstadoInicial = actividadesFiltradas.map(actividad => ({
        ...actividad,
        checked: response.data.some(realizada => realizada.idactividad === actividad.idactividad) // Marcar si está en response
      }));
      console.log("muestras todas las actividades pero solo marca las elegidas ", actividadesConEstadoInicial);
      setEditActivities(actividadesConEstadoInicial);

    } catch (error) {
      console.error("Error al obtener las actividades del encuentro:", error);
    }
  }


  const handleModalEdit = () => {
    setModalEdit(false);
  };


  // Función que obtiene para eliminar un taller
  const deleteEncuentro = async (data) => {
    let modifidedEncuentro = {
      borrado: 1,
      fecha: data.fecha,
      idtaller: data.idTaller,
    }
    await encuentroRepository.updateTaller(data.idtaller, modifidedEncuentro).then(response => {
      if (response) {
        getEncuentroAll();
      }
    })
      .catch((e) => {
        console.log(e);
      });
    setModalInsert(false);;
  };


  const deleteE = (data) => {   //antes deleteT
    Swal.fire({
      title: `¿Seguro que desea eliminar el encuentro? ${data.idecuentro}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar el encuentro'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la función para eliminar el e de la base de datos
        deleteEncuentro(data)
          .then(() => {
            // Si se elimina correctamente de la base de datos, actualizar la interfaz de usuario
            const updatedEncuentro = encuentro.filter(item => item.idencuentro !== data.idencuentro);
            setEncuentro(updatedEncuentro);
            Swal.fire(
              'Eliminado con éxito!',
              `Se eliminó el encuentro ${data.idencuentro}`,
              'success'
            );
          })
          .catch((error) => {
            // Manejar cualquier error que pueda ocurrir al eliminar el taller de la base de datos
            Swal.fire(
              'Error',
              'No se pudo eliminar el encuentro. Por favor, inténtelo de nuevo más tarde.',
              'error'
            );
          });
      }
    });
  };


  /*const editarActividad = (index, nombreActividad) => {
    setEditIndex(index);
    setNombreAct(nombreActividad)
 
  };
 
 
  const guardarActEdit = async (actividadId, nuevoNombre) => {
    const nuevasActividades = act.map(actividad => {
      if (actividad.idactividad === actividadId) {
        return {
          ...actividad,
          nombre: nuevoNombre
        };
      }
      return actividad;
    });
 
    setAct(nuevasActividades);
    console.log("que contine nuevasActividades", nuevasActividades)
    console.log("que contine ahora act?", nuevasActividades)
    setEditIndex(-1);
  };
 
 
  // Funcion que elimina una actvidad elegida
  const eliminar = async (id) => {
    const actividadesBorradas = actividades.filter((_, index) => index !== id);
    setActividades(actividadesBorradas);
 
  };
*/

  const clear = () => {
    setForm({
      idtaller: 0,
      input_nombre: "",
      tipotallerid: 0
    });

    //setNombreAct("");
  };



  return (
    <>
      {/**mostrar encuentros*/}
      <Container>
        <h1 className="mt-4 mt-md-2 text-center">Encuentros</h1>
        <button
          className="btn btn-primary mb-2 mt-2"
          onClick={() => showModalInsert()}
        >
          Insertar nuevo encuentro
        </button>
        <br />
        <br />
        <div className="row m-md-3 shadow mx-md-auto border-top-sm m-0">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Fecha</th>
                <th scope="col">Taller</th>
                <th scope="col">Virtual</th>

                <th scope="col">Acción</th>
              </tr>
            </thead>

            <tbody>
              {encuentro.map((element, index) => (
                <tr key={index}>
                  <td>{element.idencuentro}</td>
                  <td>{utils.convertirFormatoFecha(element.fecha)}</td>
                  <td>{taller.find(taller => taller.idtaller === element.idtaller)?.nombre}</td>
                  <td>{element.virtual}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-verde me-1"
                      onClick={() => showModalEdit(element)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>

                    </button>
                    <button
                      type="button"
                      className="btn btn-rojo"
                      onClick={() => deleteE(element)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </Container>
      {/** fin mostrar encuentros*/}


      {/** nuevo taller*/}
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h2>Nuevo Encuentro</h2>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <div className="form-group mb-2">
                  <label className="control-label">Fecha del encuentro</label>
                  <input type="date" className="form-control" id="fecha" name="fecha" onChange={handleChange} />
                </div>
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <div className="form-check">
                  <label htmlFor="input_virtual" className="form-check-label">
                    Virtual
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={isVirtual === 1} // Establecer el checkbox como marcado por defecto
                    onChange={handleChangeVirtual} // Manejar el cambio de estado del checkbox
                  />

                </div>

              </FormGroup>
            </div>
          </div>

          <div className="col-md-6">
            <FormGroup>
              <label htmlFor="input_nombre" className="control-label">
                Taller:
              </label>
              <select
                className="form-select"
                placeholder="Elijaaaa el taller"
                name="nombreTaller"
                id="nombreTaller"
                value={form.nombreTaller}
                onChange={handleChange}
              >
                <option value="">
                  Elija el taller
                </option>
                {taller.filter(tallerElegido => tallerElegido.borrado === 0).map((tallerElegido) => (
                  <option
                    id="idTaller"
                    key={tallerElegido.idtaller}
                    value={tallerElegido.idtaller}
                  >
                    {tallerElegido.nombre}
                  </option>
                ))}
              </select>

              {actividadesF.length > 0 && (
                <div className="border shadow p-3 mb-5 bg-white rounded">
                  <label>Actividades</label>
                  {
                    actividadesF.map((actividad, index) => (
                      <div key={index} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`actividad-${index}`} // Asigna un ID único al checkbox
                          value={actividad.id} // Usa el ID de la actividad como valor del checkbox
                          checked={actividad.checked} // Marca la actividad como seleccionada si está en el estado actividadesSeleccionadas
                          onChange={() => handleActividadCheck(index)}
                        />
                        <label className="form-check-label" htmlFor={`actividad-${index}`}>
                          {actividad.nombre}
                        </label>
                      </div>
                    ))
                  }
                </div>
              )}

              {
                actividadesF.filter(element => element.checked === true).map((act, index) => (
                  <li key={index}>
                    {act.nombre}
                  </li>
                ))
              }


            </FormGroup>
          </div>
        </ModalBody>

        <ModalFooter>
          <button
            type="button"
            className="btn btn-rojo"
            data-bs-dismiss="modal"
            onClick={() => handleModalInsert()}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-azul"
            onClick={() => guardarNuevo()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>Agregar
          </button>
        </ModalFooter>
      </Modal>
      {/** Fin nuevo taller*/}



      {/* EDITAR TALLER */}
      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <div>
            <h2>Editar encuentro</h2>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="row">
            {/* ID */}
            <div className="col-md-12">
              <FormGroup>
                <label htmlFor="idencuentro" className="control-label">
                  ID:
                </label>
                <input
                  type="text"
                  name="idencuentro"
                  id="idencuentro"
                  className="form-control"
                  readOnly
                  // onChange={handleChange}
                  value={form.idencuentro}
                />
              </FormGroup>
            </div>

            {/* fecha de encuentro */}
            <div className="col-md-6">
              <FormGroup>
                <label className="control-label"> Fecha de encuentro</label>
                <input
                  type="date"
                  name="fecha"
                  id="fecha"
                  className="form-control"
                  //onChange={handleChange}
                  value={form.fecha}
                  readOnly
                />
              </FormGroup>
            </div>

            {/* virtual */}
            <div className="col-md-6">
              <FormGroup>
                <div className="form-check">
                  <label htmlFor="input_virtual" className="form-check-label">
                    Virtual
                  </label>
                  <input
                    type="checkbox"
                    name="virtual"
                    id="virtual"
                    className="form-check-input"
                    defaultChecked={form.virtual === 1 ? true : false}
                    //    checked={isVirtual === 1} // Establecer el checkbox como marcado por defecto
                    onChange={handleChangeVirtual} // Manejar el cambio de estado del checkbox
                  />
                </div>
              </FormGroup>
            </div>

            {/* taller */}
            <div className="col-md-6">
              <FormGroup>
                <label htmlFor="input_nombre" className="control-label">
                  Taller:
                </label>

                <input
                  type="text"
                  id="input_nombre"
                  className="form-control"
                  value={taller.find(tallerElegido => tallerElegido.idtaller === form.nombreTaller)?.nombre || 'Elija el taller'}
                  readOnly
                />

                <FormGroup>
                  <div className="border shadow p-3 mb-5 bg-white rounded">
                    <label htmlFor="actividades" className="control-label">Actividades</label>
                    {
                      editActivities.map((actividad, index) => (
                        <div key={index} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`actividad-${index}`} // Asigna un ID único al checkbox
                            value={actividad.id} // Usa el ID de la actividad como valor del checkbox
                            checked={actividad.checked} // Marca la actividad como seleccionada si está en el estado actividadesSeleccionadas
                            onChange={() => handleActividadCheckEdit(index)}
                          />
                          <label className="form-check-label" htmlFor={`actividad-${index}`}>
                            {actividad.nombre}
                          </label>
                        </div>
                      ))
                    }
                  </div>
                </FormGroup>
              </FormGroup>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <button
            type="button"
            className="btn btn-rojo"
            data-bs-dismiss="modal"
            onClick={() => handleModalEdit()}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-azul"
            onClick={() => guardarEdición(form, /*act*/)} ///creo que es mejor poner las actividades (nombreAct) dentro del form
          >
            Guardar
          </button>
        </ModalFooter>
      </Modal >
    </>
  );
}

export default Encuentro;