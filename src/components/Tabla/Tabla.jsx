import axios from "axios";
import React, { useState } from "react";
import Modal from "../Modal/Modal";

const Tabla = ({informacion = []}) => {
    
    const [activeModal,setActiveModal] = useState(false)
    const [idInfo,setIdInfo] = useState()

    //console.log(informacion)

    const transformDate = (date) => {
        let dateDivided = date.split("T")[0]

        return `${dateDivided[0]}${dateDivided[1]}${dateDivided[2]}${dateDivided[3]}/${dateDivided[4]}${dateDivided[5]}/${dateDivided[6]}${dateDivided[7]}`
    }

    const searchID = (id) => {
        axios.get(`https://api.datos.gob.mx/v1/condiciones-atmosfericas?_id=${id}`).then(res => {
            setIdInfo(Object.entries(res.data.results[0]))
            setActiveModal(true)
        }).catch(error => {
            console.error(error)
        })
    }
    
    return(
        <div>
            <Modal active={activeModal} onCloseModal={() => setActiveModal(false)}>
                <>
                {
                    idInfo?
                    <div>
                    {
                        idInfo.map(e => {
                            return(
                                <div>
                                    <span style={{fontWeight: 600, color:"darkcyan"}}>{e[0]}</span>: {e[1]}
                                </div>
                            )
                        })   
                    }
                    </div>
                    :
                    <></>
                }
                </>
            </Modal>
        {
            informacion.length?
            <div data-testid="step-1">
                <table className="tabla">
                    <tr className="encabezado">
                        <td>ID</td>
                        <td>ID CIUDAD</td>
                        <td>NOMBRE</td>
                        <td>ESTADO</td>
                        <td>PROBABILIDAD DE PRECIPITACIÓN</td>
                        <td>HUMEDAD RELATIVA</td>
                        <td>ÚLTIMO REPORTE</td>
                        <td>¿LLUEVE?</td>
                    </tr>
                    {
                        informacion.map(res => {

                            const {probabilityofprecip,relativehumidity} = res

                            return(
                                <tr className="cuerpo">
                                    <td className="id" onClick={() => searchID(res._id)}>{res._id}</td>
                                    <td>{res.cityid}</td>
                                    <td>{res.name}</td>
                                    <td>{res.state}</td>
                                    <td>{probabilityofprecip}</td>
                                    <td>{relativehumidity}</td>
                                    <td>{transformDate(res.lastreporttime)}</td>
                                    <td>{probabilityofprecip > 60 || relativehumidity > 50 ? "Si" : "No"}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            :
            <></>
        }
        </div>
    )
}

export default Tabla