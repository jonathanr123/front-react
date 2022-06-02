import React from "react";
import logo from "../images/logo.png";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <img className="logo" src={logo} alt="logo de telepark" />
        <p>Informacion Adicional</p>
      </footer>
    );
  }
}
export default Footer;
