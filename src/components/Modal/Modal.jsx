import React from "react";

const Modal = ({active = false, onCloseModal = () => {}, children}) => {
    return(
        <>
        {
            active?
            <div className="modal">
                <div className="container">
                    <div className="closeModal" onClick={() => onCloseModal()}>
                        Cerrar
                    </div>
                    {children}
                </div>
            </div>
            :
            <></>
        }
        </>
    )
}

export default Modal