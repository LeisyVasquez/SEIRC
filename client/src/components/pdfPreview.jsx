import React from "react";

import ButtonCancel from './base/buttonCancel';

import { Container } from "react-bootstrap";
import '../styles/pdfPreview.css';

const PdfPreview = () => {

    return (
        <div className="pdfPreview" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h1 className="mx-auto my-3">Previsualización de pdf</h1>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-2">Control Diario de canastillas</h5>
                        <h5 className="card-title mb-2">Comercializadora Carmona Lopera</h5>
                        <h5 className="card-title mb-2">Bloque 18, local 10</h5>
                        <hr />
                        <p className="card-text">Cliente: Samuel Villegas</p>
                        <p className="card-text">Fecha: 14/03/2021</p>
                        <p className="card-text">Tipo de usuario: Cliente</p>
                        <p className="card-text">Tipo de movimiento: Préstamo</p>

                        <table class="table table-bordered table-striped table-sm table-hover .table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Canastilla</th>
                                    <th scope="col">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>101-Abatible</td>
                                    <td>864</td>
                                </tr>
                                <tr>
                                    <td>102-Lopera</td>
                                    <td>34</td>
                                </tr>
                                <tr>
                                    <td>119-Salmon</td>
                                    <td>100</td>
                                </tr>
                            </tbody>
                            
                        </table>
                        <div>
                            <p className="total">Total:</p>
                            <p className="total">998</p>
                        </div>
                    </div>
                    <div className="card-footer text-left">
                    <p>Firma:</p>
                    <hr/>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-2">Control Diario de canastillas</h5>
                        <h5 className="card-title mb-2">Comercializadora Carmona Lopera</h5>
                        <h5 className="card-title mb-2">Bloque 18, local 10</h5>
                        <hr />
                        <p className="card-text">Cliente: Samuel Villegas</p>
                        <p className="card-text">Fecha: 14/03/2021</p>
                        <p className="card-text">Tipo de usuario: Cliente</p>
                        <p className="card-text">Tipo de movimiento: Préstamo</p>

                        <table class="table table-bordered table-striped table-sm table-hover .table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Canastilla</th>
                                    <th scope="col">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>101-Abatible</td>
                                    <td>864</td>
                                </tr>
                                <tr>
                                    <td>102-Lopera</td>
                                    <td>34</td>
                                </tr>
                                <tr>
                                    <td>119-Salmon</td>
                                    <td>100</td>
                                </tr>
                            </tbody>
                            
                        </table>
                        <div>
                            <p className="total">Total:</p>
                            <p className="total">998</p>
                        </div>
                    </div>
                    <div className="card-footer text-left">
                    <p>Firma:</p>
                    <hr/>
                    </div>
                </div>
                
                <ButtonCancel />
                <button type="button" className="boton2 mt-4 ml-3 w-40 h-50">Finalizar</button>
            </Container>
        </div>
    );
}

export default PdfPreview;