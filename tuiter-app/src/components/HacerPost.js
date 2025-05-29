import React, { useState } from 'react'
import {Save,ArrowRight} from 'lucide-react'
import Alert from '@mui/material/Alert';
import { MakePost } from '../service/services.js';
import { Check } from 'lucide-react';
import { Button, Form, InputGroup } from 'react-bootstrap';



function HacerPost() {
const [postText,setPostText]=useState('')
const [showSuccess,setShowSuccess]= useState(false)
const [msg,setMsg]=useState('')
const [show, setShow] = useState(true);
  const Post = async ()=>{
    try{
        const response = await MakePost(postText);
        if(response){
            setPostText('')
            setMsg('Post creado correctamente')
            timer()
        }
    }catch(err){
        console.error(err)
    }finally{
      window.location.reload()
    }
  }
  const saveDraft=()=>{
    if(postText!= ''){
      localStorage.setItem('postDraft',postText)
      timer()
      setMsg('Post guardado correctamente')
    }
  }

 const timer = () => {
  setShowSuccess(true);
  setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
};
  
  return (
    <div>
      {showSuccess && (
        <Alert variant='success' className='mb-3 d-flex align-items-center'>
          <Check size={20} className='me-2' />
          {msg}
        </Alert>
      )}

      <InputGroup className='mb-3'>
        <Form.Control
          type='text'
          placeholder='Escribe tu post...'
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <Button variant='outline-secondary' onClick={saveDraft} title='Guardar borrador'>
          <Save />
        </Button>
        <Button variant='primary' onClick={Post} title='Publicar'>
          <ArrowRight />
        </Button>
      </InputGroup>
    </div>
  )
}

export default HacerPost