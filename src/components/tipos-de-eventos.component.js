import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function TypeEvents() {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Desactivar Taller</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>12/11/2021</td>
            <td>Motivo</td>
            <td>
              <button type="button" className="btn btn-primary me-1">
                Editar
              </button>
              <button type="button" className="btn btn-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default TypeEvents;
