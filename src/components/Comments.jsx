/* eslint-disable react/prop-types */
import '../App.css'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../App'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Comment = ({ cmnt, user, up, del }) => {
    const [comment, setComment] = useState(cmnt.text)
    const [userId, setUserId] = useState(false)
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

    const getUserId = () => {
        fetch('https://still-pond-6102.fly.dev/comments/id', {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(resp => resp.json())
        .then((resp) => {
            console.log(`RESP: ${resp}`)
            if (resp === cmnt.sender._id) {
                setUserId(true)
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserId()
        console.log(`comment sender: ${cmnt.sender._id}`)
    },[])

    if(editing) {
        return(
            <>
                <form className='cmntForm' onSubmit={(e) => {handleEdit(e)}}>
                    <input type='text' className='cmntInput' value={comment} name='text' id='text' onChange={handleEditChange}/>
                    <button type='submit' className='submitComment'>Update</button>
                </form>
            </>
        )
    } else {
        return(
            <>
                <div className="commentContainer">
                    <div className="start">
                        <p className='name'>{cmnt.sender.username}</p>
                        <p className='time'>{cmnt.time}</p>
                        <p className='cmntxt'>{cmnt.text}</p>
                    </div>
                    <div className="eNd">
                     { userId && <><button className='editBtn' onClick={() => {edit()}}><EditOutlinedIcon sx={{ fontSize: '2.2rem'}} /></button>
                        <button className='deleteBtn' onClick={() => {handleDelete()}}><DeleteOutlinedIcon sx={{ fontSize: '2.2rem'}} /></button> </> }   
                    </div>
                    
                </div>
            </>
        )
    }    
}

export default Comment