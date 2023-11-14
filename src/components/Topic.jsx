import '../App.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../App'
import Bottom from './Bottom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Topic = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [topic, setTopic] = useState('')
    const [posts, setPosts] = useState([])
    const { token, logout } = useContext(AuthContext)

    const getTopic = () => {
        fetch(`https://still-pond-6102.fly.dev/topics/${id}`)
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp)
                setTopic(resp.topic)
                resp.relevantPosts.map((post) => {
                    const copy = post.text
                    const sub = copy.substring(0, 140)
                    post.text = sub
                  })
                setPosts(resp.relevantPosts)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getTopic()
    },[])

    const [slide, setSlide] = useState(false)

    useEffect(() => {
        console.log('topic:' + topic)
        console.log('posts:' + posts)
    },[topic, posts])

    const logOut = () => {
        logout()
        navigate('/')
    }

    const handleClick = (id) => {
    console.log('clicked')
    navigate(`/posts/${id}`)
    }

    const toggleSidebar = () => {
        slide ? setSlide(false) : setSlide(true)
      }

      const toPost = (id) => {
        navigate(`/posts/${id}`)
      }

    return(
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
            <div className="topicDets">
                <h3>{topic.title}</h3>
                <p className='topicDescription'>{topic.description}</p>
                <h4>Posts</h4>
                <ul className='topicRel'>
                    {posts.length > 0 && posts.map((post) => {
                    return(
                        <li key={post._id}>
                        <div className='title' onClick={() => handleClick(post._id)}>{post.title}</div>
                        <div className='author' onClick={() => handleClick(post._id)}>{post.author}</div>
                        <div className='time' onClick={() => handleClick(post._id)}>{post.time}</div>
                        <div className='topicTitle' onClick={() => handleClick(post._id)}>{post.topic.title}</div>
                        <div className='text' onClick={() => handleClick(post._id)}>{post.text}...</div>
                        <button onClick={() => toPost(post._id)} className='continue'>Continue Reading</button>
                        </li>
                        )
                    })}
                </ul>
            </div>
            <Bottom />
        </>
    )
}

export default Topic