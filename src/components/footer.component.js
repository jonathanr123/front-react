import React from 'react';
import logo from "../images/logo.png";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <img className="logo" src={logo} alt="logo de telepark" />
                <p>Sobre Telepark</p>
                <p>Informacion Adicional</p>
                <p>Contacto</p>
            </footer>
        )
    }
}
export default Footer;