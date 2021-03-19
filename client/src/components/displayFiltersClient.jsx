import React, { useEffect, useState, Table, useReducer } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import { Container, Row, Col, Form } from "react-bootstrap";
import { getFromLocal } from '../functions/localStorage'
import '../styles/displayFiltersClient.css';


const DisplayFiltersClient = () => {
    //Formatear fecha actual
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let todayStr = dd + '/' + mm + '/' + yyyy;
    today = mm + '/' + dd + '/' + yyyy;
    let dateObject = new Date(today);
    today = dateObject;

    const [completeHistory, setCompleteHistory] = useState([]);
    const [filteredHistory, setfilteredHistory] = useState([]);
    const [filters, setfilters] = useState({ hasta: today, desde: new Date("2021-01-02T00:00:00") });//El error tiene que estar en esta línea
    let filterArray = [];                 //Dice que la fecha de "hasta" es inválida, probablemente tenga que ver con el formateo...

    useEffect(() => {
        getGeneralHistory();
    }, []);

    //Comprobar permiso para acceder a la ruta
    function comprobation() {
        api.post('/routeComprobation', { typeUser: ['administrador'] }, { headers: { 'authorization': `Bearer ${getFromLocal('tokenUser')}` } })
            .then((res) => {
                if (res.status === 201) window.location.href = '/notAuthorized'
            }).catch((err) => {
                window.location.href = '/notAuthorized'
            });
    }

    //Guardar cambios en los input
    const onChangeFields = (e) => {
        let name = e.target.id;
        let value = e.target.value;
        if (name == "desde" || name == "hasta") {
            //Formatear fecha del input
            value = new Date(value);
            let dd = String(value.getDate() + 1).padStart(2, '0');
            let mm = String(value.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = value.getFullYear();
            value = mm + '/' + dd + '/' + yyyy;
            var dateObject = new Date(value);
            value = dateObject;

            setfilters((state) => ({
                ...filters,
                [name]: value,
            }));
        } else {
            setfilters((state) => ({
                ...filters,
                [name]: value,
            }));
        }
    }

    //Aplicar filtros
    const aplyFilters = () => {
        //Fecha
        if (filters.desde.getTime() <= filters.hasta.getTime()) {
            for (let i = 0; i < completeHistory.length; i++) {
                //Formatear fecha del historial
                let initial = completeHistory[i].date.split(/\//);
                let date = [initial[1], initial[0], initial[2]].join('/')
                date = new Date(date);
                let dd = String(date.getDate()).padStart(2, '0');
                let mm = String(date.getMonth() + 1).padStart(2, '0');
                let yyyy = date.getFullYear();
                date = mm + '/' + dd + '/' + yyyy;
                var dateObject = new Date(date);
                date = dateObject;

                if (date.getTime() >= filters.desde.getTime() && date.getTime() <= filters.hasta.getTime() && filteredHistory.includes(completeHistory[i]._id) === false) {
                    filterArray.push(completeHistory[i]);
                }
            }
            setfilteredHistory(filterArray)
        } else {
            swal.fire({
                icon: "error",
                title: "Error en las fechas",
                text: '"Desde" es mayor que "Hasta"',
                confirmButtonText: "Entendido",
                confirmButtonColor: "red",
            });

            console.log("Desde: " + filters.desde);
            console.log("Hasta: " + filters.hasta);
        } //Fecha

        //Tipo
        if (!filters.movemenType) {
            filterArray = [];
            for (let i = 0; i < completeHistory.length; i++) {
                if (completeHistory[i].movemenType === filters.movemenType && filteredHistory.includes(completeHistory[i]._id) === false) {
                    filterArray.push(completeHistory[i]);
                }
            }
            setfilteredHistory(filterArray)
        }
        //Tipo

        //Fecha y tipo
        if (filters.desde.getTime() <= filters.hasta.getTime() && !filters.movemenType) {
            setfilteredHistory([]);
            filterArray = [];
            for (let i = 0; i < completeHistory.length; i++) {
                //Formatear fecha del historial
                let initial = completeHistory[i].date.split(/\//);
                let date = [initial[1], initial[0], initial[2]].join('/')
                date = new Date(date);
                let dd = String(date.getDate()).padStart(2, '0');
                let mm = String(date.getMonth() + 1).padStart(2, '0');
                let yyyy = date.getFullYear();
                date = mm + '/' + dd + '/' + yyyy;
                var dateObject = new Date(date);
                date = dateObject;

                if (date.getTime() >= filters.desde.getTime() && date.getTime() <= filters.hasta.getTime() && completeHistory[i].movemenType === filters.movemenType && filteredHistory.includes(completeHistory[i]._id) === false) {
                    filterArray.push(completeHistory[i]);
                }
            }
            setfilteredHistory(filterArray)
        } //Fecha y tipo
    }

    //Modal
    const showBaskets = (item) => {
        let baskets = item.baskets
        let basketsKeys = [];
        let basketsValues = [];
        let i = 0;
        let movemenType = item.movemenType
        
        if (movemenType == 'prestamo'){
            movemenType = 'Préstamo';
        } else {
            movemenType = 'Devolución'
        }
        let tablebody = `<table class="table table-bordered table-striped table-sm table-hover .table-responsive">`;

        for (const [key, value] of Object.entries(baskets)) {
            basketsKeys[i] = key.toString();
            basketsValues[i] = value;

            i++
        }

        console.log("Keys: " + basketsKeys);
        console.log("Values: " + basketsValues);

        for (i = 0; i < basketsKeys.length; i++) {
            tablebody = tablebody + `
            <tr>
                <td>${basketsKeys[i]}</td>
                <td>${basketsValues[i]}</td>
            </tr>
            `
        }

        tablebody = tablebody + '</table>'

        swal.fire({
            icon: 'info',
            title: 'Detalles ' + movemenType,
            html: tablebody,
            confirmButtonText: "Entendido"
        })
    }

    const showTotalDebt = () => {
        let baskets = completeHistory
        let basketsKeys = [];
        let basketsValues = [];
        let i = 0
        let totalDebt = 0;
        let tablebody = '<table class="table table-bordered table-striped table-sm table-hover .table-responsive">';
        for (let index = 0; index < baskets.length; index++) {
            for (const [key, value] of Object.entries(baskets[index].baskets)) {
                let actualKey = key.toString()
                if (baskets[index].movemenType == 'prestamo') {
                    if (basketsKeys.includes(actualKey)) {
                        let indice = basketsKeys.indexOf(actualKey)
                        let n = basketsValues[indice];
                        basketsValues[indice] = n + value;
                    } else {
                        basketsKeys[i] = key.toString();
                        basketsValues[i] = value;
                    }
                } else {
                    if (basketsKeys.includes(actualKey)) {
                        let indice = basketsKeys.indexOf(actualKey)
                        let n = basketsValues[indice];
                        basketsValues[indice] = n - value;
                    } else {
                        basketsKeys[i] = key.toString();
                        basketsValues[i] = value;
                    }
                }
                i++
            }
        }

        for (i = 0; i < basketsKeys.length; i++) {
            tablebody = tablebody + `
            <tr>
                <td>${basketsKeys[i]}</td>
                <td>${basketsValues[i]}</td>
            </tr>
            `
        }
        for (let i = 0; i < basketsValues.length; i++) {
            totalDebt += basketsValues[i];
        }
        tablebody = tablebody + '</table>'

        swal.fire({
            icon: 'info',
            title: 'Detalles deuda',
            html: tablebody,
            footer: `<tr>Deuda total: ${totalDebt}</tr>`,
            confirmButtonText: "Entendido"
            
        })
    }

    //Petición para obtener todo el historial
    const getGeneralHistory = () => {
        api.get(`/getCompleteHistoryByName/cliente/${getFromLocal('name')}`).then((res, err) => {
            if (!err) {
                setCompleteHistory(res.data);
                setfilteredHistory(res.data);

                console.log(res.data);
            } else {
                swal.fire({
                    icon: "error",
                    title: "Error al cargar el historial",
                    text: "Intente de nuevo",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "red",
                });
            }
        })
    }

    return (
        <div className="displayFiltersClient" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70" >
                <Row className="p-4">
                    <Col className="mx-auto my-auto">
                        <p>Filtrar por fecha</p>
                    </Col>
                    <Col className=" mx-auto">
                        <div>
                            <Col className="mx-auto">
                                <p>Desde: </p>
                            </Col>
                            <Col className="mx-auto">
                                <input
                                    type="date"
                                    id="desde"
                                    className="form-control w-60 m-auto"
                                    onChange={onChangeFields} />
                            </Col>
                            <Col className="mx-auto mt-2">
                                <p>Hasta: </p>
                            </Col>
                            <Col className=" mx-auto">
                                <input
                                    type="date"
                                    id="hasta"
                                    className="form-control w-60 m-auto"
                                    onChange={onChangeFields} />
                            </Col>
                        </div>
                    </Col>
                </Row>
                <Row className="p-4">
                    <Col className="mx-auto">
                        <p>Filtrar por tipo de movimiento</p>
                    </Col>
                    <Col className="mx-auto">
                        <Form.Group >
                            <Form.Control as="select" id="movemenType" onChange={onChangeFields}>
                                <option value="">Todos</option>
                                <option value="prestamo">Préstamo</option>
                                <option value="devolucion">devolucion</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <button onClick={aplyFilters} className="boton2 mb-5 w-40 h-50">Aplicar</button>
                <div className="row">
                    <div className="cards w-50 y-100 mr-5 col-sm-7">
                        <img className="float-right" src="https://icons-for-free.com/iconfiles/png/512/Free+Set+copy+Printer-1320568200680206615.png" alt="Impresora" />
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {filteredHistory.map((item) =>
                                <div className="col" key={item._id}>
                                    <div className=" card h-100 w-100 y-100">
                                        <div className="card-body">
                                            <p className="card-title sm-title">{item.movemenType === "prestamo" ? "Préstamo" : "Devolución"}</p>
                                            <p className="card-title">{item.date}</p>
                                            <button type="button" className="iconAdd mr-2" onClick={() => showBaskets(item)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="debt w-40 y-100 align-baseline col-sm">
                        <img className="float-right" src="https://icons-for-free.com/iconfiles/png/512/Free+Set+copy+Printer-1320568200680206615.png" alt="Impresora" />
                        <div className="row row-cols-1 row-cols-md-1 g-4">
                            <div className="col">
                                <div className="card h-100 w-100 y-100">
                                    <div className="card-body">
                                        <p className="card-title">Deuda</p>
                                        <p className="card-title">{todayStr}</p>
                                        <button type="button" className="iconAdd mr-2" onClick={showTotalDebt}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default DisplayFiltersClient;