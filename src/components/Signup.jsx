import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Bear from '../assets/grizzly.jpg'

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
  
  const addUser = (e) => {
    console.log(e.target)
      fetch('http://localhost:3000/sign-up', { 
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
        })
        .then((resp) => {
          console.log(resp)
        })
        .catch((err) => console.log(err))
}

  return (
    <>
      <div className="formContainer">
        <img src={Bear} alt="Grizzly Bear" />
        <div className="form">
            <form method='POST' className='was-validated' action='https://still-pond-6102.fly.dev/sign-up'>
            <h2>Sign up</h2>
            <div className="form-floating mb-3">
              <input type='text' required name='first_name' className='form-control' onChange={handleFirst} id='first_name' placeholder='enter first name' />
              <label htmlFor='first_name'>First Name</label>
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="form-floating mb-3">
              <input type='text' required name='last_name' className='form-control' onChange={handleLast} id='last_name' placeholder='enter last name' />
              <label htmlFor='last_name'>Last Name</label>
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="form-floating mb-3">
              <input type='text' required name='username'className='form-control' onChange={handleUser} id='username' placeholder='enter username' />
              <label htmlFor='username'>Username</label>
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="form-floating mb-3">
              <input type='password' required name='password' className='form-control' onChange={handlePass} id='password' placeholder='enter password' />
              <label htmlFor='password'>Password</label>
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
              <button type='submit' className='btn btn-primary' onClick={(e) => {addUser(e)}}>Submit</button><div>Already have an account?<Link to='/log-in'>Log in</Link></div>
            </form>
          </div>
      </div>
    </>
  )
}

export default Signup
