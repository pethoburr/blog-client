import '../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../App'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Home = () => {
  const [slide, setSlide] = useState(false)
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

  const logOut = async () => {
    logout()
  }

  const toggleSidebar = () => {
    console.log('clicked')
    slide ? setSlide(false) : setSlide(true)
  }

  return (
    <>
      <div className='titleContainer'>
        <nav className={ slide ? 'navOpened' : 'navClosed'}>
          <div className='login'>
          { !token && <Link to='/log-in'>Log in</Link> }
          { !token && <Link to='/sign-up'>Sign up</Link>}
          </div>
          <div className='logout'>
            { token && <button onClick={logOut}>Logout</button>}
            { token && <Link to='/posts'>Posts</Link>}
            { token && <Link to='/topics'>Topics</Link>}
          </div>
        </nav>
        <div className='menuIcon'>{ slide ? <CloseIcon sx={{ color: 'darkorange'}} fontSize='large' onClick={() => toggleSidebar()}/> : <MenuIcon sx={{ color: 'darkorange' }} fontSize='large' onClick={() => toggleSidebar()} /> }</div>
      <h1>APEX PREDATORS</h1>
      </div>
      <div>
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
      </div>
    </>
  )
}

export default Home