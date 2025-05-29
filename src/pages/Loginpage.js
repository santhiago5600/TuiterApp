import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check,X } from 'lucide-react';
import { Alert } from '@mui/material';
import { Button, Form, Card } from 'react-bootstrap'


function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [msg,setMsg]=useState({
          type:'',
          msg:'',
          icon:''
      })

  const logIn = async () => {
    setLoading(true);
    setError(null);
     try {
      const response = await fetch(`https://tuiter.fragua.com.ar/api/v1/login`, {
        method: 'POST',
        headers: {
          'Application-Token': `d4ea63754d01755912ab71466510c35c8eb42c9b37ac1c7c2d6d4c23428ea43d`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
     const data= await response.json()
      if (!response.ok) {
        setMsg({
                type:'error',
                msg:'Ususario o contraseña incorrecta',
                icon:<X fontSize='inherit' />
            })
          setLoading(false);
        return false;
      }
      const token = data.token;
      if(token){
        localStorage.setItem('appToken', token);
        setMsg({
                        type:'success',
                        msg:'usuario creado correctamente',
                        icon:<Check fontSize='inherit' />
                    })
        setLoading(false);
        setTimeout(()=>window.location.reload(),3000)
        return
      }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
  };
  
   
  const resgistro=()=>{
    navigate('/register')
  }

  return (
  <>
  {msg.type && (
    <Alert variant={msg.type} className='mb-3 d-flex align-items-center'>
      {msg.icon && <span className='me-2'>{msg.icon}</span>}
      {msg.msg}
    </Alert>
  )}

  <h1 className='text-primary mb-4 text-center'>Tuiter App</h1>

  <Card className='mx-auto' style={{ maxWidth: '400px' }}>
    <Card.Body>
      <Card.Title className='mb-4'>Login</Card.Title>
      <Form.Group className='mb-3' controlId='formEmail'>
        <Form.Control
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button
        onClick={logIn}
        disabled={loading}
        className='w-100 mb-3'
        variant='info'
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      {error && (
        <p className='text-danger text-center mb-3'>{error}</p>
      )}

      <Button onClick={resgistro} variant='outline-info' className='w-100'>
        Regístrate
      </Button>
    </Card.Body>
  </Card>

    </>
  );
}

export default Loginpage;
