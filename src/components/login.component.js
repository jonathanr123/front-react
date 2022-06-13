import React from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { authRepository } from "../services/auth.service";
import { TokenService } from "../services/token.service";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // Defino los estados locales
    this.state = {
      campo: {},
    };
  }

  // Valido los campos del formulario
  validarFormulario() {
    let campo = this.state.campo;
    let formularioValido = true;
    this.props.loginRequest(campo);
    this.props.history.push("/");
    // user
    if (!campo["user"]) {
      formularioValido = false;
    }

    // Pass
    if (!campo["pass"]) {
      formularioValido = false;
    }

    return formularioValido;
  }

  // Una vez que los campos del formulario han sido llenado correctamente
  // Mostramos un mensaje al usuario diciendo: 'Mensaje Enviado Satisfactoriamente !'
  enviarFormulario(e) {
    e.preventDefault();

    // Si la validación de los campos del formulario ha sido realizada
    if (this.validarFormulario()) {
      // Cambio el estado de 'enviado' a 'true'
      this.setState({ enviado: true });

      // Muestro el mensaje que se encuentra en la función mensajeEnviado()
      return this.send();
    } else {
      return this.errorSend();
    }
  }

  // Detectamos cuando un campo del formulario es llenado y por ende cambia de estado
  detectarCambio(field, e) {
    let campo = this.state.campo;
    campo[field] = e.target.value;

    // Cambio de estado de campo
    this.setState({
      campo,
    });
  }

  send(data) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Acceso Permitido",
      showConfirmButton: false,
      timer: 1500,
    });

    if (data.is_superuser === true) {
      setTimeout(() => {
        window.location.href = "/list-usuarios";
        }, 1500);
    } else {
      setTimeout(() => {
        window.location.href = "/add-paciente";
        }, 1500);
    }
    
  }

  errorSend() {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "No se permite el acceso",
      text: "El nombre de usuario o la contraseña ingresada son incorrectos.",
      confirmButtonText: "OK",
    });

    this.setState({
      campo: {
        user: "",
        pass: "",
      },
    });
  }

  render() {
    const loginFunction = async () => {
      let response = await authRepository.login({
        username: this.state.campo.user,
        password: this.state.campo.pass,
      }).catch((error) => {this.errorSend()});

      if (response) {
      console.log("===>", response.data.access);
      TokenService.setUser(response.data);

      this.send(response.data);
      }
    };

    if (TokenService.getLocalAccessToken() && TokenService.getRole() === true) return <Redirect to="/list-usuarios" />;
    if (TokenService.getLocalAccessToken() && TokenService.getRole() !== true) return <Redirect to="/add-paciente" />;

    return (
      <form onSubmit={this.enviarFormulario.bind(this)}>
        <main
          className="border-top-sm m-0 row justify-content-center form-paciente m-md-3 rounded shadow container-lg mx-md-auto"
          style={{ height: "80vh" }}
        >
          <div className="justify-content-center">
            <h2 className="mt-4 mt-md-2 text-center">Login</h2>
            <hr />
            <div className="container">
              <div className="row">
                <div className="w-100"></div>
                <div className="col-12 col-md-3 col-lg-4 col-xl-4"></div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-4" style={{textAlign:"center"}}>
                  <label className="col-form-label" style={{float:"left"}}>Usuario</label>
                  <input
                    name="user"
                    type="text"
                    className="form-control"
                    placeholder="Ingrese su usuario"
                    id="user"
                    aria-describedby="user"
                    onChange={this.detectarCambio.bind(this, "user")}
                    value={this.state.campo["user"] || ""}
                  />
                  <label
                    className="col-form-label"
                    style={{ marginTop: "20px", float:"left" }}
                  >
                    Contraseña
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Ingrese su Contraseña"
                    id="pass"
                    aria-describedby="pass"
                    onChange={this.detectarCambio.bind(this, "pass")}
                    value={this.state.campo["pass"] || ""}
                  />

                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginTop: "20px" }}
                    onClick={() => loginFunction()}
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <div className="col-12 col-md-3 col-lg-4 col-xl-4"></div>
              </div>
            </div>
          </div>
        </main>
      </form>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   login: (data) => dispatch(setAuthUser(data)),
// });

// const mapStateToProps = (state, ownProps) => ({

// })

export default Login;
