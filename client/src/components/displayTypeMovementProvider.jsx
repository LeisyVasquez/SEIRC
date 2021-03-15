import React,{useState,useEffect} from "react";
import api from '../axios/axios';
import {Container,Row,Col,Form,Table} from 'react-bootstrap';
import '../styles/displayTypeMovementAndTypeBaskets.css';
import swal from "sweetalert2";

const DisplaypeMovementProvider = () =>{
    const [generalList,setGeneralList] = useState([]);
    const [auxList,setAuxList] = useState([]);

    useEffect(
        () => {
            getQuantityTotalByMovement()
        }, []
    );


    function getQuantityTotalByMovement(){
        api.get('/getQuantityTotalByMovement/proveedor').then(res => {
            if (res.status === 254) {
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Por favor vuelva más tarde',
                  })
                  
            }else if(res.status === 255) {
                swal.fire({
                    icon: 'error',
                    title: 'No hay registros',
                    text: 'Ingrese prestamos o devoluciones',
                  })
            }
            else {
                setGeneralList(res.data);
                setAuxList(res.data);    
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

    const onChangeFields = (e) =>{
        console.log(e.target.value);

       if(e.target.id === "date" && document.getElementById('typeMovement').value===""){
            const dateSplit = e.target.value.split('-');
           api.get(`/getQuantityByTypeMovement/proveedor/${dateSplit[2]+"-"+dateSplit[1]+"-"+dateSplit[0]}/`).then((res)=>{
                if(res.status === 254){
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Por favor vuelva más tarde',
                      })
                }else if(res.status === 255){
                    swal.fire({
                        icon: 'error',
                        title: 'No hay registros con esa fecha',
                        text: 'Ingrese prestamos o devoluciones',
                      })
                }else{
                    setAuxList(res.data);
                }
           }).catch((err)=>{
            swal.fire({
                icon: 'error',
                title: 'Error en el servidor',
                text: 'Por favor vuelva más tarde',
              })
           })
       }

       if(document.getElementById('date').value!=="" && document.getElementById('typeMovement').value!==""){
            const dateSplit = document.getElementById('date').value.split('-');
            api.get(`/getQuantityByTypeMovement/proveedor/${dateSplit[2]+"-"+dateSplit[1]+"-"+dateSplit[0]}/`).then((res)=>{
                if(res.status === 254){
                    swal.fire({
                        icon: 'error',
                        title: 'Error en el servidor',
                        text: 'Por favor vuelva más tarde',
                    })
                }else if(res.status === 255){
                    swal.fire({
                        icon: 'error',
                        title: 'No hay registros con esa fecha',
                        text: 'Ingrese prestamos o devoluciones',
                    })
                }else{
                    if(document.getElementById('typeMovement').value ==="prestamo")setAuxList([res.data[0]]);
                    else setAuxList([res.data[1]]);
                }
            }).catch((err)=>{
                swal.fire({
                    icon: 'error',
                    title: 'Error en el servidor',
                    text: 'Por favor vuelva más tarde',
                })
            })
       }

       if((e.target.id === "typeMovement" && e.target.value!=="") && document.getElementById('date').value===""){
        if(e.target.value ==="prestamo")setAuxList([generalList[0]]);
        else setAuxList([generalList[1]]);
   }
    }

    return(
        <div className="typeMovement" >
            <Container className="text-center mt-2 mx-auto my-5 p-5 bosy w-70">
                <h1 className="m-auto py-5">Visualización por tipo de movimiento proveedor</h1>
                <Row className="p-4" onChange={onChangeFields}>
                    <Col>
                        <input
                            type="date"
                            id="date"
                            className="form-control w-60 m-auto"/> 
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Control as="select" id="typeMovement"  className="form-control w-60 m-auto">
                                <option value="">Tipo de movimiento</option>
                                <option value="prestamo">Prestamo</option>
                                <option value="devolucion">Devolucion</option>
                            </Form.Control>
                        </Form.Group>       
                    </Col>
                </Row>
                
                <Table striped bordered hover responsive="sm">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo de movimiento</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {   auxList.map((item)=>
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.typeMovement}</td>
                            <td>{item.total}</td>
                        </tr>
                        )
                    }
                    </tbody>
                </Table> 
            </Container>
        </div>
    );
}

export default DisplaypeMovementProvider;