import '../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../App'


const Home = () => {
  const [posts, setPosts] = useState([])
  const { token, logout } = useContext(AuthContext)

  const getPosts = async () => {
    await fetch('https://still-pond-6102.fly.dev/')
    .then(resp => resp.json())
    .then(function(response) {
      setPosts(response)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  useEffect(() => {
    console.log(token)
    getPosts()
  },[])

  useEffect(() => {
    console.log(token)
  })

  const logOut = async () => {
    logout()
  }

  return (
    <>
      { !token && <Link to='/log-in'>Log in</Link> }
      { !token && <Link to='/sign-up'>Sign up</Link>}
      { token && <button onClick={logOut}>Logout</button>}
      { token && <Link to='/posts'>Posts</Link>}
      { token && <Link to='/topics'>Topics</Link>}
      
     <h1>The view</h1>
     <h3>LATEST POSTS</h3>
     <ul>
      {posts.length > 0 && posts.map((post) => {
        return(
          <li key={post._id}>
            <div>{post.title}</div>
            <div>{post.topic.title}</div>
            <div>{post.text}</div>
          </li>
        )
      })}
     </ul>
    </>
  )
}

export default Home