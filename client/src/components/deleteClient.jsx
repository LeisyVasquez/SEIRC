import React, { useState, useEffect } from "react";
import api from '../axios/axios';
import { Container, Button, Modal } from "react-bootstrap";
import '../styles/deleteClient.css';
import { getFromLocal } from '../functions/localStorage';
import swal from "sweetalert2";
const DeleteClient = () => {
    useEffect(
        () => {
            getGeneralHistory()
        }, []
    );

    const [historyData, setHistoryData] = useState([]);
    const [listNamesClients, setListNamesClient] = useState([]);
    const [listNamesClientsSet, setListNamesClientsSet] = useState(new Set());
    //const [idCard, setIdCard] = useState('');
    const [arrayDataBasketsById,setArrayDataBasketsById] = useState([]);

    const [showBasketsData, setShowBasketsData] = useState(false);
    const [deleteMovement, setDeleteMovement] = useState(false);

    const handleCloseBaskets = () => setShowBasketsData(false);
    const handleCloseDelete = () => setDeleteMovement(false);

    const handleShowBaskets = (e) => {     
        //setIdCard(e.target.value);
        showBaskets(e.target.value);
        //setShowBasketsData(true);
        
    }

    const handleDeleteBasket = (e) => {
        setDeleteMovement(true);
        //setIdCard(e.target.value)
    }

    function saveClient(list) {
        const clientSetAux = new Set();
        for (let i = 0; i < list.length; i++) {
            clientSetAux.add(list[i]);
        }
        setListNamesClientsSet(clientSetAux)
    }

    let flag = true;
    let name;

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
        name = e.target.value;
        if (listNamesClientsSet.has(name)) {
            console.log('La lista tiene el nombre ', name)
            api.get(`/getHistoryByName/cliente/${name}`).then((res,err)=>{
                if(res) console.log(res.data)
                else console.log(err)
                setHistoryData(res.data);
            })
        } else {
            getGeneralHistory()
        }
    }

    /*const clientHistory = () => {
        flag = false;
        console.log(name);
        console.log(historyData);
        console.log(listNamesClients);
    }*/

    
    function showBaskets(idCard) {
        const historyDataCard = historyData.filter(cards => cards._id === idCard);
        const objectDataBasketsById = historyDataCard[0].baskets;
        let html = '';
        for (const property in objectDataBasketsById) {
           html+=`<p>${property}: ${objectDataBasketsById[property]}</p>`;
        }     
        
        swal.fire({
            icon: 'info',
            title: 'Canastillas ha eliminar',
            html:html,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Aceptar`,
            denyButtonText: `Cancel`
        })

    }

    return (
        <div className="deleteClient" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
                <h1 className="m-auto py-5">Eliminar movimientos de clientes</h1>

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
                                        <input type="image" src="https://raw.githubusercontent.com/JuanManuel-GAA/equipo7_gaa_ppi2020/master/Recursos%20gu%C3%ADa/iconDelete.png" className="boton4" value={item._id} onClick={handleDeleteBasket} />
                                        <div className="h-25">
                                            <h5 className="card-title" id="nombre">{item.name}</h5>
                                        </div>
                                        <p className="card-text" id="descripcion">{item.typeMovement}</p>
                                        <p className="card-text" id="descripcion">{item.hour}</p>
                                        <button type="button" className="iconAdd mr-2" value={item._id} onClick={handleShowBaskets}>+</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    }
                </div>

                {/*Modal ver más*/}
                <Modal show={showBasketsData} onHide={handleCloseBaskets} centered>
                    <Modal.Header closeButton style={{ background: 'rgb(112, 219, 36,0.3)' }}>
                        <Modal.Title>Más detalles de la cuenta</Modal.Title>
                    </Modal.Header>
                    {arrayDataBasketsById.map((baskets) => {
                        <>
                            <Modal.Body style={{ background: 'rgb(112, 219, 36,0.3)' }}>
                                <p>{baskets}</p>
                            </Modal.Body>
                        </>
                    })}
                    <Modal.Footer style={{ background: 'rgb(112, 219, 36,0.3)' }}>
                        <Button variant="secondary" onClick={handleCloseBaskets}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

                {/*Modal eliminar movimiento*/}
                <Modal show={deleteMovement} onHide={handleCloseDelete} centered>
                    <Modal.Header closeButton style={{ background: 'rgb(252, 3, 25, 0.1)' }}>
                        <Modal.Title>Eliminar movimiento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: 'rgb(252, 3, 25, 0.1)' }}>
                        <h3>Ingrese la contraseña para confirmar</h3>
                        <input
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

export default DeleteClient;



