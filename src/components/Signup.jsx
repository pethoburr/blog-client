import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Signup = () => {
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFirst = (e) => {
    setFirst(e.target.value)
  }
  const handlePass = (e) => {
    setLast(e.target.value)
  }
  const handleLast = (e) => {
    setUsername(e.target.value)
  }
  const handleUser = (e) => {
    setPassword(e.target.value)
  }
  
  const addUser = async (e) => {
    console.log(e.target)
    await fetch('http://localhost:3000/sign-up', { 
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            first_name: JSON.stringify(first),
            last_name: JSON.stringify(last),
            username: JSON.stringify(username),
            password: JSON.stringify(password)
        }
        })
        .then((response) => {
            response.json()
            }
        )
        .catch(err => console.log(err))
}

  return (
    <>
     <h1>Sign up</h1>
     <form method='POST' action='http://localhost:3000/sign-up'>
      <label htmlFor='first_name'>
        <input type='text' required name='first_name' onChange={handleFirst} id='first_name' placeholder='enter first name' />
      </label>
      <label htmlFor='last_name'>
        <input type='text' required name='last_name' onChange={handleLast} id='last_name' placeholder='enter last name' />
      </label>
      <label htmlFor='username'>
        <input type='text' required name='username' onChange={handleUser} id='username' placeholder='enter username' />
      </label>
      <label htmlFor='password'>
        <input type='password' required name='password' onChange={handlePass} id='password' placeholder='enter password' />
      </label>
      <button type='submit' onClick={(e) => {addUser(e)}}>Submit</button><div>Already have an account?<Link to='/log-in'>Log in</Link></div>
     </form>
    </>
  )
}

export default Signup
