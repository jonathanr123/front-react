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
                <div className="container" class="Submenu">
                    <div className="row">
                        <nav id="navbar-example3" class="navbar navbar-light bg-light flex-column align-items-stretch p-3 col-2 ">
                            <a class="navbar-brand text-center" href="#">Menu</a>
                            <nav class="nav nav-pills flex-column ">
                                <Link className="nav-link text-dark" to={"/add-paciente"}>Ingresar/Modificar person con EP</Link>
                                <nav class="nav nav-pills flex-column">
                                    <a class="nav-link ms-3 my-1 text-secondary" href="#item-1-1">Criterio de busqueda</a>
                                    <a class="nav-link ms-3 my-1 text-secondary" href="#item-1-2">Ingresar/Modificar datos personales</a>
                                </nav>
                                <Link className="nav-link text-dark" to={"/"}>Ingresar/Modificar familiar</Link>
                                <Link className="nav-link text-dark" to={"/list-diagnostico"}>Ingresar ficha medica persona con EP</Link>
                                <nav class="nav nav-pills flex-column">
                                    <a class="nav-link ms-3 my-1 text-secondary" href="#item-3-1">Item 3-1</a>
                                    <a class="nav-link ms-3 my-1 text-secondary" href="#item-3-2">Item 3-2</a>
                                </nav>
                                <a class="nav-link" href="#item-3"></a>
                                <Link className="nav-link text-dark" to={"/"}>Ingresar/Modificar Evolucion</Link>
                            </nav>
                        </nav>
                    </div>
                </div>

                <div className="container mt-3">
                    <div className="row">
                        <div>
                            <Switch>
                                <Route exact path={["/", "/add-paciente"]} component={AddPaciente} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/list-diagnostico" component={ListaDiagnostico} />
                            </Switch>
                        </div>
                    </div>
                </div>
                <Footer />
            </Router>
        );
    }
}

export default App;