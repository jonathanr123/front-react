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


const Consulta = () => {

  const [taller, setTaller] = useState([]);
  const [encuentro, setEncuentro] = useState([]);
  const [act, setAct] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [asistencia, setAsistencia] = useState([]);
  const [faltaC, setFaltaC] = useState([]);

  const [mensajeSinDatos, setMensajeSinDatos] = useState(false); // Nuevo estado para controlar el mensaje
  const [mensajeSinDatosFC, setMensajeSinDatosFC] = useState(false); // Nuevo estado para controlar el mensaje
  const [errores, setErrores] = useState({});

  const [evento, setEvento] = useState([]);

  const [form, setForm] = useState({
    fechaEncuentro: "",
    persona: "",
    asistencia: "",
    justificado: "",
  });

  useEffect(() => {
    getTallerAll();
    getActividades();
    getEncuentroAll();
    getPacientes();
    // getAsistencia();
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
      console.log("todos los pacientes", pacientes)

    } else {
      console.error("Error al obtener los pacientes");
    }
  }

  /*const getAsistencia = async () => {
    const response = await asistenciaRepository.getAsistenciaAll().catch(() => utils.notificacionError());
    if (response) {
      setAsistencia(response.data);
      console.log("todos las asistencias", response)

    } else {
      console.error("Error al obtener las asistencias");
    }
  }
*/
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
    setForm({
      idtaller: 0,
      input_nombre: "",
      tipotallerid: 0
    });

  };
  /////////////////////// Fin limpiar campos


  /////////////////////// funciones de asistencia //////////////////////////////////////
  /////////////////////// consultar asistencia y faltas consecutivas
  const consultarAsistencia = async () => {
    const newErrors = {};
    if (!form.fechaEncuentro) {
      newErrors.fecha = "Debe elejir un encuentro.";
    } 
    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors); // Limpia errores previos si la validación pasa
      setAsistencia([]);

      return;
    }
    setErrores({}); // Limpiar errores si la validación pasa

    console.log("listar asistencia id del ecnuentro: ", form.fechaEncuentro);
    //con la fechaEncuentra que contiene el id del encuentro traer las asstencias correspondiente  

    try {
      const response = await asistenciaRepository.getAsistenciaByEncuentro(form.fechaEncuentro);
      const datosAsistencia = response.data;

      setAsistencia(datosAsistencia);

      // Muestra el mensaje solo si no hay datos de asistencia
      setMensajeSinDatos(datosAsistencia.length === 0);

    } catch (error) {
      console.error("Error al obtener los datos de asistencia:", error);
      setAsistencia([]);
      setMensajeSinDatos(true); // En caso de error, también muestra el mensaje
    }
  };

  const consultarFaltasC = async () => {
    try {
      // Obtener todas las asistencias
      const response = await asistenciaRepository.getAsistenciaAll();
      const asistencias = response.data;
      console.log("asitencias", asistencias);

      // Obtener todas las asistencias
      const responsePacientes = await pacienteRepository.getPacientes();
      const pacientes = responsePacientes.data;
      console.log("pacientes", pacientes);

      // Obtener información de los encuentros (para ordenar por fecha)
      const responseEncuentros = await encuentroRepository.getEncuentroAll();
      const encuentros = responseEncuentros.data;
      console.log("encuentros", encuentros);

      // Ordenar encuentros por fecha (del más reciente al más antiguo)
      const encuentrosOrdenados = encuentros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      console.log("encuentros ordenados", encuentrosOrdenados);

      const ultimosDosEncuentros = encuentrosOrdenados.slice(0, 2).map((enc) => enc.idencuentro);
      console.log("ultimos dos encuentros", ultimosDosEncuentros);

      // Filtrar asistencias de los últimos dos encuentros
      const asistenciasFiltradas = asistencias.filter((asistencia) =>
        ultimosDosEncuentros.includes(asistencia.idencuentro) && asistencia.estado === "Ausente"
      );
      console.log("ultimas dos asistencias", asistenciasFiltradas);

      // Agrupar asistencias por paciente
      const faltasPorPaciente = asistenciasFiltradas.reduce((acc, asistencia) => {
        const { idpersonaep } = asistencia;
        if (!acc[idpersonaep]) {
          acc[idpersonaep] = 0;
        }
        acc[idpersonaep]++;
        return acc;
      }, {});

      console.log("faltas por paciente", faltasPorPaciente);

      // Filtrar pacientes con faltas en ambos encuentros
      const pacientesConFaltasConsecutivas = Object.entries(faltasPorPaciente)
        .filter(([_, count]) => count === 2)
        .map(([idpersonaep]) => idpersonaep);

      console.log("pacientes con faltas consecutivas", pacientesConFaltasConsecutivas);

      // Obtener datos de pacientes para mostrar nombres
      const pacientesFiltrados = pacientes.filter((paciente) =>
        pacientesConFaltasConsecutivas.includes(String(paciente.idpersona.idpersona))
      );
      console.log(pacientesFiltrados);

      // Actualizar estado para mostrar resultados
      setFaltaC(pacientesFiltrados);
      console.log("datos de pacientes con faltas", faltaC);
      setMensajeSinDatosFC(pacientesFiltrados.length === 0);


    } catch (error) {
      console.error("Error al consultar faltas consecutivas:", error);
    }

  };

  //////////////////////// fin consultar asistencia y faltas consecutivas

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log("id del encuentro", e.target.value);

    //Obtención del Encuentro Seleccionado: Buscas el encuentro seleccionado usando find.
    const selectedEncuentroId = parseInt(e.target.value);

    const encuentroSeleccionado = encuentro.find(enc => enc.idencuentro === selectedEncuentroId);
    console.log("id del encuentro", encuentroSeleccionado);

  };

  const obtenerNombre = (idpersonaep) => {
    console.log("que tiene pacientes", pacientes, idpersonaep);

    const paciente = pacientes.find((p) => p.idpersona.idpersona === idpersonaep);
    console.log("que paciente??", paciente);

    return paciente 
    ? `${paciente.idpersona.nombre} ${paciente.idpersona.apellido}` 
    : "Desconocido";  };

  return (
    <>
      <Container>
        <h1 className="mt-4 mt-md-2 text-center">Consultas</h1>

        {/* Primer cuadro con sombra que agrupa la lista de asistencia e inasistencia */}
        <div className="row m-md-3 mx-auto justify-content-center rounded container-lg shadow p-4" style={{ backgroundColor: 'white' }}>

          {/* selección del encuentro */}
          <div className="col-md-6">
            <FormGroup>
              <select
                className="form-select"
                name="fechaEncuentro"
                id="fechaEncuentro"
                onChange={handleChange}
              >
                <option value="">Elija el encuentro</option>
                {encuentro.map((element) => (
                  <option key={element.idencuentro} value={element.idencuentro}>
                    {utils.convertirFormatoFecha(element.fecha)}
                  </option>

                ))}

              </select>
              {errores.fecha && <small className="text-danger">{errores.fecha}</small>}

              {console.log("id del encuentro seleccionado para consultas: ", form.fechaEncuentro)}

            </FormGroup>

          </div>

          {/* Componente de asistencia */}
          <div className="mb-4 col-12 col-md-8 p-4 rounded shadow-sm" style={{ backgroundColor: 'white' }}>
            {/* Encabezado */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <spam>Listado de asistencia</spam>
              <button type="button" className="btn btn-verde" style={{ width: '40%' }} onClick={() => consultarAsistencia()}>
                Consultar
              </button>
            </div>

            {/* Tabla de asistencia */}
            <div className="col-12">
              {asistencia.length > 0 ? (
                <table className="table table-hover table-striped text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Nombre</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asistencia.map((item) => (
                      <tr key={item.idAsistenciaTaller}>
                        <td>{obtenerNombre(item.idpersonaep)}</td> {/* Asume que `persona` tiene el campo `nombre` */}
                        <td>{item.estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (

                mensajeSinDatos && (
                  <p className="text-center text-muted">No hay datos de asistencia disponibles.</p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Segundo cuadro con sombra para el listado de faltas consecutivas */}
        <div className="row m-md-3 mx-auto justify-content-center rounded container-lg shadow p-4" style={{ backgroundColor: 'white' }}>

          <div className="mb-4 col-12 col-md-8 p-4 rounded shadow-sm" style={{ backgroundColor: 'white' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>Lista de pacientes con faltas consecutivas</span>
              <button type="button" className="btn btn-verde" style={{ width: '40%' }} onClick={() => consultarFaltasC()}>
                Consultar</button>
            </div>

            <div className="col-12">
              {faltaC.length > 0 ? (
                <table className="table table-hover table-striped text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faltaC.map((paciente) => (
                      <tr key={paciente.idpersona}>
                        <td>{paciente.idpersona.nombre} {paciente.idpersona.apellido}</td> {/* Ajusta con el campo real del nombre */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                mensajeSinDatosFC && (
                  <p className="text-center text-muted">No hay datos de pacientes con faltas consecutivas.</p>
                ))}
            </div>

          </div>
        </div>
      </Container>


    </>
  );
}

export default Consulta;
