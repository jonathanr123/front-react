import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function Events() {
  return (
    <div className="container">
      <form id="myForm">
        <main className="justify-content-center row container-lg form-paciente m-md-3 shadow mx-md-auto border-top-sm m-0">
          <h1 className="mt-4 mt-md-2 text-center">Gestion de eventos</h1>
          <h3 className="ms-4 text-center">Eventos</h3>
          <div className="row">
            <div className="form-grup mb-4">
              <label htmlFor="startDate" className="control-label">
                Fecha de inicio
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="form-control"
                placeholder="Fecha de inicio"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-grup mb-4 ">
              <label htmlFor="finishDate" className="control-label">
                Fecha de finalizacion
              </label>
              <input
                type="date"
                name="finishDate"
                id="finishDate"
                className="form-control"
                placeholder="Fecha de finalizacion"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-grup">
              <label htmlFor="motive" className="control-label">
                Motivo
              </label>
              <textarea
                type="text"
                name="motive"
                id="motive"
                className="form-control"
              ></textarea>
            </div>
          </div>
          <br></br>
          <h3 className=" mt-4 ms-4 text-center">Tipo de Evento</h3>
          <div className="row">
            <div className="form-grup mb-4">
              <label htmlFor="nameTaller" className="control-label">
                Nombre del tipo de evento
              </label>
              <input
                type="text"
                name="nameTaller"
                id="fininameTallershDate"
                className="form-control"
                placeholder="Ejemplo movilidad impedida"
              />
            </div>
          </div>
          <div className="row">
            <div className=" justify-content-center  d-flex mb-4">
              <button type="submit" className="btn btn-primary" value="Submit">
                Agregar
              </button>
            </div>
          </div>
        </main>
      </form>
    </div>
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th scope="col">#</th>
    //           <th scope="col">Fecha del evento</th>
    //           <th scope="col">Motivo</th>
    //           <th scope="col">Accion</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <th scope="row">1</th>
    //           <td>12/11/2021</td>
    //           <td>Motivo</td>
    //           <td>
    //             <button type="button" className="btn btn-success me-1">
    //               Editar
    //             </button>
    //             <button type="button" className="btn btn-danger">
    //               Eliminar
    //             </button>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
  );
}
export default Events;
