import {
    Col,
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    Container,
    div,
    Row,
    FormGroup,
    CardBody,
  
  } from "reactstrap";

  import {useState} from 'react'; //2


// function Example() {
  const Example = (mensaje) => {
    
    const [lgShow, setLgShow] = useState(false);
   // Toggle for Modal
   const toggle = () => setLgShow(!lgShow);
   const handleClose = () => setLgShow(false);
   const toggle2 = () =>  
     // return true, 
     window.print();
  //  setLgShow(window.print(ModalHeader));
  //  const print= () => window.print(false);

    return (
      <>
      
        {/* <Button onClick={() => setLgShow(true)}>Large modal</Button> */}
        
        {/* <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Large Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal> */}
        <div 
        // style={{
        //     display: 'block', width: 700, padding: 30
        // }}
        >
        
            <Button color="primary"
             className="mb-3 col-3 btn btn-success col-md-3 col-xl-2 "
             style={{ float: "right", margin: 5 }}
                onClick={toggle}>Guarda</Button>
            <Modal isOpen={lgShow} toggle={toggle} id="prin" data-toggle="modal" >
                <ModalHeader 
                    toggle={toggle}>Se guardó la observación</ModalHeader>
                <ModalBody>
                  <b>Nombre:</b><>&nbsp;</>{mensaje.nom}
                  <br></br>
                  <b> Unidad Observable:</b><>&nbsp;</>{mensaje.uo}
                    <br></br>
                    <b>Variable de unidad de observación:</b><>&nbsp;</>{mensaje.va}
                    <br></br>
                    <b>Valor:</b><>&nbsp;</>{mensaje.val}
                    <br></br>
                      
                </ModalBody>
                <ModalFooter>
                  
                    <Button color="primary" 
                    // onClick={toggle}
                    data-dismiss="modal"
                    onClick={handleClose}
                    // onClick={(e) => (window.location.href =  mensaje.dir)}
                    
                      >Ok</Button>
                      <Button color="primary" id="btnPrint" onClick={toggle2}
                      >imprimir</Button> 
                </ModalFooter>
            </Modal>
            
        </div >
      </>
    );
  } 
  
  // render(<Example />);
  export default Example;
