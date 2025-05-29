import React, { useState, useEffect } from 'react'
import { GetUser } from '../service/services.js';
import {Pencil, ArrowLeft} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Container, Row, Col, Image } from 'react-bootstrap';


const User = () => {
    const [users,setUser]= useState()
    const [load,setLoad]=useState(false)
    
    const navigate= useNavigate();

    const loadUser = async () => {
        try {
          const response = await GetUser();
          if(response){
            setUser(response) 
          }
        } catch (error) {
        }finally{
            setLoad(true)
        }
      };

      useEffect(() => {
          loadUser();
        }, []);

        const edit =()=>{
            navigate('/editUser')
        } 
        const back=()=>{
        navigate('/home')
    }
  return (
    <>
        <Container className='p-4'>
      {load ? (
        <>

          <div className='d-flex justify-content-between mb-3'>
            <Button variant='outline-secondary' onClick={back}>
              <ArrowLeft />
            </Button>
            <Button variant='outline-primary' onClick={edit}>
              <Pencil />
            </Button>
          </div>

          
          <div className='text-center mb-3'>
            <Image
              src={users.avatar_url}
              roundedCircle
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              alt='Avatar'
            />
          </div>

          <div className='text-center'>
            <h1>{users.name}</h1>
            <h4 className='text-muted'>{users.email}</h4>
          </div>
        </>
      ) : (
        <div className='text-center'>
          <Spinner animation='border' role='status' className='me-2' />
          <h4 className='d-inline'>Cargando información...</h4>
        </div>
      )}
    </Container>
    </>
  )
}

export default User