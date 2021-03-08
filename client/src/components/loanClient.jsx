import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import ButtonCancel from './base/buttonCancel';
import {validation} from '../functions/basketValidation'
import '../styles/loanReturnClient.css';


const LoanClient = () => {

    const [basketsList, setBasketsList] = useState([{ id: 1, typeBaskets: "", quantity: 0 }]);
    const [basketsListOther, setBasketsListOther] = useState([{ id: 1, typeBaskets: "", quantity: 0 }]);
    const [basketsCompany, setBasketsCompany] = useState([]);
    const [basketsProvider, setBasketsProvider] = useState([]);
    const [client, setClient] = useState([]);

    useEffect(() => {
        funBasketsCompany();
        funBasketsProvider();
        funClient()
    }, []);

    const addBasket = () => setBasketsList(basketsList => [...basketsList, { id: basketsList[basketsList.length - 1].id + 1, typeBaskets: "", quantity: 0 }]);
    const addBasketOther = () => setBasketsListOther(basketsListOther => [...basketsListOther, { id: basketsListOther[basketsListOther.length - 1].id + 1, typeBaskets: "", quantity: 0 }]);

    const deleteBasket = () => {
        if (basketsList.length !== 1) {
            const basketsListUpdate = basketsList.filter(({ id }) => id !== basketsList[basketsList.length - 1].id);
            setBasketsList(basketsListUpdate);
        }
    }
    const deleteBasketOther = () => {
        if (basketsListOther.length !== 1) {
            const basketsListUpdate = basketsListOther.filter(({ id }) => id !== basketsListOther[basketsListOther.length - 1].id);
            setBasketsListOther(basketsListUpdate);
        }
    }

    const onChangeFields = (e) => { basketsList[e.target.id - 1][e.target.name] = e.target.value;console.log(e.target.name) }
    const onChangeFieldsOther = (e) => { basketsListOther[e.target.id - 1][e.target.name] = e.target.value;}


    async function funBasketsCompany() {
        await api.get('/getBasketsCompany').then((res) => {
            setBasketsCompany(res.data);
            console.log(res.data);
        }).catch((err) => {
            setBasketsCompany([]);
        });
    }
    async function funBasketsProvider() {
        await api.get('/getBasketsProvider').then((res) => {
            setBasketsProvider(res.data);
            console.log(res.data);
        }).catch((err) => {
            setBasketsProvider([]);
        });
    }
    async function funClient() {
        await api.get('/getClient').then((res) => {
            setClient(res.data);
            console.log(res.data);
        }).catch((err) => {
            setClient([]);
        });
    }

    function confirmationMessage(icon,title,text,tipo){
        if(tipo===1){
            swal.fire({
                icon: `${icon}`,
                title: `${title}`,
                text: `${text}`,
                confirmButtonText: "Entendido",
                confirmButtonColor: "red",
            });
        }else{
            swal.fire({
                icon: `${icon}`,
                title: `${title}`,
                text: `${text}`,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "blue",
                cancelButtonColor: "red",
            });
        } 
    }

    function validationBasketsCompany(){
        const resultCompany = validation(basketsCompany,basketsList).split(' ');
        switch(resultCompany[0]){
            case "-1": confirmationMessage('error','La cantidad debe ser un número entero',`El error está ubicado en la fila #${resultCompany[1]} de las canastillas de la empresa`,1)
            return false;
            break;
            case "-2": confirmationMessage('error','Canastilla repetida',`El error está ubicado en la fila #${resultCompany[1]} de las canastillas de la empresa`,1)
            return false;
            break;
            case "-3": confirmationMessage('error','Canastilla no encontrada',`El error está ubicado en la fila #${resultCompany[1]} de las canastillas de la empresa`,1)
            return false;
            break;
        }
        return true;
    }
    
    function validationBasketsProvider(){
        const resultProvider = validation(basketsProvider,basketsListOther).split(' ');
        if(parseInt(resultProvider[1],10) !==1 || basketsListOther.length>1  || !(basketsListOther[parseInt(resultProvider[1],10)-1].typeBaskets === "" && (basketsListOther[parseInt(resultProvider[1],10)-1].quantity === "" || basketsListOther[parseInt(resultProvider[1],10)-1].quantity === 0))){
            switch(resultProvider[0]){
                case "-1": confirmationMessage('error','La cantidad debe ser un número entero',`El error está ubicado en la fila #${resultProvider[1]} de las otras canastillas`,1)
                return false;
                break;
                case "-2": confirmationMessage('error','Canastilla repetida',`El error está ubicado en la fila #${resultProvider[1]} de las otras canastillas`,1)
                return false;
                break;
                case "-3": confirmationMessage('error','Canastilla no encontrada',`El error está ubicado en la fila #${resultProvider[1]} de las otras canastillas`,1)
                return false;
                break;
            }
        }
        return true;
    }

    function validationClient(){
        const clientAux = document.getElementById('client').value;
        for(let i = 0;i<client.length;i++){ 
            if(client[i]===clientAux) return true;            
        }
        confirmationMessage('error','Cliente no encontrado',`Por favor ingrese en el campo "Nombre del cliente" un nombre válido `,1)
        return false;
    }


   function validations(){ 
       if(validationClient() && validationBasketsCompany() && validationBasketsProvider()){
           console.log("Todo correcto")
       }
    }

    return (
        <div className="loanClient">
            <input type="text" id='client' class="form-control mb-3" placeholder="Nombre del cliente" list="listaclientes" />
            <datalist id="listaclientes">
                {client.map((client) => (
                    <option>{client}</option>
                ))}
            </datalist>
            <p class="text-start mt-4 mb-3">Canastillas de la empresa</p>
            {basketsList.map((basket) => (
                <div key={basket.id} class="input-group mb-3" >
                    <span class="input-group-text" id="basic-addon1">{basket.id}</span>
                    <input type="text" name="typeBaskets" id={basket.id} onChange={onChangeFields} class="form-control mr-4" placeholder="Nombre de la canasta" list="listacanastas" />
                    <datalist id="listacanastas">
                        {basketsCompany.map((element) => (
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

            <section className="mt-4">
                <br/>
                <p class="text-start mt-4 mb-3">Otras canastillas</p>

                {basketsListOther.map((basket) => (
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
                    <button type="button" class="iconAddBaskets mr-2" onClick={addBasketOther} > + </button>
                    <button type="button" class="iconAddBaskets ml-2" onClick={deleteBasketOther}>-</button>
                </div>
            </section>
            <ButtonCancel />
            <button type="button" className="boton2 mt-5 ml-3 w-40 h-50" onClick={validations}>Finalizar</button>

        </div>
    );
}

export default LoanClient;