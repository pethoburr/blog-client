import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../App'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Bottom from './Bottom'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';


const Home = () => {
  const [slide, setSlide] = useState(false)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [navbars, setNavbars] = useState(false)
  const { token, logout } = useContext(AuthContext)

  const getPosts = async () => {
    await fetch('https://still-pond-6102.fly.dev/')
    .then(resp => resp.json())
    .then(function(response) {
      response.map((post) => {
        const copy = post.text
        const sub = copy.substring(0, 140)
        post.text = sub
      })
      setPosts(response)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  useEffect(() => {
    getPosts()
  },[])

  const logOut = async () => {
    logout()
  }

  const toggleSidebar = () => {
    slide ? setSlide(false) : setSlide(true)
  }

  const changeHeaderBackground = () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const percentage = (scrollTop / scrollHeight) * 100;
    if (percentage >= 1) {
        setNavbars(true);
    } else {
      setNavbars(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeHeaderBackground)
  })

  const toPost = (id) => {
    navigate(`/posts/${id}`)
  }

  return (
    <>
      <div className='titleContainer'>
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
        <header className={ navbars ? 'headScroll' : 'head'}>
          <div className='menuIcon'>{ !slide && <MenuIcon sx={{ color: 'green', fontSize: '4rem' }}  onClick={() => toggleSidebar()} /> }</div>
          <h1 >APEX PREDATORS</h1>
        </header>
      </div>
      <div className='latest'>
        <h3 className='font-effect-shadow-multiple'>LATEST POSTS</h3>
        <ul>
        {posts.length > 0 ? posts.map((post) => {
          return(
            <li key={post._id}>
              <div className='title'>{post.title}</div>
              <div className='author'>{post.author}</div>
              <div className='time'>{post.time}</div>
              <div className='topicTitle'>{post.topic.title}</div>
              <div className='text'>{post.text}...</div>
              { token ? <button onClick={() => toPost(post._id)} className='continue'>Continue Reading</button> : <Link to='/log-in' className='loginContinue'>Log in to continue reading</Link>}
            </li>
            )
          }) : <div className='pac'><ClimbingBoxLoader size={15} color='green' />Loading...</div>}
        </ul>
      </div>
      <Bottom />
    </>
  )
}

export default Home