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

import { tallerRespository } from "../services/tallerService";
import { actiRepository } from "../services/actService";
import Swal from "sweetalert2";

const Talleres = () => {

  const [taller, setTaller] = useState([]);
  const [act, setAct] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [nombreAct, setNombreAct] = useState("");
  const [errores, setErrores] = useState({});

  const [form, setForm] = useState({
    idtaller: 0,
    tipotallerid: 0,
    input_nombre: "",
    act: "",
    nombreAct: "",
  });

  const [tipotaller, setTipoTaller] = useState([
    { idtipotaller: 1, nombre: 'Educación física' },
    { idtipotaller: 2, nombre: 'Literario' },
    { idtipotaller: 3, nombre: 'Danza' },
    
  ]);

  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalInsertAct, setModalInsertAct] = useState(false);

  useEffect(() => {
    getTallerAll();
    getActividades();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value, ",", form.tipotallerid);
  };

  const handleChangeAct = (e) => {
    setNombreAct(e.target.value);
  };

  const showModalInsert = () => {
    setModalInsert(true);
  };

  const handleModalInsert = () => {
    setForm({
      tipotallerid: -1
    });
    setModalInsert(false);
    setErrores({});         // Limpia los errores

  };

  const showModalInsertAct = (data) => {
    setModalInsertAct(true);
    setForm({
      idtaller: data.idtaller,
      input_nombre: data.nombre,
      tipotallerid: data.tipotaller,
    });
  };
  const handleModalInsertAct = () => {
    setNombreAct(""); // Limpiar el campo al hacer clic en Cancelar
    setModalInsertAct(false);
    setActividades([]); /// ver que funcion cumple sino borrarlo
    setErrores({});         // Limpia los errores

  };

  const showModalEdit = (data) => { //al editar un taller en especifico muestra sus valores 
    setModalEdit(true);
    setForm({
      idtaller: data.idtaller,
      input_nombre: data.nombre,
      tipotallerid: data.tipotaller,
    });
  };

  const handleModalEdit = () => {
    setModalEdit(false);
    setErrores({});         // Limpia los errores

  };

  const deleteTaller = async (data) => { // Función que obtiene para eliminar un taller
    let modifidedTaller = {
      borrado: 1,
      tipotaller: data.tipotaller
    }
    await tallerRespository.updateTaller(data.idtaller, modifidedTaller);
  };

  const validarCamposTaller = (form) => {
    const errors = {};
    console.log("validar campos taller", form);

    // Validar campo de nombre
    if (!form.input_nombre.trim()) {
      errors.input_nombre = "El nombre del taller no puede estar vacío.";
    }

    // Validar campo de tipo de taller
    if (!form.tipotallerid || form.tipotallerid === "-1") {
      errors.tipotallerid = "Debe seleccionar un tipo de taller.";
    }

    return errors; // Devuelve un objeto con los errores encontrados
  };

  const deleteT = (data) => {
    Swal.fire({
      title: `¿Seguro que desea eliminar el taller: ${data.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar el taller',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      reverseButtons: true

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado con éxito!',
          `Se eliminó el taller ${data.nombre}`,
          'success'
        )

        const updatedTaller = taller.filter(item => item.idtaller !== data.idtaller);
        deleteTaller(data);
        setTaller(updatedTaller);
      }
    })
  };


  // Función que obtiene para eliminar una actividad en la DB
  const deleteAct = async (data) => {
    const response = await actiRepository.delete(data.idactividad).catch(e => console.log(e));

    if (response) {
      getActividades();
    }
  };


  const deleteA = (data) => {
    Swal.fire({
      title: `¿Seguro que desea eliminar la actividad: ${data.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar la actividad',
      cancelButtonText: 'Cancelar',
      reverseButtons: true

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado con exito!',
          `Se elimino la actividad ${data.nombre}`,
          'success'
        )

        deleteAct(data);
      }
    })
  };


  // Funcion que elimina una actvidad elegida
  const eliminar = async (id) => {
    const actividadesBorradas = actividades.filter((_, index) => index !== id);
    setActividades(actividadesBorradas);

  };


  const edit = (dataTaller, dataActividad) => {
    const errores = validarCamposTaller(form); // Llama a la función de validación

    if (Object.keys(errores).length > 0) {
      setErrores(errores); // Actualiza el estado de errores
      return; // Evita continuar si hay errores
    }

    setErrores({}); // Limpia errores previos si la validación pasa

    const updatedTaller = taller.map(t => {
      if (dataTaller.idtaller === t.idtaller) {
        return {
          ...t,
          nombre: dataTaller.input_nombre,
          tipotaller: dataTaller.tipotallerid,
        };
      }
      return t;
    });

    tallerRespository.updateTaller(dataTaller.idtaller, {
      id: dataTaller.idtaller,
      nombre: dataTaller.input_nombre,
      tipotaller: dataTaller.tipotallerid,
      borrado: 0,
    }).then(() => {
      notificacionExito();
      clear();
      setTaller(updatedTaller);
    }).catch(() => {
      notificacionError();
    });


    act.map((actividad) => {
      // Llamar a la API para crear la actividad
      actiRepository.update(actividad.idactividad, actividad)
        .then((response) => { })
        .catch((error) => { });
    });

    setModalEdit(false);
  };


  /////////////////////// guardar datos de un nuevo taller ////////////////////////////
  const guardarNuevo = () => {
    const errores = validarCamposTaller(form, nombreAct); // Llama a la función de validación
    console.log("que contiene form", form);
    console.log("que contiene errores", errores);
    
    if (Object.keys(errores).length > 0) {
      setErrores(errores); // Actualiza el estado de errores
      return; // Evita continuar si hay errores
    }

    setErrores({}); // Limpia errores previos si la validación pasa
    // Crear objeto de datos para el taller
    const datataller = {
      nombre: form.input_nombre,
      tipotaller: form.tipotallerid,
      borrado: 0,
    };

    // Llamar a la API para crear el taller
    tallerRespository.createTaller(datataller)
      .then((response) => {
        if (response && response.data && response.data.idtaller) {
          const nuevoId = response.data.idtaller;

          // Actualizar el estado con el nuevo ID del taller
          //setIdInsertado(nuevoId); //ver que funcion cumple y para que es esto !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          setModalInsert(false);
          notificacionExito();
          clear();

          getTallerAll();
        }
      })
      .catch((error) => {
        notificacionError();
      });
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


  // Función que obtiene la lista de tipos de eventos
  const getTallerAll = async () => {
    const response = await tallerRespository.getTallerAll();
    if (response) {
      setTaller(response.data);
    } else {
      console.error("Error al obtener los talleres");
    }
  };


  const getActividades = async () => {
    const response = await actiRepository.getAll();
    if (response) {
      setAct(response.data);
    } else {
      console.error("Error al obtener las actividades");
    }
  };


  const clear = () => {
    setForm({
      idtaller: 0,
      input_nombre: "",
      tipotallerid: 0
    });
  };

  const cargarNuevo = async () => {
    const newErrors = {};

    if (!nombreAct.trim()) {
      newErrors.nombreAct = "El nombre de la actividad no puede estar vacío.";
    } 
    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors); // Limpia errores previos si la validación pasa
      return;
    }
    setErrores({}); // Limpiar errores si la validación pasa

    // Crear objeto de datos para la actividad relacionada con el taller
    const nuevaActividad = {
      nombre: nombreAct,
    };
    // Actualizar el estado de actividades
    setActividades([...actividades, nuevaActividad]);
    setNombreAct(""); // Limpiar el campo después de añadir la actividad
  }

  const guardarAct = () => {
    actividades.forEach((actividad) => {
      actividad.idtaller = form.idtaller;
      console.log("id del taller que se guarda", form.idtaller)
      // Llamar a la API para crear la actividad
      actiRepository.create(actividad)
        .then((response) => {
          setModalInsertAct(false);
          notificacionExito();
          getActividades();
        })
        .catch((error) => {
        });
    });
    setActividades([]);
    setErrores({});         // Limpia los errores
    setModalInsertAct(false);
  }

  return (
    <>
      {/** mostrar actividades */}
      <Container>
        <h1 className="mt-4 mt-md-2 text-center">Talleres</h1>
        <button
          className="btn btn-primary mb-2 mt-2"
          onClick={() => showModalInsert()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>Agregar        </button>
        <br />
        <br />
        <div className="row m-md-3 shadow mx-md-auto border-top-sm m-0">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>

            <tbody>
              {taller.filter(element => element.borrado === 0).map((element, index) => (
                <tr key={index}>
                  <td>{element.idtaller}</td>
                  <td>{element.nombre}</td>
                  <td>
                    <button
                      type="button"
                      className="btn"
                      title="Editar"
                      style={{ marginRight: 10, boxShadow: "3px 3px #13E000", backgroundImage: "linear-gradient(to right, #9bff92, #8efe86, #80fd79, #71fc6c, #5ffb5e, #58fb54, #51fb4a, #4afb3e, #51fc35, #57fd2a, #5efe1c, #64ff00)" }}
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
                      className="btn"
                      title="Borrar"
                      onClick={() => deleteT(element)}
                      style={{ marginRight: 10, boxShadow: "3px 3px #D80000", backgroundImage: "linear-gradient(to right, #ff7171, #ff6867, #ff5e5d, #ff5453, #ff4948, #ff4140, #ff3938, #ff302f, #ff2826, #ff1f1d, #ff1311, #ff0000)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="btn"
                      title="Gestionar actividades"
                      onClick={() => showModalInsertAct(element)}
                      style={{ marginRight: 10, boxShadow: "3px 3px #0059CD", backgroundImage: "linear-gradient(to right, #6ba7f6, #62a2f7, #599df8, #4f98f9, #4593fa, #3c8efb, #338afc, #2a85fd, #2080fe, #157afe, #0a75ff, #006fff)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
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


      {/** nuevo taller*/}
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h2>Ingresar nuevo taller</h2>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <label htmlFor="input_nombre" className="control-label">
                  Nombre del taller:
                </label>
                <input
                  type="text"
                  id="input_nombre"
                  name="input_nombre"
                  className="form-control"
                  onChange={handleChange}
                />
                {errores.input_nombre && <small className="text-danger">{errores.input_nombre}</small>}

              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <div className="form-group mb-2">
                  <label htmlFor="tipotallerid" className="control-label">
                    Tipo de taller
                  </label>
                  <select
                    className="form-select"
                    placeholder="Ingrese el tipo de taller"
                    name="tipotallerid"
                    value={form.tipotallerid}
                    onChange={handleChange}
                  >
                    <option value={-1}>
                      Elija el tipo de taller
                    </option>
                    {tipotaller.map((element) => (
                      <option
                        id="tipotallerid"
                        key={element.idtipotaller}
                        value={element.idtipotaller}
                      >
                        {element.nombre}
                      </option>
                    ))}
                  </select>
                  {errores.tipotallerid && <small className="text-danger">{errores.tipotallerid}</small>}

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
            className="btn btn-verde"
            onClick={() => guardarNuevo()}
          >
            Guardar
          </button>
        </ModalFooter>
      </Modal>


      {/* EDITAR TALLER */}
      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <div>
            <h2>Editar taller</h2>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="row">
            <FormGroup>
              <label htmlFor="idtaller" className="control-label">
                Código:
              </label>
              <input
                type="text"
                name="idtaller"
                id="idtaller"
                className="form-control"
                readOnly
                onChange={handleChange}
                value={form.idtaller}
              />
            </FormGroup>

            <div className="col-md-6">
              <FormGroup>
                <label htmlFor="input_nombre" className="control-label">
                  Nombre del taller:
                </label>
                <input
                  type="text"
                  name="input_nombre"
                  id="input_nombre"
                  className="form-control"
                  onChange={handleChange}
                  value={form.input_nombre}
                />
                {errores.input_nombre && <small className="text-danger">{errores.input_nombre}</small>}

              </FormGroup>
            </div>


            <div className="col-md-6">
              <FormGroup>

                <div className="form-group mb-2">
                  <label htmlFor="tipotallerid" className="control-label">
                    Tipo de taller
                  </label>

                  <select
                    className="form-select"
                    placeholder="Ingrese el tipo de taller"
                    name="tipotallerid"
                    value={form.tipotallerid}
                    onChange={handleChange}
                  >
                    <option disabled={true} selected={true} defaultValue={-1}>
                      Seleccione el tipo de taller
                    </option>
                    {tipotaller.map((element) => (
                      <option
                        id="tipotallerid"
                        key={element.idtipotaller}
                        value={element.idtipotaller}
                      >
                        {element.nombre}
                      </option>
                    ))}
                  </select>

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
            className="btn btn-verde"
            onClick={() => edit(form, act)} ///creo que es mejor poner las actividades (nombreAct) dentro del form
          >
            Guardar
          </button>
        </ModalFooter>
      </Modal >

      {/** Guardar actividades */}
      <Modal isOpen={modalInsertAct}>
        <ModalHeader>
          <div>
            <h3>Actividades del taller:</h3>
            <label className="control-label">
              {form.input_nombre} <h6>Código: {form.idtaller} </h6>
            </label>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="row">
            <FormGroup>
              <label className="control-label">
                Ingrese nueva actividad:
              </label>
              <div className="mb-2 col-12 col-md-12 col-lg-12 col-xl-12 input-group">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="nombreAct"
                    id="nombreAct"
                    value={nombreAct}  // Asocia el valor del input con el estado
                    onChange={handleChangeAct}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={cargarNuevo} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                </div>
                {errores.nombreAct && <small className="text-danger">{errores.nombreAct}</small>}
              </div>

            </FormGroup>


            <div className="col-12 col-md-12 col-lg-12 col-xl-12" style={{ position: "relative", maxHeight: "350px", overflow: "auto", display: "block" }}>
              <table className="table table-bordered table-hover shadow table-striped" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>

                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody style={{ verticalAlign: 'middle' }}>
                  {
                    actividades.map((actividad, index) => (

                      <tr key={index}>
                        <td> {actividad.nombre}
                        </td>

                        <td>
                          <button type="button" className="btn btn-rojo" onClick={() => eliminar(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg></button>
                        </td>

                      </tr>
                    ))}


                  {
                    act.filter(actividad => actividad.idtaller === form.idtaller)
                      .reverse().map((actividad, index) => (

                        <tr key={index}>
                          <td> {actividad.nombre}
                          </td>

                          <td>
                            <button type="button" className="btn btn-rojo" onClick={() => deleteA(actividad)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg></button>
                          </td>

                        </tr>
                      ))}
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
            className="btn btn-verde"
            onClick={() => guardarAct()}
          >
            Guardar
          </button>
        </ModalFooter>
      </Modal>
      {/** Fin agregar actividades */}
    </>
  );
}

export default Talleres;