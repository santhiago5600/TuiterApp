import React, { useState, useEffect } from 'react'
import { GetPosts } from '../service/services.js'
import PostCard from '../components/PostCard.js'
import NavBar from '../components/NavBar.js'
import { Spinner} from 'react-bootstrap'




const Homepage = () => {

    const [posts,setPosts]=useState()
    const [loadingPosts, setLoadingPosts] =useState('Loading posts...')
    const [info,setInfo]=useState(false)
    const loadPosts = async () => {
    try {
      const response = await GetPosts();
      if(response){
        setInfo(true)
        setPosts(response); 
      }
    } catch (error) {
      setLoadingPosts('Failed to load posts:', error);
    }
  };


  useEffect(() => {
    loadPosts();
  }, []);
  return (<>

    <NavBar />
    {info ? (
        posts.map((post) => (
          <div className='container'>
          <PostCard key={post.id} post={post}></PostCard>
          </div>
        ))
      ) : (<>
      <div className='text-center'>
        <Spinner animation='border' role='status' className='me-2' />
        <p>{loadingPosts}</p>
      </div>
        </>
      )}
    </>
  )
}

export default Homepage