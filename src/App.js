import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
import Nomenclador from "./components/nomenclador.component";
import ListaPaciente from "./components/list-pacientesEp.component";
import Sidebar from "./components/sidebar.component";
import { TokenService } from "./services/token.service";

class App extends Component {
  
  //arrow function para logout
  logout = () => {
    TokenService.removeUser()
    window.location.href = "/";
  }

  render() {
    const token = TokenService.getLocalAccessToken();
    const username = TokenService.getUsername();
    return (
      
      <Router>
        {token ? (
        <span>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="container-fluid" style={{ justifyContent: "right"}}>
            <h4 style={{ marginBottom:"0px"}}><b>Bienvenido: </b>{username}</h4>
          </div>
        </nav>
        
        <Sidebar></Sidebar>
        </span>
        ):('')}
        <div className="container">
          <div className="row">
            <div>
              <Switch>
                <Route exact path="/" component={Login} />
                {token ? (
                  <span>
                  <Route exact path={["/add-paciente"]} default component={AddPaciente} />
                  <Route exact path="/ficha" component={FichaMedica} />
                  <Route exact path="/list-diagnostico" component={ListaDiagnostico} />
                  <Route exact path="/list-evolucion" component={ListaEvolucion} />
                  <Route exact path="/list-obrasocial" component={ListaObraSocial} />
                  <Route exact path="/list-indicacion" component={ListaIndicacion} />
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/list-pacientes" component={ListaPaciente} />
                  <Route exact path="/nomenclador" component={Nomenclador} />
                  <Route exact path="/events" component={Events} />
                  <Route exact path="/type-events" component={TypeEvents} />
                  </span>
                ):(<Redirect to="/" />)}
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
