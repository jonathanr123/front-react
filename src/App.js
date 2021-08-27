import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AddPaciente from "./components/add-paciente.component";
import ListaDiagnostico from "./components/list-diagnostico.component";
import logo from "./images/logo.png";
import Footer from "./components/footer.component";
import Login from "./components/login.component";

class App extends Component {
  render() {
    return (
      <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img className="logo" src={logo} alt="logo de telepark" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav text-center text-md-start ps-md-3">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Conoce al paciente</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Información al paciente</Link>                                
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Cartilla de taller</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Novedades</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Contacto</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>Iniciar Sesión</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/add-paciente"]} component={AddPaciente}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/list-diagnostico" component={ListaDiagnostico}/>
              </Switch>
            </div>

            <Footer/>
      </Router>
    );
  }
}

export default App;