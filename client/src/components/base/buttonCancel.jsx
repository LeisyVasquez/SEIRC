import React from 'react';
import swal from "sweetalert2";

import '../../styles/buttonCancel.css'


const ButtonCancel = () => {
    const reset = (e) => {
        swal.fire({
            title: 'Advertencia',
            text: '¿Seguro quieres cancelar este registro?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Sí',
            confirmButtonText: 'No',
            confirmButtonColor: "#fa1e0e",
            cancelButtonColor: "#51C2D5",
        }).then((result) => {
            if (!result.value) {
                document.getElementById("form").reset();
            }
        })
    }

    return (        
            <button type="button" className="boton3 mr-3 w-40 h-50" onClick={reset}>Cancelar</button>
    )
}

export default ButtonCancel;