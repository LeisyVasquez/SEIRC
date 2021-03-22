import React, { useEffect, useState } from 'react';
import '../styles/orderHistory.css'
import { Container } from "react-bootstrap";
import swal from "sweetalert2";
import api from '../axios/axios';
import BasketsTable from './base/basketsTable';


const DeletionHistory = () => {
  let [deletionHistoryGeneral, setDeletionHistoryGeneral] = useState([]);
  const [namesByDeletionHistory, setNamesByDeletionHistory] = useState([]);


  useEffect(() => {
    getDeletionHistory();
  }, [])

  const getDeletionHistory = () => {
    api.get('/getDeletionHistory')
      .then(res => {
        setDeletionHistoryGeneral(res.data.deletionHistoryGeneral);
        setNamesByDeletionHistory(res.data.namesByDeletionHistory);
      })
      .catch(err => {
        swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: 'Intente de nuevo o regrese más tarde',
          confirmButtonText: "Entendido"
        })
      })
  }
  const handleShowBaskets = (e) => {
    showBaskets(e.target.value);
  }

  function showBaskets(idCard) {
    const basketsDataCard = deletionHistoryGeneral.filter(cards => cards._id === idCard);
    const objectDataBasketsById = basketsDataCard[0].baskets;
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

  const filterName = (e) => {
    if (namesByDeletionHistory.includes(e.target.value))
      setDeletionHistoryGeneral(deletionHistoryGeneral.filter(cards => cards.name === e.target.value));
    else getDeletionHistory()
    if (!e.target.value) {
      document.getElementById("form").reset();
    }
  }

  const filterDate = (e) => {
    const valueInput = e.target.value;
    const split = valueInput.split("-")
    const date = `${split[2]}/${split[1]}/${split[0]}`;
    const filter = deletionHistoryGeneral.filter(cards => cards.date === date);
    setDeletionHistoryGeneral(filter);
    if (filter.length === 0) {
      swal.fire({
        icon: 'warning',
        title: 'No hay historiales de eliminación en la fecha seleccionada',
        confirmButtonText: "Entendido"
      })
      getDeletionHistory()
      document.getElementById("form").reset();
    }
  }


  return (
    <div className="orderHistory">
      <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
        <BasketsTable />
        <h1 className="m-auto py-5">Historial de eliminaciones</h1>
        <div className="px-3">

          {/* Sección de filtros*/}
          <form id="form">
            <div class="input-group">
              <input
                type="search"
                id="name"
                className="form-control mb-4 mr-3"
                placeholder="Nombre de cliente"
                list="namesClients"
                onChange={filterName}
              />
              <datalist id="namesClients">
                {
                  namesByDeletionHistory.map((name) =>
                    <option>{name}</option>
                  )
                }
              </datalist>
              <input type="date" id="date" className="form-control ml-4" placeholder="Contraseña" onChange={filterDate} />
            </div>
          </form>


          {/* Tarjetas con los historiales eliminados*/}
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {
              deletionHistoryGeneral.map((data) =>
                <div className="col">
                  <div className=" card h-100 w-100">
                    <div className="card-body">
                      <div className="h-25">
                        <h5 className="card-title" id="nombre">{data.name}</h5>
                      </div>
                      <p className="card-text">{data.typeUser === "cliente" ? "Cliente" : "Proveedor"}</p>
                      <p className="card-text">{data.movemenType === "prestamo" ? "Préstamo" : "Devolución"}</p>
                      <p className="card-text">{data.date}</p>
                      <p className="card-text">{data.hour}</p>
                      <button type="button" className="iconAdd mr-2" value={data._id} onClick={handleShowBaskets}>+</button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </Container>

    </div>
  );
}

export default DeletionHistory;