import '../App.css'
import Comment from '../components/Comments'
import { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

const Post = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
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
      console.log(response.comments)
      setComments(response.comments)
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
      setComments((prevArray) => [...prevArray, resp.comment])
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
     <Link to='/'>Home</Link>
     <Link to='/topics'>Topics</Link>
     <Link to='/posts'>Posts</Link>
     <button onClick={() => logOut()}>Logout</button>
     <h1>{post.title}</h1>
     <div>{post.text}</div>
     <h3>comments</h3>
     { comments.length > 0 && comments.map((comment) => {
        return <Comment key={comment._id} up={changer} del={deleter} cmnt={comment} user={id} />
      })
    }
     <form onSubmit={(e) => {handleSubmit(e)}}>
      <label htmlFor='text'>Add comment 
        <input type='text' id='text' value={newText} name='text' placeholder='enter text' onChange={(e) => { return handleChange(e)}}  />
      </label>
      <button type='submit'>Add comment</button>
     </form>
    </>
  )
}

export default Post