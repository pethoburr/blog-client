import '../App.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../App'
import Bottom from './Bottom'

const Topic = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)
    const [topic, setTopic] = useState('')
    const [posts, setPosts] = useState([])

    const getTopic = () => {
        fetch(`https://still-pond-6102.fly.dev/topics/${id}`)
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp)
                setTopic(resp.topic)
                setPosts(resp.relevantPosts)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getTopic()
    },[])

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

    return(
        <> 
            <Link to='/posts'>Posts</Link>
            <button onClick={logOut}>Log out</button>
            <div>topics n shit</div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            {posts.length > 0 && posts.map((post) => {
                return(
                    <div onClick={() => {handleClick(post._id)}} key={post._id}>{post.title}</div>
                )
            })}
            <Bottom />
        </>
    )
}

export default Topic