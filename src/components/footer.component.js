import React from 'react';
import logoTelepark from "../images/logoTelepark2.png";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <img className="logo" src={logoTelepark} style={{width:"250px"}}alt="logo de telepark" />
            </footer>
        )
    }
}
export default Footer;
