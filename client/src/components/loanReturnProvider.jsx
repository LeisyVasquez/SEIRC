import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import api from '../axios/axios';
import { Container, Form } from "react-bootstrap";

import ButtonCancel from './base/buttonCancel';

import LoanProvider from './loanProvider';
import ReturnProvider from './returnProvider';
import BasketsTable from './base/basketsTable'; 



const LoanReturnProvider = () => {
    const [option,setOption] = useState(0); 
    const setOptionClick = (e) =>{
        if(e.target.value==="option1")setOption(0);
        if(e.target.value==="option2")setOption(1);
    }
    return (
        <div className="basketsRegistration" >
            <Container className="text-center mx-auto my-5 px-5 py-3 bosy w-50" >
            <BasketsTable/>
                <h2 className="m-auto">Proveedores</h2>
                <form className="form-signin mt-4 py-4" id="form">
                    <div class="form-check form-check-inline mx-0 mb-3" style={{ float: "left" }}>
                        <input class="form-check-input " type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={setOptionClick}/>
                        <label class="form-check-label fs-5" for="inlineRadio1" >Me prestan</label>
                    </div>
                    <div class="form-check form-check-inline mb-3" >
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={setOptionClick} />
                        <label class="form-check-label fs-5" for="inlineRadio2">Devuelvo</label>
                    </div>
                    {option===1?<ReturnProvider/>:<LoanProvider/>}
                </form>
            </Container>
        </div>
    );
}
export default LoanReturnProvider;