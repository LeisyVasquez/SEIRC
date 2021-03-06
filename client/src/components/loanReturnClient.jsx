import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import { Container, Form } from "react-bootstrap";

import ButtonCancel from './base/buttonCancel';



const LoanReturnClient = () => {

    return (
        <div className="basketsRegistration" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-50" >
                <h2 className="m-auto">Clientes</h2>
                <form className="form-signin mt-5 py-4" id="form">
                    <div class="form-check form-check-inline mx-0 mb-3" style={{ float: "left" }}>
                        <input class="form-check-input " type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label class="form-check-label fs-5" for="inlineRadio1">Préstamo</label>
                    </div>
                    <div class="form-check form-check-inline mb-3" >
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label class="form-check-label fs-5" for="inlineRadio2">Devolución</label>
                    </div>
                 <input type="text" class="form-control mb-3" placeholder="Nombre del cliente" list="listaclientes" />
                        <datalist id="listaclientes">
                            <option>Samuel</option>
                            <option>Juan</option>
                        </datalist>

                    <div class="input-group mb-3">
                        <input type="text" class="form-control mr-4" placeholder="Nombre de la canasta" list="listacanastas" />
                        <datalist id="listacanastas">
                            <option>Verde</option>
                            <option>Amarilla</option>
                        </datalist>
                        <input type="text" class="form-control" placeholder="Cantidad" />
                        <button type="button" class="input-group-text ml-4"> + </button>
                    </div>

                    <section className="mt-4">
                        <p class="text-start mt-4 mb-3">Otras canastillas</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control mr-4" placeholder="Nombre de la canasta" list="listacanastas" />
                            <datalist id="listacanastas">
                                <option>Samuel</option>
                                <option>Juan Pablo</option>
                            </datalist>
                            <input type="text" class="form-control" placeholder="Cantidad" />
                            <span class="input-group-text ml-4">+</span>
                        </div>
                    </section>
                    <ButtonCancel/>
                    <button type="button" className="boton2 mt-5 ml-3 w-40 h-50">Finalizar</button>
                </form>
            </Container>
        </div>
    );
}

export default LoanReturnClient;