import React, {useState, useEffect} from 'react'
import { GetUser,UpdateUser } from '../service/services.js'
import { Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Check, X, ArrowLeft } from 'lucide-react'
import { Form, Button, Container } from 'react-bootstrap';


const EditUser = () => {

    const navigate= useNavigate();
    const [load,setLoad]=useState(false)

    const [userInfo, setUserInfo]=useState({
        name:'',
        avatar_url:'',
        password:''
    })
    const [msg,setMsg]=useState({
        type:'',
        msg:'',
        icon:''
    })
    const loadUser = async () => {
            try {
              const response = await GetUser();
              if(response){
                console.log(response);
                setUserInfo(response) 
              }
            } catch (error) {
            }finally{
                setLoad(true)
            }
          };
    
          useEffect(() => {
              loadUser();
            }, []);
    const edit =async()=>{
       
        if(userInfo.name=='' || userInfo.avatar_url=='' || userInfo.password ==''){
            setMsg({
                type:'error',
                msg:'por favor no dejar campos vacios',
                icon:<X fontSize='inherit' />
            })
            return
        }
        try{
        const response= await UpdateUser(userInfo);
        if(response){
            setMsg({
                type:'success',
                msg:'informacion modificada correctamente',
                icon:<Check fontSize='inherit' />
            })
           setTimeout(() => back(), 3000); 
           return
        }
        console.log(response)
        setMsg({
                type:'error',
                msg:'no se pudo modificar la informacion',
                icon:<X fontSize='inherit' />
            })
        }catch(err){
            console.error(err)
        }
        
    } 
    const back=()=>{
        navigate('/user')
    }
  return (
    <Container className='p-4'>

      {msg.type !== '' && (
        <Alert variant={msg.type}>
          <div className='d-flex align-items-center'>
            {msg.icon && <span className='me-2'>{msg.icon}</span>}
            <span>{msg.msg}</span>
          </div>
        </Alert>
      )}


      <div className='d-flex align-items-center mb-4'>
        <Button variant='outline-secondary' onClick={back} className='me-2'>
          <ArrowLeft />
        </Button>
        <h2 className='mb-0'>Editar Usuario</h2>
      </div>


      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type='text'
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            placeholder='Ingrese el nombre'
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Avatar URL</Form.Label>
          <Form.Control
            type='text'
            value={userInfo.avatar_url}
            onChange={(e) => setUserInfo({ ...userInfo, avatar_url: e.target.value })}
            placeholder='URL del avatar'
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type='password'
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            placeholder='Ingrese una contraseña'
          />
        </Form.Group>

        <Button variant='info' onClick={edit}>
          Guardar Cambios
        </Button>
      </Form>
    </Container>
  )
}

export default EditUser