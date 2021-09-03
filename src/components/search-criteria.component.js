import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Search extends React.Component {
    render() {
        return (
            <main className="border-top-sm m-0 row justify-content-center m-md-3 rounded shadow container-lg mx-md-auto">
                <div>
                    <label id="name" htmlFor="">Nombre</label>
                    <input type="text" name="" id="name" />
                </div>
                <div>
                    <label id="lastName" htmlFor="">Apellido</label>
                    <input type="text" name="" id="lastName" />
                </div>
                <table className="table-secondary">
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                </table>
            </main>
        )
    }
}
export default Search;