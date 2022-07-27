import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import utils from '../../utils/utils';
import { osRepository } from '../../services/osService';
import { obrasocialRepository } from '../../services/obrasocialService';

const ObraSocialModal = (tipo, showModal, handleClose, idEpElegido, getOs, campo) => {

    const [obrasociales, setObraSociales] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        getObrasocial();
        setValue('obrasocial',campo.obrasocial)
    }, [ campo, setValue ]);
    
    // Funcion que obtiene la lista de obras sociales
    const getObrasocial = async () => {
        const response = await obrasocialRepository.getAll().catch(() => undefined);
        if (response) {
            setObraSociales(response.data);
        }
    };

    // Funcion que crea una nueva obra social y la guarda en la base de datos
    const cargarNuevo = async (info) => {
        const data = {
            idpersonaep: idEpElegido,
            idobrasocial: info.obrasocial,
            borrado:"0",
        };
        console.log(data);
        const response = await osRepository.create(data).catch(() => utils.notificacionError());
        if (response) {
            utils.notificacionGuardar();
            reset();
            getOs();
        }
    }

    // Funcion que actualiza una obra social y la guarda en la base de datos
    const guardar = async (info) => {
        const id= campo.idos;
        const data = {
            idpersonaep: idEpElegido,
            idobrasocial: info.obrasocial,
            borrado:"0",
        };
        const response = await osRepository.update(id, data).catch(() => utils.notificacionError());
        if (response) {
            utils.notificacionGuardar();
            reset();
            getOs();
            handleClose(false);
        }
    }

    // Funcion que envia el formulario validado y elige la funcion a ejecutar
    const customSubmit = (data) => {
        console.log(data);
        if (tipo === 'crear') {
            cargarNuevo(data);
        } else {
            guardar(data);
        }
    }

    // Funcion que cierra el modal
    const close = () => {
        reset();
        handleClose(false);
    }

    
        return (
            <Modal isOpen={showModal} backdrop="static">
                <ModalHeader toggle={() => close()}>
                    {(tipo === 'crear') ? 'Cargar Obra Social' : 'Editar Obra Social'}
                </ModalHeader>
                <ModalBody style={{backgroundColor:"#f1f1ff"}}>
                    <form className='container'>
                        <div className='row'>
                            <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                <label className="col-form-label">Obra Social</label>
                                <select
                                    type="text"
                                    className="form-select"
                                    {...register ("obrasocial",{
                                        required: {
                                            value: true,
                                            message: "Debe seleccionar una opción"
                                        }
                                    })}
                                >
                                    <option value="">Elegir</option>
                                    {obrasociales &&
                                        obrasociales.map((obrasocial, index) => (
                                            <option
                                                value={obrasocial.idobrasocial}
                                                key={index}
                                                >
                                                {obrasocial.nombre}
                                            </option>
                                        ))}
                                </select>
                                {errors["obrasocial"] && <small className="field-error">{errors["obrasocial"].message}</small>}
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-verde" onClick={handleSubmit(customSubmit)}>Confirmar</button>
                    <button type="submit" className="btn btn-rojo" onClick={() => close()}>Cancelar</button>
                </ModalFooter>
            </Modal>
        );
}
 
export default ObraSocialModal;