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

  const [taller, setTaller] = useState([]); //estado para todos los talleres
  const [actividad, setActividad] = useState([]);  //estados para todos las actividades
  const [actividadesMarcadas, setActividadesMarcadas] = useState([]); //estado para las actividades marcadas checkbox

  const [idEncuentro, setIdEncuentro] = useState(0);
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

  //estas dos const es para la elccion de las actividades del encuentro
  const [modalInsertAct, setModalInsertAct] = useState(false);
  const [actividades, setActividades] = useState([]);



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
    console.log("que es esto?", e.target.value, ",", form.fecha);

  };



  /* ----------------- esto iria en la grilla de selccionar las actividades como dice la profe */
  /** manejador de estados de los checkboxes para crear */
  const handleActividadCheck = (idactividad) => {
    setActividad(prevActividades =>
      prevActividades.map(act =>
        act.idactividad === idactividad
          ? { ...act, checked: !act.checked }
          : act
      )
    );
  };

  /** manejador de estados de los checkboxes para editar */
  const handleActividadCheckEdit = (index) => {
    const updatedActividades = [...editActivities];
    updatedActividades[index].checked = !updatedActividades[index].checked;
    setEditActivities(updatedActividades);

    console.log("actividades marcadas en el editar", updatedActividades);
  };
  /* ----------------- hasta acá -  iria en la grilla de selccionar las actividades como dice la profe */



  const handleChangeVirtual = (e) => {
    // Manejar el cambio de estado del checkbox
    setIsVirtual(e.target.checked ? 1 : 0); // Guarda 1 si está marcado, 0 si está desmarcado
    console.log("es virtual o no", isVirtual);
  };

  //guarda en la tabla actividadrealizada el par idencuentro-idactividad
  const guardarActividadesSeleccionadas = () => {
    const actividadesSeleccionadas = actividad.filter(actividad => actividad.checked);
    const actividadesToSave = actividadesSeleccionadas.map(actividad => ({
      idencuentro: form.idencuentro,
      idactividad: actividad.idactividad // Asumiendo que cada actividad tiene una propiedad `id`
    }));

    console.log("entro en guardarActividadesSeleccionadas", actividadesToSave);

    actividadesToSave.forEach(actividad => {
      actividadRealizadaRepository.create(actividad)
        .then(response => {
          if (response) {
            notificacionExito();

            console.log('Actividades guardada:', actividad);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
    );
    setModalInsertAct(false);

  };


  const guardarNuevo = () => {
    //let idTaller = form.nombreTaller;
    let fechaTaller = form.fecha;
    let virtual = form.virtual; //ver cual es la diferencia entre isVirtual donde se guarda lo de la virtualidad

    console.log("mentira", ",", fechaTaller, ",", form.fecha)

    if (fechaTaller !== '' & virtual !== '') {
      let data = {
        fecha: fechaTaller,
        // idtaller: idTaller,
        virtual: isVirtual, //y si pongo form.virtual que pasa?, es lo mismo?
      };

      encuentroRepository.createEncuentro(data).then(response => {
        if (response) {
          // Obtener el id del encuentro creado
          setIdEncuentro(response.data.idencuentro); // Asegúrate de que este es el camino correcto para obtener el id
          console.log("id del encuentro", idEncuentro, response.data.idencuentro);
          // Guardar las actividades seleccionadas
          //guardarActividadesSeleccionadas(idEncuentro);
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
        console.log("los id de las actividades realizaas", actividadesRealizadasIds);
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
      //le paso el idencuentro y me trae las actividades (tabla actividad) que marqué al crear el encuentro correspondiente
      const response = await actividadRealizadaRepository.get(data.idencuentro);
      console.log("encuentro", data.idencuentro, "actividades marcadas del encuentro", response);

      // Obtener las actividades filtradas basadas en el idtaller seleccionado - todas las marcadas y sin marcar
      const actividadesFiltradas = actividad.filter(item => item.idtaller === parseInt(idTallerSeleccionado));
      console.log("todas las actividades del taller", actividadesFiltradas);

      // Modificar editActivities para incluir el estado inicial de cada actividad, es decir me muestra (en la interfaz) 
      // las actividades que marqué cuando creé un encuentro 
      const actividadesConEstadoInicial = actividadesFiltradas.map(actividad => ({
        ...actividad, //copia todas las propiedades de actividadesFiltradas (idtaller, idactividad, nombre) en el 
        //nuevo objeto actividadesConEstadoInicial para luego agregarle la nueva propiedad checked
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


  const clear = () => {
    setForm({
      idtaller: 0,
      input_nombre: "",
      tipotallerid: 0
    });

    //setNombreAct("");
  };



  /** estas tres ultimas funciones es para la eleccion de las actividades del encuentro */
  const showModalInsertAct = async (data) => {
    setModalInsertAct(true);
    setForm({
      idencuentro: data.idencuentro,
      fecha: data.fecha,
    });

    console.log("id del taller para traer las actividades", data.idencuentro);
    console.log("todas las actividades", actividad);

    try {
      const response = await actividadRealizadaRepository.get(data.idencuentro);
      console.log("todas las actividades realizadas", response);


      // Modificar editActivities para incluir el estado inicial de cada actividad, es decir me muestra las actividades que marqué cuando creé un ecuentro 
      const actividadesConEstadoInicial = actividad.map(actividad => ({
        ...actividad,
        checked: response.data.some(realizada => realizada.idactividad === actividad.idactividad) // Marcar si está en response
      }));
      console.log("muestras todas las actividades pero solo marca las elegidas ", actividadesConEstadoInicial);
      setActividad(actividadesConEstadoInicial);

    } catch (error) {
      console.error("Error al obtener las actividades del encuentro:", error);
    }
  };

  const handleModalInsertAct = () => {
    setModalInsertAct(false);
    setActividades([]);
  };

  const guardarAct = () => {

    actividades.forEach((actividad) => {
      actividad.idtaller = form.idtaller;
      console.log("id del taller que se guarda", form.idtaller)
      // Llamar a la API para crear la actividad
      actiRepository.create(actividad)
        .then((response) => {
          setModalInsertAct(false);
          notificacionExito();
          getActividadAll();
        })
        .catch((error) => {
        });
    });
    setActividades([]);
    setModalInsertAct(false);
  }

  //agrupa las actividades por taller. El nombre del taller será la clave 
  //y las actividades serán el valor (un array de actividades).
  const actividadesPorTaller = actividad.reduce((acc, actividad) => {
    const tallerNombre = taller.find(taller => taller.idtaller === actividad.idtaller)?.nombre || "Taller no encontrado";
    if (!acc[tallerNombre]) {
      acc[tallerNombre] = [];
    }
    acc[tallerNombre].push(actividad);
    return acc;
  }, {});

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
                {/* <th scope="col">Taller</th> */}
                <th scope="col">Virtual</th>

                <th scope="col">Acción</th>
              </tr>
            </thead>

            <tbody>
              {encuentro.map((element, index) => (
                <tr key={index}>
                  <td>{element.idencuentro}</td>
                  <td>{utils.convertirFormatoFecha(element.fecha)}</td>
                  {/*<td>{taller.find(taller => taller.idtaller === element.idtaller)?.nombre}</td> */}
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="btn btn-verde me-1"
                      onClick={() => showModalInsertAct(element)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11 8a.5.5 0 0 1 .5.5v1.5H13a.5.5 0 0 1 0 1h-1.5V13a.5.5 0 0 1-1 0v-1.5H9a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 11 8z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M8 2a1 1 0 0 1 1 1v3.5h3a1 1 0 0 1 0 2h-3V13a1 1 0 0 1-2 0V8.5H4a1 1 0 0 1 0-2h3V3a1 1 0 0 1 1-1z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </Container>
      {/** fin mostrar encuentros*/}


      {/** nuevo encuentro*/}
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h2>Nuevo Encuentro</h2>
          </div>
        </ModalHeader>

        {/** crear nuevo encuentro, fecha y virtualidad*/}
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
      {/** Fin nuevo encuentro*/}


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

      {/** elegir actividades */}
      <Modal isOpen={modalInsertAct}>
        <ModalHeader>
          <div>
            <h3>Actividades del encuentro:</h3>
            <label className="control-label">
              {form.idencuentro} : {utils.convertirFormatoFecha(form.fecha)}
            </label>
          </div>

        </ModalHeader>

        <ModalBody>
          <div className="row">

            <div className="col-12 col-md-12 col-lg-12 col-xl-12" style={{ position: "relative", maxHeight: "350px", overflow: "auto", display: "block" }}>

              <table className="table table-bordered table-hover shadow" style={{ width: '100%' }}>
                {/**     <thead>
               
                  <tr>
                   <th scope="col"></th>
                    <th scope="col">Actividad</th>
                   <th scope="col">Taller</th>
                  </tr>
                </thead>
                */}
                {
                  actividad.filter(element => element.checked === true).map((act, index) => (
                    <li key={index}>
                      {act.nombre}
                    </li>
                  ))
                }
                <tbody style={{ verticalAlign: 'middle' }}>
                  {Object.keys(actividadesPorTaller).map((tallerNombre, tallerIndex) => (
                    <React.Fragment key={tallerIndex}>
                      <tr>
                        <td colSpan="1" style={{ fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
                          {tallerNombre}
                        </td>
                      </tr>

                      {actividadesPorTaller[tallerNombre].map((act, index) => (
                        <tr key={act.idactividad}>

                          <td>{act.nombre}</td>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`actividad-${act.idactividad}`}
                              value={act.idactividad}
                             // checked={editActivities.find(a => a.idactividad === act.idactividad)?.checked || false}

                            checked={act.checked || false}
                              onChange={() => handleActividadCheck(act.idactividad)}
                            />
                          </td>
                          {/*  <td>{tallerNombre}</td> */}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}


                  {/*<label className="control-label">
                  Actividades existentes:
                </label>
                    */}

                </tbody>


              </table>
            </div>


          </div>
        </ModalBody>

        <ModalFooter>
          <button
            type="button"
            className="btn btn-rojo"
            data-bs-dismiss="modal"
            onClick={() => handleModalInsertAct()}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-azul"
            onClick={() => guardarActividadesSeleccionadas()}
          >
            Guardar
          </button>
        </ModalFooter>
      </Modal>
      {/** Fin agregar actividades */}
    </>
  );
}


export default Encuentro;