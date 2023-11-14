import '../App.css'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../App'
import Bottom from './Bottom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Posts = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [slide, setSlide] = useState(false)
  const { token, logout } = useContext(AuthContext)

  const getPosts = () => {
    console.log(`token: ${token}`)
    fetch('https://still-pond-6102.fly.dev/posts', {
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

  const toggleSidebar = () => {
    slide ? setSlide(false) : setSlide(true)
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
    <header className='headScroll'>
          <div className='menuIcon'>{ !slide && <MenuIcon sx={{ color: 'green', fontSize: '4rem' }}  onClick={() => toggleSidebar()} /> }</div>
          <h1>APEX PREDATORS</h1>
        </header>
    <nav className={ slide ? 'navOpened' : 'navClosed'}>
        <CloseIcon sx={{ color: 'green', justifySelf: 'flex-end', fontSize: '4rem'}} onClick={() => toggleSidebar()}/>
        { !token ? <div className='login'>
            <Link to='/log-in' className='in'>Log in</Link> 
            <Link to='/sign-up' className='out'>Sign up</Link>
          </div> : <div className='logout'>
            <button onClick={logOut} className='logOutBtn'>Logout</button>
            <Link to='/posts' className='post'>Posts</Link>
            <Link to='/topics' className='topic'>Topics</Link>
          </div>}
        </nav>
        <div className="postList">
          <h3>ALL POSTS</h3>
            <ul className='postListContainer'>
              {posts.length > 0 && posts.map((post) => {
                return(
                    <li key={post._id} className='postListItem' onClick={() => {handleClick(post._id)}}>
                      <p className='title'>{post.title}</p>
                      <p className='author'>{post.author}</p>
                      <p className='time'>{post.time}</p>
                      <p dangerouslySetInnerHTML={{ __html: post.text}} />
                    </li>
                )
                })}
          </ul>
        </div>
     <Bottom />
    </>
  )
}

export default Posts