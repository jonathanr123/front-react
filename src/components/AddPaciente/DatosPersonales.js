import React, { Component } from "react";

class DatosPersonales extends Component {
  detectarCambio(field, e) {
    console.log(field + e.target.value);
    let campo = this.props.state.campo;
    campo[field] = e.target.value;

    // Cambio de estado de campo
    this.setState({
      campo,
    });

    console.log(this.props.state);
  }

  fechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    if (mes < 10) {
      mes = "0" + mes;
    }
    return anio + "-" + mes + "-" + dia;
  }

  render() {
    const tipo = this.props.tipo;
    return (
      <div className="container">
        <div className="row">
          <h3 className=" mt-4">Datos Personales</h3>
          <hr />
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              id={"nombre" + tipo}
              aria-describedby={"nombre" + tipo + "Help"}
              onChange={this.detectarCambio.bind(this, "nombre" + tipo)}
              value={this.props.state.campo["nombre" + tipo] || ""}
            />
            <span style={{ color: "red" }}>
              {this.props.state.error["nombre" + tipo]}
            </span>
          </div>

          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className=" col-form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              id={"apellido" + tipo}
              aria-describedby={"apellido" + tipo + "Help"}
              onChange={this.detectarCambio.bind(this, "apellido" + tipo)}
              value={this.props.state.campo["apellido" + tipo] || ""}
            />
            <span style={{ color: "red" }}>
              {this.props.state.error["apellido" + tipo]}
            </span>
          </div>

          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className=" col-form-label">Sexo</label>
            <select
              className="form-select"
              id={"sexo" + tipo}
              onChange={this.detectarCambio.bind(this, "sexo" + tipo)}
              value={this.props.state.campo["sexo" + tipo] || ""}
            >
              <option value="">Sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            <span style={{ color: "red" }}>
              {this.props.state.error["sexo" + tipo]}
            </span>
          </div>

          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className=" col-form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              placeholder="Fecha de Nacimiento"
              id={"nacimiento" + tipo}
              aria-describedby={"nacimiento" + tipo + "Help"}
              onChange={this.detectarCambio.bind(this, "nacimiento" + tipo)}
              value={this.props.state.campo["nacimiento" + tipo] || ""}
              max={this.fechaActual()}
            />
            <span style={{ color: "red" }}>
              {this.props.state.error["nacimiento" + tipo]}
            </span>
          </div>

          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3 ">
            <label className=" col-form-label ">Telefono</label>
            <input
              type="number"
              className="form-control"
              placeholder="Telefono"
              id={"telefono" + tipo}
              aria-describedby={"telefono" + tipo + "Help"}
              onChange={this.detectarCambio.bind(this, "telefono" + tipo)}
              value={this.props.state.campo["telefono" + tipo] || ""}
            />
            <span style={{ color: "red" }}>
              {this.props.state.error["telefono" + tipo]}
            </span>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DatosPersonales;
