import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AddPaciente from "./components/add-paciente.component";
import FichaMedica from "./components/fichaMedica.component";
import ListaDiagnostico from "./components/list-diagnostico.component";
import ListaEvolucion from "./components/list-evolucion.component";
import ListaObraSocial from "./components/list-obrasocial.component";
import ListaIndicacion from "./components/list-indicacion.component";
import Footer from "./components/footer.component";
import Login from "./components/login.component";
import Search from "./components/search-criteria.component";
import Events from "./components/gestion-eventos.component";
import TypeEvents from "./components/tipos-de-eventos.component";

import ListaPaciente from "./components/list-pacientesEp.component";

import Sidebar from "./components/sidebar.component";

//Redux
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <nav className="navbar navbar-expand navbar-light bg-light">
            <div
              className="container-fluid"
              style={{ justifyContent: "right" }}
            >
              <ul className="navbar-nav text-center text-md-start ps-md-3">
                <li className="nav-item">
                  <Link to={"/login"}>
                    <button className="btn btn-primary" to={"/login"}>
                      Iniciar Sesión
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Sidebar></Sidebar>

          <div className="container">
            <div className="row">
              <div>
                <Switch>
                  <Route
                    exact
                    path={["/add-paciente"]}
                    component={AddPaciente}
                  />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/ficha" component={FichaMedica} />
                  <Route
                    exact
                    path="/list-diagnostico"
                    component={ListaDiagnostico}
                  />
                  <Route
                    exact
                    path="/list-evolucion"
                    component={ListaEvolucion}
                  />
                  <Route
                    exact
                    path="/list-obrasocial"
                    component={ListaObraSocial}
                  />
                  <Route
                    exact
                    path="/list-indicacion"
                    component={ListaIndicacion}
                  />
                  <Route exact path="/search" component={Search} />
                  <Route
                    exact
                    path="/list-pacientes"
                    component={ListaPaciente}
                  />
                  <Route exact path="/events" component={Events} />
                  <Route exact path="/type-events" component={TypeEvents} />
                </Switch>
              </div>
            </div>
          </div>

          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
