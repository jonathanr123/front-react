import React, { Component } from "react";

class Vivienda extends Component {
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

  render() {
    const tipo = this.props.tipo;
    return (
      <div className="container">
        <div className="row">
          <h3 className="mt-4">Datos de Vivienda</h3>
          <hr />
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Provincia</label>
            <div>
              <select
                className="form-select"
                id={"provincia" + tipo}
                onChange={this.detectarCambio.bind(this, "provincia" + tipo)}
                value={this.props.state.campo["provincia" + tipo] || ""}
              >
                <option value="">Provincia</option>
                {this.props.arrayProvincias &&
                  this.props.arrayProvincias.map((provincia, index) => (
                    <option value={provincia.provincia} key={index}>
                      {provincia.provincia}
                    </option>
                  ))}
              </select>
              <span style={{ color: "red" }}>
                {this.props.state.error["provincia" + tipo]}
              </span>
            </div>
          </div>
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Municipio</label>
            <div>
              <select
                className="form-select"
                id={"municipio" + tipo}
                onChange={this.detectarCambio.bind(this, "municipio" + tipo)}
                value={this.props.state.campo["municipio" + tipo] || ""}
              >
                <option value="">Municipio</option>
                {this.props.municipios &&
                  this.props.municipios
                    .filter(
                      (municipio) =>
                        municipio.provincia ===
                        this.props.state.campo["provincia" + tipo]
                    )
                    .map((municipio, index) => (
                      <option value={municipio.idmunicipio} key={index}>
                        {municipio.nombre}
                      </option>
                    ))}
              </select>
              <span style={{ color: "red" }}>
                {this.props.state.error["municipio" + tipo]}
              </span>
            </div>
          </div>
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Localidad</label>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Localidad"
                id={"localidad" + tipo}
                aria-describedby={"localidad" + tipo + "Help"}
                onChange={this.detectarCambio.bind(this, "localidad" + tipo)}
                value={this.props.state.campo["localidad" + tipo] || ""}
              />
              <span style={{ color: "red" }}>
                {this.props.state.error["localidad" + tipo]}
              </span>
            </div>
          </div>
          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Calle</label>
            <div>
              <input
                type="number"
                className="form-control"
                placeholder="Calle"
                id={"calle" + tipo}
                aria-describedby={"calle" + tipo + "Help"}
                onChange={this.detectarCambio.bind(this, "calle" + tipo)}
                value={this.props.state.campo["calle" + tipo] || ""}
              />
              <span style={{ color: "red" }}>
                {this.props.state.error["calle" + tipo]}
              </span>
            </div>
          </div>

          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Numero</label>
            <div>
              <input
                type="number"
                className="form-control"
                placeholder="Numero"
                id={"numero" + tipo}
                aria-describedby={"numero" + tipo + "Help"}
                onChange={this.detectarCambio.bind(this, "numero" + tipo)}
                value={this.props.state.campo["numero" + tipo] || ""}
              />
              <span style={{ color: "red" }}>
                {this.props.state.error["numero" + tipo]}
              </span>
            </div>
          </div>

          <div className="mb-4 col-12 col-md-6 col-lg-4 col-xl-3">
            <label className="col-form-label">Piso</label>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Piso"
                id={"piso" + tipo}
                aria-describedby={"piso" + tipo + "Help"}
                onChange={this.detectarCambio.bind(this, "piso" + tipo)}
                value={this.props.state.campo["piso" + tipo] || ""}
              />
              <span style={{ color: "red" }}>
                {this.props.state.error["piso" + tipo]}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Vivienda;
