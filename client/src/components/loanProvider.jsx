import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import ButtonCancel from './base/buttonCancel';
import { validation } from '../functions/basketValidation'
import '../styles/loanReturnClient.css';
import { saveToLocal } from "../functions/localStorage";

const LoanProvider = () => {

    const [basketsList, setBasketsList] = useState([{ id: 1, typeBaskets: "", quantity: 0 }]);
    const [basketsProvider, setBasketsProvider] = useState([]);
    const [provider, setProvider] = useState([]);

    useEffect(() => {
        funBasketsProvider();
        funProvider()
    }, []);

    const addBasket = () => setBasketsList(basketsList => [...basketsList, { id: basketsList[basketsList.length - 1].id + 1, typeBaskets: "", quantity: 0 }]);

    
    const deleteBasket = () => {
        if (basketsList.length !== 1) {
            const basketsListUpdate = basketsList.filter(({ id }) => id !== basketsList[basketsList.length - 1].id);
            setBasketsList(basketsListUpdate);
        }
    }

    const onChangeFieldsOther = (e) => { basketsList[e.target.id - 1][e.target.name] = e.target.value; }

    async function funBasketsProvider() {
        await api.get('/getBasketsProvider').then((res) => {
            setBasketsProvider(res.data);
        }).catch((err) => {
            setBasketsProvider([]);
        });
    }
    async function funProvider() {
        await api.get('/getProvider').then((res) => {
            setProvider(res.data);
        }).catch((err) => {
            setProvider([]);
        });
    }

    function confirmationMessage(icon, title, text, tipo,data) {
        if (tipo === 1) {
            swal.fire({
                icon: `${icon}`,
                title: `${title}`,
                text: `${text}`,
                confirmButtonText: "Entendido",
                confirmButtonColor: "red",
            });
        } else {
            swal.fire({
                icon: `${icon}`,
                title: `${title}`,
                text: `${text}`,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "blue",
            }).then((result) => {
                if (result.isConfirmed) {
                  saveToLocal("data",JSON.stringify(data));
                  //Enrutamiento a página del pdf
                }
            });
        }
    }


    function validationBasketsProvider() {
        const resultProvider = validation(basketsProvider, basketsList).split(' ');
        if (parseInt(resultProvider[1], 10) !== 1 || basketsList.length > 1 || !(basketsList[parseInt(resultProvider[1], 10) - 1].typeBaskets === "" && (basketsList[parseInt(resultProvider[1], 10) - 1].quantity === "" || basketsList[parseInt(resultProvider[1], 10) - 1].quantity === 0))) {
            switch (resultProvider[0]) {
                case "-1": confirmationMessage('error', 'La cantidad debe ser un número entero', `El error está ubicado en la fila #${resultProvider[1]}`, 1)
                    return false;
                    break;
                case "-2": confirmationMessage('error', 'Canastilla repetida', `El error está ubicado en la fila #${resultProvider[1]}`, 1)
                    return false;
                    break;
                case "-3": confirmationMessage('error', 'Canastilla no encontrada', `El error está ubicado en la fila #${resultProvider[1]}`, 1)
                    return false;
                    break;
            }
        }
        return true;
    }

    function validationProvider() {    
        const providerAux = document.getElementById('proveedor').value;
        for (let i = 0; i < provider.length; i++) {
            if (provider[i] === providerAux) return true;
        }
        confirmationMessage('error', 'Proveedor no encontrado', `Por favor ingrese en el campo "Nombre del cliente" un nombre válido `, 1)
        return false;
    }

    function validationProviderBaskets() {
        if(basketsList.length === 1 && basketsList.length === 1 && 
            basketsList[0].typeBaskets === "" && basketsList[0].typeBaskets === "" &&
            (basketsList[0].quantity === "" || basketsList[0].quantity === 0)&& 
            (basketsList[0].quantity === "" || basketsList[0].quantity === 0)){
            confirmationMessage('error', 'Campos vacíos', `Por favor ingrese valores`, 1)
            return false;
        }

        return true;
    }   


    function validations() {
        
        if (validationProvider() && validationProviderBaskets() && validationBasketsProvider()) {
            const basketsLoan = {};
            const baskets = basketsList;
            const providerAux = document.getElementById('proveedor').value;
            for (let i = 0; i < baskets.length; i++) {
                const typeBaskets = baskets[i].typeBaskets;
                const quantity = parseInt(baskets[i].quantity,10);
                const codeBaskets = typeBaskets.split("-")[0];
                if (codeBaskets != "") basketsLoan[codeBaskets] = quantity;
            }
            const data = {
                name: providerAux,
                basketsLoan: basketsLoan,
                typeUser:"proveedor",
                type:1
            }
            api.post('/loanClientProvider',data).then((res,err)=>{
                if(err || res.status === 254) confirmationMessage('error', 'Error en el servidor', `Por favor intente de nuevo o regrese más tarde`, 1)
                if(res.status === 201){
                    data['basketsLoan'] = baskets;
                    data['movemenType'] = 'Préstamo';
                    confirmationMessage('success', 'Prestamo generado correctamente','',2,data);
                } 
            })
        }
    }

    return (
        <div className="loanClient">
            <input type="text" id='proveedor' class="form-control mb-3" placeholder="Nombre del proveedor" list="listaproveedores" />
            <datalist id="listaproveedores">
                {provider.map((provider) => (
                    <option>{provider}</option>
                ))}
            </datalist>
                {basketsList.map((basket) => (
                    <div key={basket.id} class="input-group mb-3" >
                        <span class="input-group-text" id="basic-addon1">{basket.id}</span>
                        <input type="text" name="typeBaskets" id={basket.id} onChange={onChangeFieldsOther} class="form-control mr-4" placeholder="Nombre de la canasta" list="listacanastas1" />
                        <datalist id="listacanastas1">
                            {basketsProvider.map((element) => (
                                <option>{element}</option>
                            ))}
                        </datalist>
                        <input type="text" name="quantity" id={basket.id} onChange={onChangeFieldsOther} class="form-control" placeholder="Cantidad" />
                    </div>
                ))}
                <div className="groupButtons">
                    <button type="button" class="iconAddBaskets mr-2" onClick={addBasket} > + </button>
                    <button type="button" class="iconAddBaskets ml-2" onClick={deleteBasket}>-</button>
                </div>
            <ButtonCancel />
            <button type="button" className="boton2 mt-5 ml-3 w-40 h-50" onClick={validations}>Finalizar</button>

        </div>
    );
}

export default LoanProvider;