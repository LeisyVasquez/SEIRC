import React from 'react';
import swal from "sweetalert2";

import { Container } from "react-bootstrap";
import '../styles/displayByClient.css';

const DisplayByClient = () => {

    const nameClient = async (e) => {
        const name = e.target.value;
        console.log(name);
    }

    const handleShowBaskets = (e) => {
        showBaskets()
    }

    function showBaskets() {
        {/*
         const historyDataCard = historyData.filter(cards => cards._id === idCard);
        const objectDataBasketsById = historyDataCard[0].baskets;
        let html = '<table style="width:100%"><th>Código</th><th>Cantidad</th>';
        for (const property in objectDataBasketsById) {
            html += `<tr><td>${property}</td><td>${objectDataBasketsById[property]}</td><tr>`;
        }
        html += '</table>'

        
    */}
        swal.fire({
            icon: 'info',
            title: 'Canastillas',
            confirmButtonText: "Entendido"
        })

    }

    return (
        <div className="displayByClient">
            <Container className="text-center mt-2 my-5 mx-auto p-5 bosy w-70">
                <h1 className="m-auto py-5">Visualización por clientes</h1>

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

                    </datalist>
                </div>

                <div className="row row-cols-1 row-cols-md-4 g-4">
                    <div className="col">
                        <div className=" card h-100 w-100">
                            <div className="card-body">
                                <div className="h-25">
                                    <h5 className="card-title" id="nombre">Samuel Villegas</h5>
                                </div>
                                <p className="card-text">Debe en total 20 canastillas</p>
                                <button type="button" className="iconAdd mr-2" onClick={handleShowBaskets}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default DisplayByClient;