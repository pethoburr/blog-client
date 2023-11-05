import '../App.css'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../App'

const Posts = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const { token, logout } = useContext(AuthContext)

  const getPosts = () => {
    console.log(`token: ${token}`)
    fetch('http://localhost:3000/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(function(response) {
      setPosts(response)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  const handleClick = (id) => {
    console.log('clicked')
    navigate(`/posts/${id}`)
  }

  useEffect(() => {
    getPosts()
  },[])

  useEffect(() => {
    console.log(posts)
  },[posts])

  const logOut = () => {
    logout()
    navigate('/')
  }

  return (
    <>
     <button onClick={() => logOut()}>Logout</button>
     <Link to='/'>Home</Link>
     <Link to='/topics'>Topics</Link>
     <h1>Posts</h1>
     <ul>
      {posts.length > 0 && posts.map((post) => {
        return(
            <li key={post._id} onClick={() => {handleClick(post._id)}}>
              <p>{post.title}</p>
              <p>{post.author}</p>
              <p>{post.time}</p>
              <p dangerouslySetInnerHTML={{ __html: post.text}} />
            </li>
        )
      })}
     </ul>
    </>
  )
}

export default Posts