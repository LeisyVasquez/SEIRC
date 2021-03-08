import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import '../styles/loanReturnClient.css';


import ButtonCancel from './base/buttonCancel';



const ReturnClient = () => {
    const [basketsList, setBasketsList] = useState([{ id: 1, typeBaskets: "", quantity: 0 }]);

    const addBasket = () => setBasketsList(basketsList => [...basketsList, { id: basketsList[basketsList.length - 1].id + 1, typeBaskets: "", quantity: 0 }]);

    const deleteBasket = () => {
        if (basketsList.length !== 1) {
            const basketsListUpdate = basketsList.filter(({ id }) => id !== basketsList[basketsList.length - 1].id);
            setBasketsList(basketsListUpdate);
        }
    }

    const onChangeFields = (e) => { basketsList[e.target.id - 1][e.target.name] = e.target.value; console.log(basketsList) }

    return (
        <div className="returnClient">
            <input type="text" class="form-control mb-3" placeholder="Nombre del cliente" list="listaclientes" />
            <datalist id="listaclientes">
                <option>Samuel</option>
                <option>Juan</option>
            </datalist>
            {basketsList.map((basket) => (
                <div key={basket.id} class="input-group mb-3" >
                    <input type="text" name="typeBaskets" id={basket.id} onChange={onChangeFields} class="form-control mr-4" placeholder="Nombre de la canasta" list="listacanastas" />
                    <datalist id="listacanastas">
                        <option>Verde</option>
                        <option>Amarilla</option>
                    </datalist>
                    <input type="text" name="quantity" id={basket.id} onChange={onChangeFields} class="form-control" placeholder="Cantidad" />
                </div>
            ))}
            <div className="groupButtons">
                <button type="button" class="iconAddBaskets mr-2" onClick={addBasket} > + </button>
                <button type="button" class="iconAddBaskets ml-2" onClick={deleteBasket}>-</button>
            </div>


            <ButtonCancel />
            <button type="button" className="boton2 mt-5 ml-3 w-40 h-50">Finalizar</button>

        </div>



    );
}

export default ReturnClient;