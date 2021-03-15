import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import '../styles/loanReturnClient.css';
import { validation } from '../functions/basketValidation'
import ButtonCancel from './base/buttonCancel';
import { saveToLocal } from "../functions/localStorage";


const ReturnProvider = () => {
    const [basketsList, setBasketsList] = useState([{ id: 1, typeBaskets: "", quantity: 0 }]);
    const [allBasketsUser, setAllBasketsUser] = useState([]);
    const [providerList, setProviderList] = useState([]);
    const [providerSet, setProviderSet] = useState(new Set());

    useEffect(() => {
        funProvider();
    }, []);

    const addBasket = () => setBasketsList(basketsList => [...basketsList, { id: basketsList[basketsList.length - 1].id + 1, typeBaskets: "", quantity: 0 }]);

    const deleteBasket = () => {
        if (basketsList.length !== 1) {
            const basketsListUpdate = basketsList.filter(({ id }) => id !== basketsList[basketsList.length - 1].id);
            setBasketsList(basketsListUpdate);
        }
    }

    const onChangeFields = (e) => { basketsList[e.target.id - 1][e.target.name] = e.target.value; console.log(basketsList) }

    async function funProvider() {
        await api.get('/getClientProviderByOrder/proveedor').then((res) => {
            saveProvider(res.data);
            setProviderList(res.data);
        }).catch((err) => {
            return [];
        });
    }

    function saveProvider(list) {
        const clientSetAux = new Set();
        for (let i = 0; i < list.length; i++) {
            clientSetAux.add(list[i]);
        }
        setProviderSet(clientSetAux);
    }

    const onChangeName = async (e) => {
        if (providerSet.has(e.target.value)) {
            await api.get(`/getBasketsReturn/${e.target.value}/proveedor`).then((res) => {
                if (res.status === 200) {
                    setAllBasketsUser(res.data.res);
                } else {
                    setAllBasketsUser([]);
                }
            }).catch((err) => {
                setAllBasketsUser([]);
            });
        }
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
                  document.getElementById("form").reset();
                  window.location.href = "/pdfPreview";
                }
            });
        }
    }

    function validationBaskets() {
        const resultCompany = validation(allBasketsUser, basketsList).split(' ');
        switch (resultCompany[0]) {
            case "-1": confirmationMessage('error', 'La cantidad debe ser un número entero', `El error está ubicado en la fila #${resultCompany[1]}`, 1)
                return false;
                break;
            case "-2": confirmationMessage('error', 'Canastilla repetida', `El error está ubicado en la fila #${resultCompany[1]}`, 1)
                return false;
                break;
            case "-3": confirmationMessage('error', 'Canastilla no encontrada', `La canastilla con cógido ${allBasketsUser[resultCompany[1]-1]} no se encuentra prestada`, 1)
                return false;
                break;
        }
        return true;
    }
    function validationProvider() {
        const clientAux = document.getElementById('client').value;
        for (let i = 0; i < providerList.length; i++) {
            if (providerList[i] === clientAux) return true;
        }
        confirmationMessage('error', 'Cliente no encontrado', `Por favor ingrese en el campo "Nombre del cliente" un nombre válido `, 1)
        return false;
    }

    function validations() {
        if (validationProvider() && validationBaskets()) {
            const clientAux = document.getElementById('client').value;
            const baskets = basketsList;
            const basketsReturn = {}
            for (let i = 0; i < basketsList.length; i++) {
                const typeBaskets = basketsList[i].typeBaskets;
                const quantity = parseInt(basketsList[i].quantity, 10);
                const codeBaskets = typeBaskets.split("-")[0];
                if (codeBaskets !== "") basketsReturn[codeBaskets] = quantity;
            }
            const data = {
                name: clientAux,
                basketsReturn: basketsReturn,
                typeUser: "proveedor",
                type:1
            }
            console.log(data)
            api.post('/returnClientProvider', data).then((res, err) => {
                //Control de errores, falta aclarar el del catch
                if (res.status === 254) confirmationMessage('error', 'Error', `No se le ha prestado uno o varios tipos canastas que devuelve, por lo tanto no se puede devolver algo que no se presto`, 1)
                if (res.status === 255 || res.status === 256 || res.status === 257) confirmationMessage('error', 'Error, no se puede generar esta acción', `${res.data.message}`, 1)
                //Confirmación 
                if(res.status === 201){
                    data['basketList'] = baskets;
                    data['movemenType'] = 'Devolución';
                    confirmationMessage('success', 'Prestamo generado correctamente','',2,data);
                } 
            })
        }
    }

    return (
        <div className="returnClient">
            <input type="text" id="client" class="form-control mb-3" placeholder="Nombre del proveedor" list="listaproveedor" onChange={onChangeName} />
            <datalist id="listaproveedor">
                {providerList.map((clien) => (
                    <option>{clien}</option>
                ))}
            </datalist>
            {basketsList.map((basket) => (
                <div key={basket.id} class="input-group mb-3" >
                    <span class="input-group-text" id="basic-addon1">{basket.id}</span>
                    <input type="text" name="typeBaskets" id={basket.id} onChange={onChangeFields} class="form-control mr-4" placeholder="Nombre de la canasta" list="listacanastas" />
                    <datalist id="listacanastas">
                        {allBasketsUser.map((element) => (
                            <option>{element}</option>
                        ))}
                    </datalist>
                    <input type="text" name="quantity" id={basket.id} onChange={onChangeFields} class="form-control" placeholder="Cantidad" />
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

export default ReturnProvider;