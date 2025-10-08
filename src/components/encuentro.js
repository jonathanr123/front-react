import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Pencil , Trash, Plus } from 'react-bootstrap-icons';
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
  const [actividadrealizada, setActividadRealizada] = useState([]);  //estados para todos las actividades

  const [idEncuentro, setIdEncuentro] = useState(0);
  const [encuentro, setEncuentro] = useState([]);
  const [isVirtual, setIsVirtual] = useState(1); // Estado para controlar si el checkbox está marcado o no
  const [errores, setErrores] = useState({});

  const [form, setForm] = useState({
    idencuentro: 0,
    idtaller: 0,
    nombreTaller: "",
    fecha: "",
    // virtual: 1,
  });

  const [modalInsert, setModalInsert] = useState(false); // showNuevo ---> SetShowNuevo 
  const [modalEdit, setModalEdit] = useState(false); // show ---> setShow
  const [editActivities, setEditActivities] = useState([]); // Estado para almacenar las actividades seleccionadas para el encuentro en edición

  //estas dos const es para la elccion de las actividades del encuentro
  const [modalInsertAct, setModalInsertAct] = useState(false);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    getEncuentroAll();
    getTallerAll();
    getActividadAll();
    getActividadRealizadaAll();
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

  const getActividadRealizadaAll = async () => {
    const response = await actividadRealizadaRepository.getAll();
    if (response) {
      setActividadRealizada(response.data);
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


  const handleChangeVirtual = (e) => {
    // Manejar el cambio de estado del checkbox
    setIsVirtual(e.target.checked ? 1 : 0); // Guarda 1 si está marcado, 0 si está desmarcado
    console.log("es virtual o no", isVirtual);
  };


  //guarda en la tabla actividadrealizada el par idencuentro-idactividad
  // Aquí es donde se guarda o elimina una actividad según su estado actual (checked o no):
  const guardarActividadesSeleccionadas = async () => {
    const actividadesSeleccionadas = actividad.filter(actividad => actividad.checked); //Estas son las actividades que el usuario tiene actualmente marcadas (las que deben guardarse).

    // Mapeamos las actividades seleccionadas para guardarlas en el servidor, tabla actividadRealizada
    const actividadesToSave = actividadesSeleccionadas.map(actividad => ({
      idencuentro: form.idencuentro,
      idactividad: actividad.idactividad
    }));

    console.log("Actividades seleccionadas para guardar", actividadesToSave);

    // Obtener todas las actividades realizadas del encuentro
    const actividadesRealizadas = await actividadRealizadaRepository.getAll();
    const actividadesRealizadasConIds = Array.isArray(actividadesRealizadas.data) ? actividadesRealizadas.data : [];//verifico que sea un array para poder aplicar filter
    const actividadesRealizadasDelEncuentro = actividadesRealizadasConIds.filter(actividad => actividad.idencuentro === form.idencuentro);

    console.log("ActividadesRealizadas", actividadesRealizadasDelEncuentro);

    // Identificar las actividades que se deben eliminar (las que ya no están seleccionadas)
    const actividadesADeseleccionar = actividadesRealizadasDelEncuentro.filter(realizada =>
      !actividadesSeleccionadas.some(seleccionada => seleccionada.idactividad === realizada.idactividad)
    );
    console.log("Actividades que deben eliminarse", actividadesADeseleccionar);

    //extraer los idactividadrealizada de las actividades desmarcadas
    const idsActividadesADeseleccionar = actividadesADeseleccionar.map(realizada => realizada.idactividadrealizada);
    console.log("ids de actividades a deseleccionar", idsActividadesADeseleccionar);

    // Filtrar las actividades a guardar para evitar duplicados (ya existentes)
    const actividadesNoGuardadas = actividadesToSave.filter(actividad =>
      !actividadesRealizadasDelEncuentro.some(realizada => realizada.idactividad === actividad.idactividad)
    );
    console.log("Actividades que deben guardarse (nuevas)", actividadesNoGuardadas);


    // Guardar nuevas actividades seleccionadas y eliminar las desmarcadas
    try {
      // Envía todas las actividades en paralelo y espera que todas se completen
      await Promise.all(
        actividadesNoGuardadas.map(actividad => actividadRealizadaRepository.create(actividad))
      );

      // Eliminar las actividades desmarcadas en paralelo
      await Promise.all(
        idsActividadesADeseleccionar.map(id => actividadRealizadaRepository.delete(id))
      );
      notificacionExito();
      console.log('Todas las actividades se han guardado correctamente.');
      setModalInsertAct(false);

    } catch (error) {

      console.error("Error al guardar las actividades:", error);
      // Muestra notificación de error, si es necesario
    }
  };


  const guardarNuevo = () => {
    const newErrors = {};

    if (!form.fecha) {
      newErrors.fecha = "La fecha no puede estar vacío.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors); // Limpia errores previos si la validación pasa
      return;
    }
    setErrores({}); // Limpiar errores si la validación pasa


    let fechaTaller = form.fecha;
    let virtual = isVirtual; //ver cual es la diferencia entre isVirtual donde se guarda lo de la virtualidad

    console.log("mentira", ",", fechaTaller, ",", form.fecha)

    if (fechaTaller !== '' & virtual !== '') {
      let data = {
        fecha: fechaTaller,
        virtual: virtual, //y si pongo form.virtual que pasa?, es lo mismo?
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
        //console.log("los id de las actividades realizaas", actividadesRealizadasIds);
        //await Promise.all(actividadesRealizadasIds.map(id => actividadRealizadaRepository.delete(id)));

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
    setErrores({});         // Limpia los errores

  };


  //al editar un taller en especifico muestra sus valores 
  const showModalEdit = async (data) => {
    setModalEdit(true);   //abre el modal de edición
    setForm({ //carga los datos del encuentro seleccionado en el formulario de edición
      idencuentro: data.idencuentro,
      fecha: data.fecha,
      virtual: data.virtual,
    });

    console.log("todas las actividades", actividad);

    try {
      //le paso el idencuentro y me trae las actividades (tabla actividad) que marqué al crear el encuentro correspondiente
      const response = await actividadRealizadaRepository.get(data.idencuentro);
      console.log("encuentro", data.idencuentro, "actividades marcadas del encuentro", response);

    } catch (error) {
      console.error("Error al obtener el encuentro:", error);
    }
  }


  const handleModalEdit = () => {
    setModalEdit(false);
  };


  // Función que obtiene para eliminar un taller
  const deleteEncuentro = async (data) => {
    const response = await encuentroRepository.deleteEncuentro(data.idencuentro).catch(e => console.log(e));

    if (response) {
      getEncuentroAll();
    }
  };


  const deleteE = (data) => {   //antes deleteT
    Swal.fire({
      title: `¿Seguro que desea eliminar el encuentro con fecha: ${utils.convertirFormatoFecha(data.fecha)}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar el encuentro',
      cancelButtonText: 'Cancelar',

      reverseButtons: true

    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la función para eliminar el e de la base de datos
        Swal.fire(
          'Eliminado con éxito!',
          `Se eliminó el encuentro ${data.fecha}`,
          'success'
        )
                // Si se elimina correctamente de la base de datos, actualizar la interfaz de usuario

        const updatedEncuentro = encuentro.filter(item => item.idencuentro !== data.idencuentro);

        deleteEncuentro(data);
        setEncuentro(updatedEncuentro);
      }
  
})
  };


const clear = () => {
  setForm({
    idtaller: 0,
    input_nombre: "",
    tipotallerid: 0
  });
};


/** estas tres ultimas funciones es para la eleccion de las actividades del encuentro */
//Al cargar las actividades, guardar una copia de las actividades previamente marcadas 
//para hacer la comparación al momento de guardar los cambios.
const showModalInsertAct = async (data) => {
  setModalInsertAct(true);
  setForm({
    idencuentro: data.idencuentro,
    fecha: data.fecha,
  });

  try {
    // Guardamos una referencia a las actividades realizadas inicialmente (guardadas en la tabla)
    const response = await actividadRealizadaRepository.get(data.idencuentro);      //con el idencuentro me trae las actividades de ese encuentro

    // Verificamos si response.data es un array
    const actividadesRealizadas = Array.isArray(response.data) ? response.data : [];
    console.log("encuentro", data.idencuentro, "todas sus actividadesrealizadas", actividadesRealizadas);

    // Modificar editActivities para incluir el estado inicial de cada actividad, es decir me muestra las actividades que marqué cuando creé un ecuentro 
    const actividadesConEstadoInicial = actividad.map(actividad => ({
      ...actividad,
      checked: actividadesRealizadas.some(realizada => realizada.idactividad === actividad.idactividad) // Marcar si está en response
    }));
    console.log("muestras todas las actividades pero solo marca las elegidas ", actividadesConEstadoInicial);
    setActividad(actividadesConEstadoInicial);

    // Guardar las actividades realizadas en un estado separado para comparaciones futuras
    //setActividadesRealizadas(actividadesRealizadas);

  } catch (error) {
    console.error("Error al obtener las actividades del encuentro:", error);
  }
};

const handleModalInsertAct = () => {
  setModalInsertAct(false);
  setActividades([]);
};


//agrupa las actividades por taller. El nombre del taller será la clave 
//y las actividades serán el valor (un array de actividades).
const actividadesPorTaller = actividad.reduce((acc, actividad) => {
  const tallerObj = taller.find(taller => taller.idtaller === actividad.idtaller);
  
  // Solo incluye actividades de talleres donde "borrado" sea 1
  if (tallerObj?.borrado === 0) {
    const tallerNombre = tallerObj.nombre || "Taller no encontrado";
    
    if (!acc[tallerNombre]) {
      acc[tallerNombre] = [];
    }
    
    acc[tallerNombre].push(actividad);
  }
  
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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg signoMas" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>Agregar</button>
      <br />
      <div className="row m-md-3 shadow mx-md-auto border-top-sm m-0">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Fecha</th>
              <th scope="col">Virtual</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>

          <tbody>
            {encuentro.map((element, index) => (
              <tr key={index}>
                <td>{element.idencuentro}</td>
                <td>{utils.convertirFormatoFecha(element.fecha)}</td>
                <td>{/*{element.virtual}*/}{element.virtual === 1 ? "Sí" : ""}</td>
                <td>
                  <button
                    type="button"
                    className="btn"
                    style={{ marginRight: 10, boxShadow: "3px 3px #13E000", backgroundImage: "linear-gradient(to right, #9bff92, #8efe86, #80fd79, #71fc6c, #5ffb5e, #58fb54, #51fb4a, #4afb3e, #51fc35, #57fd2a, #5efe1c, #64ff00)" }}

                    onClick={() => showModalEdit(element)}
                  >
                    <Pencil />
                  </button>

                  <button
                    type="button"
                    className="btn"
                    style={{ marginRight: 10, boxShadow: "3px 3px #D80000", backgroundImage: "linear-gradient(to right, #ff7171, #ff6867, #ff5e5d, #ff5453, #ff4948, #ff4140, #ff3938, #ff302f, #ff2826, #ff1f1d, #ff1311, #ff0000)" }}
                    title="Borrar"
                    onClick={() => deleteE(element)}
                  >
                    <Trash/>
                  </button>

                  <button
                    type="button"
                    className="btn"
                    style={{ marginRight: 10, boxShadow: "3px 3px #0059CD", backgroundImage: "linear-gradient(to right, #6ba7f6, #62a2f7, #599df8, #4f98f9, #4593fa, #3c8efb, #338afc, #2a85fd, #2080fe, #157afe, #0a75ff, #006fff)" }}
                    title="Agregar actividades"
                    onClick={() => showModalInsertAct(element)}
                  >
                    <Plus/>
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
              {errores.fecha && <small className="text-danger">{errores.fecha}</small>}

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
          className="btn btn-verde"
          onClick={() => guardarNuevo()}
        >
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-rojo"
          data-bs-dismiss="modal"
          onClick={() => handleModalInsert()}
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
    {/** Fin nuevo encuentro*/}

    {/** editar encuentro */}
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
                Código:
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
                  // checked={isVirtual === 1} // Establecer el checkbox como marcado por defecto
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
          className="btn btn-verde"
          onClick={() => guardarEdición(form, /*act*/)} ///creo que es mejor poner las actividades (nombreAct) dentro del form
        >
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-rojo"
          data-bs-dismiss="modal"
          onClick={() => handleModalEdit()}
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal >
    {/** Fin editar encuentro */}

    {/** elegir actividades */}
    <Modal isOpen={modalInsertAct}>
      <ModalHeader>
        <div>
          <h3>Actividades del encuentro:</h3>
          <label className="control-label">
            <div>{utils.convertirFormatoFecha(form.fecha)}</div>
            <h6>Codigo: {form.idencuentro}</h6>
          </label>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12 col-xl-12" style={{ position: "relative", maxHeight: "350px", overflow: "auto", display: "block" }}>
            <table className="table table-bordered table-hover shadow" style={{ width: '100%' }}>
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
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <button
          type="button"
          className="btn btn-verde"
          onClick={() => guardarActividadesSeleccionadas()}
        >
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-rojo"
          data-bs-dismiss="modal"
          onClick={() => handleModalInsertAct()}
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
    {/** Fin agregar actividades */}
  </>
);
}

export default Encuentro;
