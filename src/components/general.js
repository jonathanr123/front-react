



const dataTable = [
    {
      name:    'Carolina',
      position: " Mendez",
      office: "Edinburgh",
      start_date: "13/5/2019",
      end_date: "3/06/2019",
      manual: <input type="checkbox" checked></input>  ,
      button: 
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes"
          onClick={(e) => window.location.href = "/comportamiento"}
          size="sm">
           añadir comportamiento
           </button>,
          },
          {
      name:    'Lorena',
      position: " Architect",
      manual: <input type="checkbox" ></input>  ,
      button: 
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes">
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
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes">
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
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes">
           añadir comportamiento
           </button>,
      start_date: "13/5/2019",
      
    },
    {
      name: "Tiger ",
     position: "Nixon",
     manual: <input type="checkbox" ></input>  ,
     button: 
          <button className="btn btn-warning" xs="14"  style={{ marginTop: 10 , marginBottom:0}} color="succes">
           añadir comportamiento
           </button>,
      office: "Viratec 9",
      start_date: "13/5/2019",
      
    },
    
   
  ];

  export default dataTable ;