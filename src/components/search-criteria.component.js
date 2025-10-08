import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { eventRespository } from "../services/event.service";
import { pacienteRepository } from "../services/pacienteService";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import addPacientes from "./add-paciente.component.js";
import utils from "../utils/utils";

const Search = () => {
  const [arrayPerson, setArrayPerson] = useState([]);
  const [searchArrayperson, setSearchArrayperson] = useState({
    idpersona: 0,
    nombre: "",
    apellido: "",
    telefono: 0,
    borrado: 0,
    espaciente: 0
  });
  const [modalEdit, setModalEdit] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [errores, setErrores] = useState({});


  useEffect(() => {
    getPersonAll();
  }, []);

  const handleChange = (e) => {
    setSearchArrayperson({
      ...searchArrayperson,
      [e.target.name]: e.target.value,
    });
  };

  const getPersonAll = async () => {
    try {
      const response = await eventRespository.getAll();
      if (response) {
        setArrayPerson(response.data);
      }
    } catch (error) {
      notificacionError();
    }
  };

  const notificacionExito = () => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "success",
      title: "Se ha guardado con éxito",
    });
  };

  const notificacionError = () => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: "Error: Hubo un problema en la carga.",
    });
  };

  const edit = async (data) => {
    try {
      const updatedPerson = { ...data };
      await eventRespository.updatePerson(data.idpersona, updatedPerson);
      notificacionExito();
      clearForm();
      getPersonAll();
      setModalEdit(false);
    } catch (error) {
      notificacionError();
    }
  };

  const showModalEdit = (data) => {
    setSearchArrayperson({
      idpersona: data.idpersona,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
    });
    setModalEdit(true);
  };

  const handleModalEdit = () => setModalEdit(false);

  const showModalInsert = () => {
    setModalInsert(true);
  };
  const handleModalInsert = () => {
    setModalInsert(false);
    setErrores({});         // Limpia los errores

  };

  const clearForm = () => {
    setSearchArrayperson({
      idpersona: 0,
      nombre: "",
      apellido: "",
      telefono: 0,
      espaciente: 0,
      borrado: 0
    });
  };

  const eliminar = (persona) => {
    const arrayPersonas = arrayPerson.filter(e => e.idpersona !== persona.idpersona);
    persona.borrado = 1;

    Swal.fire({
      title: `¿Seguro que desea eliminar a  ${persona.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, Eliminar a ${persona.nombre}`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eventRespository.updatePerson(persona.idpersona, persona);
          notificacionExito();
          setArrayPerson(arrayPersonas);
          getPersonAll();
        } catch (error) {
          notificacionError();
        }
      }
    });
  };

  const arrayPersonIspaciente = arrayPerson.filter(e => e.espaciente === 1 && e.borrado !== 1);

  const enviarFormulario = async (data) => {
    const response = await pacienteRepository.guardarPaciente(data).catch(() => utils.errorSend());
    if (response) {
      utils.send()
      reset();
    }
  }
  const customSubmit = (data) => {
    console.log(data);
    enviarFormulario(data);
  }

  return (
    <>

      <main className="border-top-sm m-0 justify-content-center m-md-3 rounded shadow container-lg mx-md-auto">
        <h1 className="mt-4 mt-md-2 text-center">Personas con EP</h1>
        <button
          className="btn btn-primary mb-2 mt-2"
          onClick={() => showModalInsert()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg signoMas" viewBox="0 0 16 16">
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>Agregar
        </button>

        <div className='row'>
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {arrayPersonIspaciente.map((person, index) => (
                <tr key={person.idpersona}>
                  <th scope="row">{person.idpersona}</th>
                  <td>{person.nombre}</td>
                  <td>{person.apellido}</td>
                  <td>{person.telefono}</td>
                  <td>
                    <button className="btn btn-verde me-1" onClick={() => showModalEdit(person)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => eliminar(person)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>


      {/*gregar personas con EP*/}
      <Modal isOpen={modalInsert}>
          {addPacientes(register, errors, "EP")}
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12 col-xl-12" style={{ textAlign: 'center' }}>
              <button
                type="button"
                className="btn btn-rojo"
                data-bs-dismiss="modal"
                onClick={() => handleModalInsert()}
              >
                Cancelar
              </button>
            </div>
          </div>
      </Modal>

      {/*editar personas con EP*/}
      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <h2>Editar la persona con EP</h2>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor="idpersona">Código</label>
              <input
                type="text"
                name="idpersona"
                id="idpersona"
                className="form-control"
                readOnly
                onChange={handleChange}
                value={searchArrayperson.idpersona}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                className="form-control"
                onChange={handleChange}
                value={searchArrayperson.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                name="apellido"
                id="apellido"
                className="form-control"
                onChange={handleChange}
                value={searchArrayperson.apellido}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="telefono">Telefono</label>
              <input
                type="text"
                name="telefono"
                id="telefono"
                className="form-control"
                onChange={handleChange}
                value={searchArrayperson.telefono}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-verde" onClick={() => edit(searchArrayperson)}>Guardar</button>
          <button className="btn btn-danger" onClick={handleModalEdit}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Search;
