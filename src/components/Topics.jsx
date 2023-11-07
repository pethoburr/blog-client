import '../App.css'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../App'
import Bottom from './Bottom'

const Topics = () => {
  const navigate = useNavigate()
  const [topics, settopics] = useState([])
  const [posts, setPosts] = useState([])
  const { token, logout } = useContext(AuthContext)
  const grouped = []

  const groupPosts = (topics, posts) => {
    for (let i = 0; i < posts.length; i++) {
        if (topics[i]._id === posts[i].topic) {
            grouped.push(posts[i].topic.title)
        }
    }
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
    <button onClick={() => {logOut()}}>Log Out</button>
     <Link to='/'>Home</Link>
     <Link to='/posts'>Posts</Link>
     <h1>topics</h1>
     <ul>
      {topics.length > 0 && topics.map((topic) => {
        return(
            <li key={topic._id} onClick={() => {handleClick(topic._id)}}>{topic.title}</li>
        )
      })}
     </ul>
     <h1>posts</h1>
     <ul>
      {posts.length > 0 && posts.map((post) => {
        return(
            <li key={post._id} onClick={() => {handleClick(post._id)}}>{post.title}: {post.text}</li>
        )
      })}
     </ul>
     <Bottom />
    </>
  )
}

export default Topics