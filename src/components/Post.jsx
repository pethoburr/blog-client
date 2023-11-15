import '../App.css'
import Comment from '../components/Comments'
import { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import Bottom from './Bottom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Post = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [slide, setSlide] = useState(false)
  const [newText, setNewText] = useState('')
  const { token, logout } = useContext(AuthContext)

  const changer = (newer) => {
    const updatedComments = [...comments]
    const index = updatedComments.findIndex((item) => item._id === newer._id)
    if (index !== -1) {
      updatedComments[index] = newer
      console.log(`updatedComments: ${updatedComments[index].text}`)
      setComments(updatedComments)
    }
}

const toggleSidebar = () => {
  slide ? setSlide(false) : setSlide(true)
}

  const deleter = (cmntId) => {
    const updated = comments.filter((comment) => comment._id !== cmntId)
    setComments(updated)
  }

  const getPost = () => {
    console.log(`token: ${token}`)
    fetch(`http://localhost:3000/posts/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(function(response) {
      setPost(response.post)
      console.log(response.formatted)
      setComments(response.formatted)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  useEffect(() => {
    getPost()
  },[])

  useEffect(() => {
    if (post.length > 0) {
        console.log(`comments: ${post.comments[0]}`)
    }
  },[post])

  const handleChange = (e) => {
    e.preventDefault()
    setNewText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(token.id)
    console.log(`text: ${newText}`)
    fetch(`http://localhost:3000/posts/${id}/comments/add`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'credentials': 'include'
    },

    body: JSON.stringify({ text: newText}),
    })
    .then((resp) => resp.json())
    .then((resp) => {
      setComments((prevArray) => [...prevArray, resp.newComment])
      setNewText('')
    })
    .catch((err) => console.log(err))
  }

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
        <div className="postDetail">
          <h3>{post.title}</h3>
          <div className='postxt'>{post.text}</div>
          <div className="cc">
            <h6>comments</h6>
            { comments.length > 0 && comments.map((comment) => {
                return <Comment key={comment._id} up={changer} del={deleter} cmnt={comment} user={id} />
              })
            }
            <form className='cmntForm' onSubmit={(e) => {handleSubmit(e)}}>
                <input type='text' id='text' className='cmntInput' value={newText} name='text' placeholder='Add coment...' onChange={(e) => { return handleChange(e)}}  />
              <button type='submit' className='submitComment'>Add comment</button>
            </form>
          </div>
        </div>
     <Bottom />
    </>
  )
}

export default Post