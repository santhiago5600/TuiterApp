import React, {useState,useEffect} from 'react';

const URL = 'https://tuiter.fragua.com.ar/api/v1';
const token= localStorage.getItem('appToken')
const appToken= '7f968f326b867a68e9e37cf7fe6510f85439828412e26793e982bf8648f5ba3b'
  //Get para los post
  export const GetPosts = async ()=>{
    try{
      const response= await fetch(`${URL}/me/feed`,{
        method:'GET',
        headers:{
          'Application-Token': `${appToken}`,
          'Authorization': `${token}`
        }
      });
      
      if(!response.ok){
        return false
      }
      const data = await response.json()
      return data;
    }catch(err){
      console.error('Error al traer los posts',err)
    }
  }
  //Get para replies
  export const GetReplies = async (id)=>{
    try{
      const response = await fetch(`${URL}/api/v1/me/tuits/${id}/replies`,{
        method:'GET',
        headers:{
          'Application-Token': `${appToken}`,
          'Authorization': `${token}`
        }
      });
      console.log(response)
      if(!response.ok){
        return false;
      };
      const data = await response.json();
      
      return data
    }catch(err){
      console.error('Error al traer las respuestas', err)
    }
  }
  //Post para replies
  export const PostReply = async(id,message)=>{
    try{
      const response = await fetch(`${URL}/me/tuits/${id}/replies`,{
        method:'POST',
        headers:{
          'Authorization':`${token}`,
          'Application-Token':`${appToken}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          message
        })
      });
      if(response.ok){
        return true
      }
    }catch(err){
      console.error('rply post:',err)
    }
  }
  //Post para hacer post
  export const MakePost= async (message)=>{
    try{
      const response= await fetch(`${URL}/me/tuits`,{
        method:'POST',
        headers:{
          'Authorization':`${token}`,
          'Application-Token':`${appToken}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          message
        })
      });
      if(response.ok){
        return true
      }
    }catch(err){
      console.error('Make post:',err)
    }
  }
  //Posr para dar like a un post
  export const Likes = async(id)=>{
    try{
      const response = await fetch(`${URL}/me/tuits/${id}/likes`,{
        method:'POST',
        headers:{
          'Authorization':`${token}`,
          'Application-Token':`${appToken}`
        }
      })
      if(response.ok){
        console.log(response.json())
        return true
      }
      return false

    }catch(err){
      console.error('likes',err)
    }
  }
  //Delete para quitar like 
  export const UnLikes = async(id)=>{
    try{
      const response = await fetch(`${URL}/me/tuits/${id}/likes`,{
        method:'DELETE',
        headers:{
          'Authorization':`${token}`,
          'Application-Token':`${appToken}`
        }
      })
      if(response.ok){
        console.log(response.json())
        return true
      }
      return false

    }catch(err){
      console.error('likes',err)
    }
  }
  //Get para info de usuario
  export const GetUser  = async()=>{
    try{
      const response = await fetch(`${URL}/me/profile`,{
        method:'GET',
        headers:{
          'Application-Token': `${appToken}`,
          'Authorization': `${token}`
        }
    });
    if(response.ok){
      return response.json()
    }
    }catch(err){
      console.error('user',err)
    }
  }
  //Post para crear usuario 
  export const CreateUser = async(user)=>{
    try{
      const response = await fetch(`${URL}/users`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Application-Token': `${appToken}`,
        },
        body:JSON.stringify({
          name:user.name,
          email:user.email,
          password:user.password
        })
      });
      if(response.ok){
        return true
      }
      return false
    }catch(err){
      console.error('create user:',err)
    }
    
  }
  //Put para actualizar info de usuario 
  export const UpdateUser = async(user)=>{
     try{
      const response = await fetch(`${URL}/me/profile`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'Application-Token': `${appToken}`,
          'Authorization':`${token}`
        },
        body:JSON.stringify({
          name:user.name,
          avatar_url:user.avatar_url,
          password:user.password
        })
      });
      if(response.ok){
        return true
      }
      return false
    }catch(err){
      console.error('update user:',err)
    }
  }
