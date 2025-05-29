import React, {useState} from 'react'
import { CreateUser } from '../service/services.js'
import { Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Check, X, ArrowLeft } from 'lucide-react'
import { Button, Form, Card } from 'react-bootstrap';

const Register = () => {

    const navigate= useNavigate();

    const [userInfo, setUserInfo]=useState({
        name:'',
        email:'',
        password:''
    })
    const [msg,setMsg]=useState({
        type:'',
        msg:'',
        icon:''
    })
    const create =async()=>{
       
        if(userInfo.name=='' || userInfo.email=='' || userInfo.password ==''){
            setMsg({
                type:'error',
                msg:'Todos los campos son obligatorios',
                icon:<X fontSize='inherit' />
            })
            return
        }
        try{
        console.log(userInfo)
        const response= await CreateUser(userInfo);
        if(response){
            setMsg({
                type:'success',
                msg:'usuario creado correctamente',
                icon:<Check fontSize='inherit' />
            })
           setTimeout(() => navigate('/'), 3000); 
           return
        }
        console.log(response)
        setMsg({
                type:'error',
                msg:'no se pudo crear el usuario, puede que el email ya este en uso',
                icon:<X fontSize='inherit' />
            })
        }catch(err){
            console.error(err)
        }
        
    } 
    const back=()=>{
        navigate('/')
    }
  return (<>
     <h1 className='text-primary mb-4 text-center'>Tuiter App</h1>

  <Card className='mx-auto' style={{ maxWidth: '400px' }}>
    <div className='p-3'>
      {msg.type && (
        <Alert variant={msg.type} className='mb-3 d-flex align-items-center'>
          {msg.icon && <span className='me-2'>{msg.icon}</span>}
          {msg.msg}
        </Alert>
      )}

      <h1 className='mb-4 d-flex align-items-center gap-3'>
        <Button variant='link' className='p-0' onClick={back} title='Volver'>
          <ArrowLeft size={24} />
        </Button>
        Crear Usuario
      </h1>

      <Form>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Control
            type='text'
            placeholder='Name'
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Control
            type='email'
            placeholder='Email'
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className='mb-4' controlId='formPassword'>
          <Form.Control
            type='password'
            placeholder='Password'
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            required
          />
        </Form.Group>

        <Button
          variant='outline-info'
          onClick={create}
          className='w-100'
          type='button'
        >
          Crear
        </Button>
      </Form>
    </div>
    </Card>
    </>
  )
}

export default Register