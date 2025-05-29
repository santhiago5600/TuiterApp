import React, { useState, useEffect } from 'react'
import { Heart, MessageCircle, Star, Check } from 'lucide-react';
import { Likes, PostReply, UnLikes } from '../service/services.js';
import Alert from '@mui/material/Alert';
import { Button, Form, Row, Col, Image } from 'react-bootstrap';



function PostCard(props) {

   const [replies,setReplies]=useState('');
   const [showSuccess,setShowSuccess] =useState(false)
   const [follow, setFollow]=useState({
    author:'',
    avatar_url:''
   })
   const [stared,setSared]=useState(false)
   
    const onFavoriteUser =()=>{
        const data= {author:props.post.author,avatar_url:props.post.avatar_url}
        setFollow(data);
        localStorage.setItem('favorites',JSON.stringify(data));
        timer2();
    }

   const handleReply = async ()=>{
    if(replies== ''){
        return
    }
    try{
        const response = await PostReply(props.post.id,replies);
        
        if(response){
            timer()
            setReplies('')
        }
    }catch(err){
        console.error(err)
    }finally{
      window.location.reload()
    }
   }

   const onLike= async()=>{
    if(props.post.likes==0){
      try{
        const response = await Likes(props.post.id);
        if(response){
          return
        }
      }catch(err){}
      finally{
      window.location.reload()
    }
      return
    }
    try{
        
        const response = await UnLikes(props.post.id);
        if(response){
          return
        }
      }catch(err){}
      finally{
      window.location.reload()
    }
      return
   }

    const timer = () => {
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };
    const timer2 = () => {
        setSared(true);
        setTimeout(() => {
            setSared(false);
        }, 2000);
    };

  return (<>
      {stared && (
        <Alert variant='success' className='mb-4 d-flex align-items-center'>
          <Check size={20} className='me-2' />
          Autor agregado a favoritos
        </Alert>
      )}

      <div className='bg-white shadow rounded p-4 mb-4'>
        {/* Header: avatar + name + star button */}
        <Row className='align-items-center mb-3'>
          <Col xs='auto' className='d-flex align-items-center gap-3'>
            <Image
              src={props.post.avatar_url || '/api/placeholder/40/40'}
              alt={props.post.author}
              roundedCircle
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
            <h5 className='mb-0'>{props.post.author}</h5>
          </Col>
          <Col className='text-end'>
            <Button
              variant='link'
              onClick={onFavoriteUser}
              className='text-warning p-0'
              title='Agregar a favoritos'
            >
              <Star size={24} />
            </Button>
          </Col>
        </Row>

        {/* Post message */}
        <p className='mb-4 text-secondary'>{props.post.message}</p>

        {/* Interaction row: input + buttons */}
        <Row className='align-items-center'>
          <Col>
            <Form.Control
              type='text'
              placeholder='Escribe una respuesta...'
              value={replies}
              onChange={(e) => setReplies(e.target.value)}
              className='me-2'
            />
          </Col>
          <Col xs='auto' className='d-flex gap-2'>
            <Button
              variant='outline-primary'
              onClick={() => handleReply(replies)}
              title='Responder'
            >
              <MessageCircle size={18} />
            </Button>
            <Button
              variant='outline-danger'
              onClick={onLike}
              title='Me gusta'
              className='d-flex align-items-center gap-1'
            >
              <Heart
                size={18}
                color={props.post.likes ? '#f9016c' : '#000000'}
              />
              <span>{props.post.likes || 0}</span>
            </Button>
          </Col>
        </Row>

        {/* Success alert */}
        {showSuccess && (
          <Alert variant='success' className='mt-3 d-flex align-items-center'>
            <Check size={20} className='me-2' />
            Respuesta publicada
          </Alert>
        )}
      </div>

</>

  )
}

export default PostCard