import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from 'react-to-print'
import swal from "sweetalert2";
import { getFromLocal, removeFromLocal} from "../functions/localStorage";
import { Container, Button } from "react-bootstrap";
import '../styles/pdfPreview.css';

const PdfPreview = () => {
    const [data, setDatos] = useState({});
    const [basketList, setBasketList] = useState([]);
    let [totalNumber, setTotalNumber] = useState(0);
    const ref = useRef(); 

    useEffect(
        () => {
            getData()
        }, []
    );

    const getData = () => {
        //Obtener los datos del usuario y del movimiento por separado
        const datos = JSON.parse(getFromLocal("data"))
        var baskets = datos.basketList;
        setDatos(datos);
        setBasketList(baskets);

        //Obtener el total de canastas en el movimiento
        for (let i = 0; i < datos.basketList.length; i++) {
            totalNumber = totalNumber + parseInt(datos.basketList[i].quantity);
            setTotalNumber(totalNumber);
        }
    }

    //Obtener fecha con día, mes y año
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    //Map con los datos para la tabla
    const tableBody = basketList.map((data) =>
        <tr>
            <td>{data.typeBaskets}</td>
            <td>{data.quantity}</td>
        </tr>
    )

    const reset = (e) => {
        swal.fire({
            title: 'Advertencia',
            text: '¿Seguro quieres cancelar este registro?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Sí',
            confirmButtonText: 'No',
            confirmButtonColor: "#fa1e0e",
            cancelButtonColor: "#51C2D5",
        }).then((result) => {
            if (!result.value) {
                removeFromLocal('data')
                window.history.back();
            }
        })
    }

    return (
        <div className="pdfPreview" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-75" >
                <h1 className="mx-auto my-3">Previsualización de pdf</h1>
                <div ref={ref}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-2">Control Diario de canastillas</h5>
                            <h5 className="card-title mb-2">Comercializadora Carmona Lopera</h5>
                            <h5 className="card-title mb-2">Bloque 18, local 10</h5>
                            <hr />
                            <p className="card-text">{data.typeUser==="cliente"?'Cliente':'Proveedor'}: {data.name}</p>
                            <p className="card-text">Fecha: {dd} / {mm} / {yyyy}</p>
                            <p className="card-text">Tipo de movimiento: {data.movemenType}</p>

                            <table class="table table-bordered table-striped table-sm table-hover .table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">Canastilla</th>
                                        <th scope="col">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableBody}
                                </tbody>
                            </table>
                            <div>
                            <p className="total">Total: {totalNumber}</p>
                            </div>
                        </div>
                        <div className="card-footer text-left">
                            <p>Firma:</p>
                            <hr />
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-2">Control Diario de canastillas</h5>
                            <h5 className="card-title mb-2">Comercializadora Carmona Lopera</h5>
                            <h5 className="card-title mb-2">Bloque 18, local 10</h5>
                            <hr />
                            <p className="card-text">{data.typeUser==="cliente"?'Cliente':'Proveedor'}: {data.name}</p>
                            <p className="card-text">Fecha: {dd} / {mm} / {yyyy}</p>
                            <p className="card-text">Tipo de movimiento: {data.movemenType}</p>

                            <table class="table table-bordered table-striped table-sm table-hover .table-responsive">
                                <thead>
                                    <tr>
                                        <th scope="col">Canastilla</th>
                                        <th scope="col">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableBody}
                                </tbody>
                            </table>
                            <div>
                                <p className="total">Total: {totalNumber}</p>
                            </div>
                        </div>
                        <div className="card-footer text-left">
                            <p>Firma:</p>
                            <hr />
                        </div>
                    </div>
                </div>


                <button type="button" className="boton3 mr-3 w-40 h-50" onClick={reset}>Cancelar</button>
                <ReactToPrint
                    trigger={() => <button className='boton2 mt-4 ml-3 w-40 h-50'>Descargar Reporte</button>}
                    content={() => ref.current}
                    copyStyles={true}
                    documentTitle={"Recibo de " + data.movemenType + " - " + today} />
            </Container>
        </div>
    );
}

export default PdfPreview;