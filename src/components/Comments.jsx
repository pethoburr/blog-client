/* eslint-disable react/prop-types */
import '../App.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../App'

const Comment = ({ cmnt, user, up, del }) => {
    const [comment, setComment] = useState(cmnt.text)
    const [editing, setEditing] = useState(false)
    const { token } = useContext(AuthContext)

    const edit = () => {
        setEditing(true)
    }

    const handleEditChange = (e) => {
        setComment(e.target.value)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        console.log('cmnt:' + comment)
        fetch(`https://still-pond-6102.fly.dev/posts/${user}/comments/${cmnt._id}/update`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: comment })
        })
        .then((resp) => resp.json())
        .then((resp) => {
            console.log(resp)
            setEditing(false)
            up(resp)
        })
        .catch((err) => console.log(err))
    }

    const handleDelete = () => {
        fetch(`https://still-pond-6102.fly.dev/posts/${user}/comments/${cmnt._id}/delete`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commentId: cmnt._id })
        })
        .then((resp) => resp.json())
        .then((resp) => {
            console.log(resp)
            del(cmnt._id)
        })
        .catch((err) => console.log(err))
    }

    if(editing) {
        return(
            <>
                <form onSubmit={(e) => {handleEdit(e)}}>
                    <input type='text' value={comment} name='text' id='text' onChange={handleEditChange}/>
                    <button type='submit'>Update</button>
                </form>
            </>
        )
    } else {
        return(
            <>
                <div className="commentContainer">
                    <p>{cmnt.sender.username}</p>
                    <p>{cmnt.text}</p>
                    <p>{cmnt.time}</p>
                    <button onClick={() => {edit()}}>Edit</button>
                    <button onClick={() => {handleDelete()}}>Delete</button>
                </div>
            </>
        )
    }    
}

export default Comment