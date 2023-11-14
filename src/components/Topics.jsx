import '../App.css'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../App'
import Bottom from './Bottom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Topics = () => {
  const navigate = useNavigate()
  const [topics, settopics] = useState([])
  const [posts, setPosts] = useState([])
  const [slide, setSlide] = useState(false)
  const { token, logout } = useContext(AuthContext)
  const grouped = []

  const groupPosts = (topics, posts) => {
    for (let i = 0; i < posts.length; i++) {
        if (topics[i]._id === posts[i].topic) {
            grouped.push(posts[i].topic.title)
        }
    }
  }

  const toggleSidebar = () => {
    slide ? setSlide(false) : setSlide(true)
  }

  const getTopics = () => {
    console.log(`token: ${token}`)
    fetch('https://still-pond-6102.fly.dev/topics', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(function(response) {
      console.log(`topics: ${response.topics[0].title}, posts: ${response.posts[0].title}`)
      settopics(response.topics)
      setPosts(response.posts)
      groupPosts(response.topics, response.posts)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  const handleClick = (id) => {
    console.log('clicked')
    navigate(`/topics/${id}`)
  }

  useEffect(() => {
    getTopics()
  },[])

  useEffect(() => {
    console.log(`topics: ${topics}, posts: ${posts}`)
  },[topics, posts])

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
            <Link to='/' className='post'>Home</Link>
          </div>}
      </nav>
      <div className="topicBody">
        <h3>TOPICS</h3>
        <ul className='topicList'>
        {topics.length > 0 && topics.map((topic) => {
          return(
              <li key={topic._id} className='topicItem' onClick={() => {handleClick(topic._id)}} id={topic.title}>{topic.title}</li>
          )
        })}
      </ul>
      </div>
     <Bottom />
    </>
  )
}

export default Topics