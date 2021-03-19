import React, { useEffect, useState, Table } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import { Container, Row, Col } from "react-bootstrap";
import { getFromLocal } from '../functions/localStorage'
import '../styles/filtros.css';


const Filtros = () => {
    useEffect(() => {
        getGeneralHistory()
    }, []);

    function comprobation() {
        api.post('/routeComprobation', { typeUser: ['administrador'] }, { headers: { 'authorization': `Bearer ${getFromLocal('tokenUser')}` } })
            .then((res) => {
                if (res.status === 201) window.location.href = '/notAuthorized'
            }).catch((err) => {
                window.location.href = '/'
            });
    }
    //Imputs
    const [generalList, setGeneralList] = useState([]);
    const [auxList, setAuxList] = useState([]);

    const onChangeFields = (e) => {
        console.log(e.target.value);

        if (e.target.id === "date" && document.getElementById('typeMovement').value === "") {
            const dateSplit = e.target.value.split('-');
            api.get(`/getQuantityByTypeMovement/cliente/${dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0]}/`).then((res) => {
                if (res.status === 254) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Por favor vuelva más tarde',
                    })
                } else if (res.status === 255) {
                    swal.fire({
                        icon: 'error',
                        title: 'No hay registros con esa fecha',
                        text: 'Ingrese prestamos o devoluciones',
                    })
                } else {
                    setAuxList(res.data);
                }
            }).catch((err) => {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Por favor vuelva más tarde',
                })
            })
        }

        if (document.getElementById('date').value !== "" && document.getElementById('typeMovement').value !== "") {
            const dateSplit = document.getElementById('date').value.split('-');
            api.get(`/getQuantityByTypeMovement/cliente/${dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0]}/`).then((res) => {
                if (res.status === 254) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Por favor vuelva más tarde',
                    })
                } else if (res.status === 255) {
                    swal.fire({
                        icon: 'error',
                        title: 'No hay registros con esa fecha',
                        text: 'Ingrese prestamos o devoluciones',
                    })
                } else {
                    if (document.getElementById('typeMovement').value === "prestamo") setAuxList([res.data[0]]);
                    else setAuxList([res.data[1]]);
                }
            }).catch((err) => {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Por favor vuelva más tarde',
                })
            })
        }

        if ((e.target.id === "typeMovement" && e.target.value !== "") && document.getElementById('date').value === "") {
            if (e.target.value === "prestamo") setAuxList([generalList[0]]);
            else setAuxList([generalList[1]]);
        }
    }
    //Imputs
    const [orderData, setOrderData] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [listNamesClients, setListNamesClients] = useState([]);
    const [listNamesClientsSet, setListNamesClientsSet] = useState(new Set());
    const [listQuantityBaskets, setListQuantityBaskets] = useState({});
    const [totalQuantityBaskets, setTotalQuantityBaskets] = useState(0);

    const handleShowBaskets = (e) => {
        showBaskets(e.target.value);
    }

    const getGeneralOrder = () => {
        api.get(`/getGeneralOrder/cliente`)
            .then(res => {
                if (res.status === 254) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Por favor vuelva más tarde',
                    })

                } else if (res.status === 255) {
                    swal.fire({
                        icon: 'error',
                        title: 'No hay registros',
                        text: 'Ingrese prestamos o devoluciones',
                    })
                }
                else {
                    setOrderData(res.data[0]);
                    setListNamesClients(res.data[1]);
                    setListQuantityBaskets(res.data[2]);
                    setTotalQuantityBaskets(res.data[3]);
                    saveClient(res.data[1]);
                }
            })
            .catch(err => {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Por favor vuelva más tarde',
                })
            })
    }

    //Modal
    function showBaskets(idCard) {
        /*const orderDataCard = orderData.filter(cards => cards._id === idCard);
        const objectDataBasketsById = orderDataCard[0].consolidated;*/
        let html = '<table class="table table-bordered table-striped table-sm table-hover .table-responsive">';
        html += `   
                <thead>
                    <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Abatible</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Planas</td>
                    <td>15</td>
                </tr>
                <tr>
                    <td>Lopera</td>
                    <td>20</td>
                </tr>
                </tbody>
            </table>
            <div>
                <p className="total text-left">Debo: 10</p>
            </div> `
        html += '</table>'

        swal.fire({
            icon: 'info',
            title: 'Canastillas',
            html: html,
            confirmButtonText: "Entendido"
        })
    }

    //Peticion
    function saveClient(list) {
        const clientSetAux = new Set();
        for (let i = 0; i < list.length; i++) {
            clientSetAux.add(list[i]);
        }
        setListNamesClientsSet(clientSetAux);
    }

    const getGeneralHistory = () => {
        api.get(`/getHistoryByName/cliente/`).then((res, err) => {
            setHistoryData(res.data[0]);
            setListNamesClients(res.data[1]);
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
    

    return (
        <div className="filtros" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70" >
                <Row className="p-4" onChange={onChangeFields}>
                    <Col className=" mx-auto">
                        <p>Filtrar por fecha</p>
                    </Col>
                    <Col className=" mx-auto">
                        <input
                            type="date"
                            id="date"
                            className="form-control w-60 m-auto" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row className="p-4" onChange={onChangeFields}>
                    <Col>
                        <p>Filtrar por tipo de movimiento</p>
                    </Col>
                    <Col>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-60 m-auto" />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <div className="row">
                    <div className="cards w-50 y-100 mr-5 col-sm-7">
                        <img className="float-right" src="https://icons-for-free.com/iconfiles/png/512/Free+Set+copy+Printer-1320568200680206615.png" alt="Impresora" />
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {/*orderData.map((item) =>*/
                                <div className="col">
                                    <div className=" card h-100 w-100 y-100">
                                        <div className="card-body">
                                            <p className="card-title sm-title">Devuelvo/Me Prestan</p>
                                            <p className="card-title">17/02/2021</p>
                                            <button type="button" className="iconAdd mr-2" onClick={handleShowBaskets}>+</button>
                                        </div>
                                    </div>
                                </div>
                            /*)*/}
                        </div>
                    </div>
                    <div className="debt w-40 y-100 align-baseline col-sm">
                    <img className="float-right" src="https://icons-for-free.com/iconfiles/png/512/Free+Set+copy+Printer-1320568200680206615.png" alt="Impresora" />
                        <div className="row row-cols-1 row-cols-md-1 g-4">
                            {/*orderData.map((item) =>*/
                                <div className="col">
                                    <div className="card h-100 w-100 y-100">
                                        <div className="card-body">
                                            <p className="card-title">Deuda</p>
                                            <p className="card-title">26/02/2021</p>
                                            <button type="button" className="iconAdd mr-2" onClick={handleShowBaskets}>+</button>
                                        </div>
                                    </div>
                                </div>
                            /*)*/}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Filtros;