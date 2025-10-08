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
import { encuentroRepository } from "../services/encuentroService";
import { pacienteRepository } from "../services/pacienteService";
import { asistenciaRepository } from "../services/asistenciaService";
import { eventRespository } from "../services/event.service";

import Swal from "sweetalert2";
import utils from "../utils/utils";


const Asistencia = () => {

  const [taller, setTaller] = useState([]);
  const [encuentro, setEncuentro] = useState([]);
  const [act, setAct] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [asistencia, setAsistencia] = useState([]);
  const [evento, setEvento] = useState([]);
  const [errores, setErrores] = useState({});

  const [form, setForm] = useState({
    fechaEncuentro: "",
    persona: "",
    asistencia: "",
    justificado: false,
  });

  useEffect(() => {
    getTallerAll();
    getActividades();
    getEncuentroAll();
    getPacientes();
    getAsistencia();
    getEventoAll();
  }, []);


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

  const getEncuentroAll = async () => {
    const response = await encuentroRepository.getEncuentroAll();
    if (response) {
      setEncuentro(response.data);
      console.log("todos los encuentros", response)
    } else {
      console.error("Error al obtener los encuentros");
    }
  };

  const getPacientes = async () => {
    const response = await pacienteRepository.getPacientes().catch(() => utils.notificacionError());
    if (response) {
      setPacientes(response.data);
      console.log("todos los encuentros", response)

    } else {
      console.error("Error al obtener los encuentros");
    }
  }

  const getAsistencia = async () => {
    const response = await asistenciaRepository.getAsistenciaAll().catch(() => utils.notificacionError());
    if (response) {
      setAsistencia(response.data);
      console.log("todos las asistencias", response)

    } else {
      console.error("Error al obtener las asistencias");
    }
  }

  const getEventoAll = async () => {
    const response = await eventRespository.getEventGestionAll().catch(() => utils.notificacionError());
    if (response) {
      setEvento(response.data);
      console.log("todos los eventos", response)
    } else {
      console.error("Error al obtener los eventos");
    }
  }


  //////////////////////// notificaciones
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

  const notificacionErrorEncuentro = () => {
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
      title: "No se eligió un encuentro",
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
  /////////////////////// fin Notificaciones


  /////////////////////// limpiar campos ///// aun no implementado
  const clear = () => {
    setErrores({});         // Limpia los errores

    setForm({
      fechaEncuentro: "",
      justificado: false,

    });

    // Desmarca todos los checkboxes en el estado pacientes
    const updatedPacientes = pacientes.map((persona) => ({
      ...persona,
      checked: false,
      justificado: false,
    }));
    setPacientes(updatedPacientes);

  };
  /////////////////////// Fin limpiar campos


  /////////////////////// funciones de asistencia //////////////////////////////////////
  /////////////////////// guardar datos de la asistencia 
  const guardarAsistencia = async () => {

    const newErrors = {};

    if (!form.fechaEncuentro) {
      newErrors.fecha = "Debe elegir un encuentro.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors); // Limpia errores previos si la validación pasa
      return;
    }
    setErrores({}); // Limpiar errores si la validación pasa

    // Verificar si se ha seleccionado un encuentro
    // if (!form.fechaEncuentro) {
    //   return notificacionErrorEncuentro()
    //console.error("No se ha seleccionado ningún encuentro");
    //} else {
    // Construimos el array de asistencia para enviar
    const asistenciaData = pacientes.map((paciente) => ({
      idpersonaep: paciente.idpersona.idpersona,
      estado: paciente.checked ? 'Presente' : 'Ausente',
      idencuentro: form.fechaEncuentro, // el id del encuentro seleccionado
    }));

    console.log("Datos a guardar:", asistenciaData);

    try {
      // Enviar los datos al backend para guardarlos
      const response = await asistenciaRepository.createAsistencia(asistenciaData); // Llamada a tu repositorio
      if (response) {
        console.log("Asistencias guardadas exitosamente");
        setErrores({});         // Limpia los errores

        setForm({
          fechaEncuentro: "",
          justificado: false,

        });

        // Desmarca todos los checkboxes en el estado pacientes
        const updatedPacientes = pacientes.map((persona) => ({
          ...persona,
          checked: false,
          justificado: false,
        }));
        setPacientes(updatedPacientes);
        return notificacionExito();


      } else {
        console.error("Error al guardar asistencias");
        return notificacionError()

      }
    } catch (error) {
      console.error("Error en la solicitud para guardar asistencias", error);
    }
    //}

  };
  //////////////////////// fin guardar datos de la asistencia 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log("id del encuentro", e.target.value);

    //Obtención del Encuentro Seleccionado: Buscas el encuentro seleccionado usando find.
    const selectedEncuentroId = parseInt(e.target.value);

    console.log("id del encuentro", selectedEncuentroId, "todos los eventos", evento);
    const encuentroSeleccionado = encuentro.find(enc => enc.idencuentro === selectedEncuentroId);

    //Conversión de Fechas: Convierte las fechas de los eventos y del encuentro a objetos Date.
    // Cuando se selecciona un nuevo encuentro, verificamos si su fecha está dentro del rango

    if (encuentroSeleccionado) {
      const fechaEncuentro = new Date(encuentroSeleccionado.fecha);

      // Actualizamos los pacientes según si su evento correspondiente cae en el rango de fechas
      const updatedPacientes = pacientes.map((persona) => {
        // Filtramos los eventos por el idpersonaEP correspondiente
        const eventosPersona = evento.filter(ev => ev.idpersonaep === persona.idpersona.idpersona);
        console.log("eventos personsa", eventosPersona);

        //Verificación de la Fecha: Usas some para verificar si la fecha del encuentro cae dentro del rango de fechas de algún evento
        // Verificamos si la fecha del encuentro cae dentro del rango de fechas de algún evento
        const isDateInRange = eventosPersona.some(eventoItem => {
          const fechaDesde = new Date(eventoItem.fechadesde);
          const fechaHasta = new Date(eventoItem.fechahasta);
          console.log("evento", evento, "fecha encuentro", fechaEncuentro, "fecha inicio:", fechaDesde, "fechaFin:", fechaHasta);

          // Comparamos si la fecha del encuentro está dentro del rango de inicio y fin
          return fechaEncuentro >= fechaDesde && fechaEncuentro <= fechaHasta;
        });

        // Si la fecha está dentro del rango, Actualizamos los pacientes con la propiedad "justificado"

        return {
          ...persona,
          justificado: isDateInRange, // Marcamos si la fecha del encuentro está dentro del rango
        };
      });
      setPacientes(updatedPacientes);
    }

  };

  //////////////////// manejador de estados de los checkboxes para crear 
  const handleAsistenciaCheck = (idpersona) => {
    // Actualiza localmente los pacientes antes de hacer setPacientes
    const updatedPacientes = pacientes.map(persona =>
      persona.idpersona === idpersona
        ? { ...persona, checked: !persona.checked }
        : persona
    );

    // Imprime el valor actualizado en la consola
    console.log("asistencia pacientes marcadas", updatedPacientes);

    // Ahora actualiza el estado
    setPacientes(updatedPacientes);
  };

  return (
    <>
      <Container>
        <h1 className="mt-4 mt-md-2 text-center">Asistencia</h1>
        {/**fecha de encuentro*/}
        <div className="col-md-3">
          <FormGroup>
            <label htmlFor="formularioEncuentro" className="control-label">
              Encuentro:
            </label>
            <select
              className="form-select"
              placeholder="Elija el encuentro"
              name="fechaEncuentro"
              id="fechaEncuentro"
              value={form.fechaEncuentro}
              onChange={handleChange}
            >
              <option value="">
                Elija el encuentro
              </option>
              {encuentro.map((element, index) => (
                <option
                  id="idencuentro"
                  key={element.idencuentro}
                  value={element.idencuentro}
                >
                  {utils.convertirFormatoFecha(element.fecha)}
                </option>

              ))}
            </select>
            {errores.fecha && <small className="text-danger">{errores.fecha}</small>}
          </FormGroup>
        </div>
        <br />

        <div className="row m-md-3 shadow mx-md-auto border-top-sm m-0 justify-content-center rounded container-lg ">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">IdPaciente</th>
                <th scope="col">Paciente</th>
                <th scope="col">Asistencia</th>
                <th scope="col">Justificado</th>
              </tr>
            </thead>

            <tbody>
              {pacientes.map((element, index) => (
                <tr key={element.idpersona}>
                  <td>{element.idpersona.idpersona}</td>
                  <td>{element.idpersona.apellido}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="asistencia"
                      id={`asistencia-${element.idpersona}`} // Asigna un ID único al checkbox
                      value={element.idpersona} // Usa el ID de la actividad como valor del checkbox
                      checked={element.checked || false} // Marca la actividad como seleccionada si está en el estado actividadesSeleccionadas
                      onChange={() => handleAsistenciaCheck(element.idpersona)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`justificado-${element.idpersona}`} // Asigna un ID único al checkbox
                      value={element.idpersona} // Usa el ID de la actividad como valor del checkbox
                      checked={element.justificado || false} // Marca la actividad como seleccionada si está en el estado actividadesSeleccionadas
                    // onChange={() => handleAsistenciaJustificado(element.idpersona, element.idencuentro)} // funcion aigual al la virtualidad (encuentro)
                    />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-4" style={{ textAlign: 'center', paddingTop: 38 }}>
            <button type="button" className="btn btn-verde" style={{ width: '40%', marginLeft: 10 }} onClick={() => guardarAsistencia()}>Guardar</button> {/**implementar guardar */}
            <button type="button" className="btn btn-rojo" style={{ width: '40%' }} onClick={() => clear()}>Cancelar</button>  {/**implementar cancelar */}

          </div>
        </div>

      </Container>
    </>
  );
}

export default Asistencia;