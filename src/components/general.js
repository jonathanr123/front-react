
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


import { Link } from "react-router-dom";


let path = '#kk';
const dataTable = [
    {
      name:    'Carolina',
      position: " Mendez",
      office: "Edinburgh",
      start_date: "13/5/2019",
      end_date: "3/06/2019",
      manual: <input type="checkbox" checked></input>  ,
      button: 
      // <Link to="/comportamiento">
      //         <button
                
      //           variant="outline-primary">{" "}Next</button>{" "}
      //       </Link>
      
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes"
          
          onClick={(e) =>  window.location.href = "/comportamiento" +"#"+"Carolina"+"Mendez"}
        size="sm"
          >
           añadir comportamiento
           </button>,
          },
          {
      name:    'Lorena',
      position: " Architect",
      manual: <input type="checkbox" ></input>  ,
      button: 
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes"
          onClick={(e) =>  window.location.href = "/comportamiento" +"#"+"Lorena"+"Architect"}
          >
           añadir comportamiento
           </button>,
      start_date: "13/5/2019",
     
          },
    {
      name: "Tiger ",
       position: " Nixob",
      office: "Vanguard",
      manual: <input type="checkbox" ></input>  ,
      button: 
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes"
          onClick={(e) =>  window.location.href = "/comportamiento" +"?"+"Tiger"+"Nixob"}>
           añadir comportamiento
           </button>,
      start_date: "3/06/2019",
     
    },
    {
      name: "Lurdes ",
      position: "Nixon",
      office: "LCIGP",
      manual: <input type="checkbox" checked></input> ,
      button: 
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes"
          onClick={(e) =>  window.location.href = "/comportamiento" +"?"+"Lurdes"+"Nixon"}>>
           añadir comportamiento
           </button>,
      start_date: "13/5/2019",
      
    },
    {
      name: "Lola ",
     position: "Niksa",
     manual: <input type="checkbox" ></input>  ,
     button: 
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes"
          onClick={(e) =>  window.location.href = "/comportamiento" +"?"+"Lola"+"Niksa"}>
           añadir comportamiento
           </button>,
      office: "Viratec 9",
      start_date: "13/5/2019",
      
    },
    
   
  ];

  export default dataTable ;