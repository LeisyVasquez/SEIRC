import React, { useState, useEffect } from "react";
import api from '../axios/axios';
import { Container, Button, Modal } from "react-bootstrap";
import '../styles/deleteClient.css';
import swal from "sweetalert2";
import BasketsTable from './base/basketsTable'; 
import {getFromLocal} from '../functions/localStorage'


const DeleteMovementClient = () => {
    useEffect(
        () => {
            comprobation();
            getPasswordSuperUser();
            getGeneralHistory();
        }, []
    );

    function comprobation(){
        api.post('/routeComprobation',{typeUser:['administrador']},{headers:{'authorization':`Bearer ${getFromLocal('tokenUser')}`}
    })
        .then((res)=>{
            if(res.status===201) window.location.href = '/notAuthorized'
        }).catch((err)=>{
            window.location.href = '/notAuthorized'
        });
    }
    

    const [historyData, setHistoryData] = useState([]);
    const [listNamesClients, setListNamesClient] = useState([]);
    const [listNamesClientsSet, setListNamesClientsSet] = useState(new Set());
    const [deleteMovement, setDeleteMovement] = useState(false);
    const [passwordSuperUser, setPasswordSuperUser] = useState('');
    const [idCard, setIdCard] = useState('');

    const getPasswordSuperUser = () => {
        api.get('/getPasswordSuperUser').then((res, err) => {
            if (res) setPasswordSuperUser(res.data.message);
            else {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Reinicie la página, si vuelve a parecer de nuevo este mensaje inicie más tarde',
                    confirmButtonText: "Entendido"
                })
            }
        })
    }
    const handleCloseDelete = () => setDeleteMovement(false);

    const handleShowBaskets = (e) => {
        showBaskets(e.target.value);
    }

    const handleDeleteBasket = (e) => {
        setDeleteMovement(true);
        setIdCard(e.target.value)
    }

    function saveClient(list) {
        const clientSetAux = new Set();
        for (let i = 0; i < list.length; i++) {
            clientSetAux.add(list[i]);
        }
        setListNamesClientsSet(clientSetAux)
    }


    const getGeneralHistory = () => {
        api.get(`/getGeneralHistory/cliente`).then((res, err) => {
            setHistoryData(res.data[0]);
            setListNamesClient(res.data[1]);
            if (err || res.status === 254) console.log(err);
            else console.log(res.data)
            saveClient(res.data[1]);
        })
    }


    const nameClient = async (e) => {
        const name = e.target.value;
        if (listNamesClientsSet.has(name)) {
            api.get(`/getHistoryByName/cliente/${name}`).then((res, err) => {
                if (res) console.log(res.data)
                else console.log(err)
                setHistoryData(res.data);
            })
        } else {
            getGeneralHistory()
        }
    }


    function showBaskets(idCard) {
        const historyDataCard = historyData.filter(cards => cards._id === idCard);
        const objectDataBasketsById = historyDataCard[0].baskets;
        let html = '<table style="width:100%"><th>Código</th><th>Cantidad</th>';
        for (const property in objectDataBasketsById) {
            html += `<tr><td>${property}</td><td>${objectDataBasketsById[property]}</td><tr>`;
        }
        html += '</table>'

        swal.fire({
            icon: 'info',
            title: 'Canastillas',
            html: html,
            confirmButtonText: "Entendido"
        })
    }

    function deleteHistory(e) {
        if (passwordSuperUser === e.target.value) {
            const data = {
                password: e.target.value,
                idHistory: idCard
            }
            console.log(data);
            api.put('/deleteMovementClientProvider',data).then((res)=>{
                if(res.status === 254){
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Reinicie la página, intente de nuevo o regrese más tarde',
                        confirmButtonText: "Entendido"
                    })
                }else if(res.status === 255){
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Este movimiento no se puede eliminar`,
                        confirmButtonText: "Entendido"
                    })
                }else if(res.status === 201){
                    window.location.href = '/deleteMovementClient'
                }
                else{
                    console.log('Buenaas, aqui estoy')
                }
            }).catch((err)=>{
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Reinicie la página, intente de nuevo o regrese más tarde',
                    confirmButtonText: "Entendido"
                })
            })
        }else{
            console.log('No lee la contraseña completa')
        }
    }

    return (
        <div className="deleteClient" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
            <BasketsTable/>

                <h1 className="mx-auto mt-0 mb-5">Eliminar movimientos de clientes</h1>

                {/* Sección de búsqueda*/}
                <div className="mb-5">
                    <input
                        type="search"
                        className="form-control w-75 m-auto"
                        placeholder="Nombre del cliente"
                        list="listClients"
                        onChange={nameClient}
                    />
                    <datalist id="listClients">
                        {listNamesClients.map((clien) => (
                            <option>{clien}</option>
                        ))}
                    </datalist>
                </div>

                {/*Tarjetas con el historial*/}
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {historyData.map((item) =>
                        <>
                            <div className="col">
                                <div className=" card h-100 w-100" key={item._id}>
                                    <div className="card-body">
                                        <input type="image" alt="IconDelete" src="https://raw.githubusercontent.com/JuanManuel-GAA/equipo7_gaa_ppi2020/master/Recursos%20gu%C3%ADa/iconDelete.png" className="boton4" value={item._id} onClick={handleDeleteBasket} />
                                        <div className="h-25">
                                            <h5 className="card-title" id="nombre">{item.name}</h5>
                                        </div>
                                        <p className="card-text">{(item.movemenType === "prestamo"? "Préstamo":"Devolución")}</p>
                                        <p className="card-text">{item.hour}</p>
                                        <button type="button" className="iconAdd mr-2" value={item._id} onClick={handleShowBaskets}>+</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    }
                </div>

                {/*Modal eliminar movimiento*/}
                <Modal show={deleteMovement} onHide={handleCloseDelete} centered>
                    <Modal.Header closeButton style={{ background: 'rgb(252, 3, 25, 0.1)' }}>
                        <Modal.Title>Eliminar movimiento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: 'rgb(252, 3, 25, 0.1)' }}>
                        <h3>Ingrese la contraseña para confirmar</h3>
                        <input
                            onChange={deleteHistory}
                            type="password"
                            className="form-control w-50 my-5 mx-auto"
                            placeholder="Contraseña"
                            list="listClients"
                        />
                    </Modal.Body>
                    <Modal.Footer style={{ background: 'rgb(252, 3, 25, 0.1)' }}>
                        <Button variant="secondary" onClick={handleCloseDelete}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </div>
    );
}

export default DeleteMovementClient;



