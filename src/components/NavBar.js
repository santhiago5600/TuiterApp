import React from 'react'
import HacerPost from './HacerPost.js'
import {User} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import {LogOut} from 'lucide-react'
import { Alert } from '@mui/material';
import { Navbar, Container, Button } from 'react-bootstrap';


const NavBar = () => {
  const navigate = useNavigate()

  const user = () => {
    navigate('/user')
  }
  const logOut=()=>{
    localStorage.removeItem('appToken')
    window.location.reload()

  }
  return (
    <>
       <Navbar bg='light' expand='md' className='px-3'>
      <Container fluid className='d-flex align-items-center justify-content-between'>
        <div className='mx-auto'>
          <HacerPost />
        </div>
        <div>
          <Button variant='outline-primary' className='me-2' onClick={user} title='Perfil'>
            <User />
          </Button>
          <Button variant='outline-danger' onClick={logOut} title='Cerrar sesión'>
            <LogOut />
          </Button>
        </div>
      </Container>
    </Navbar>
    </>
  )
}

export default NavBar