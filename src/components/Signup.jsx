import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Bear from '../assets/grizzly.jpg'

const Signup = () => {
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstErr, setFirstErr] = useState(false)
  const [lastErr, setLastErr] = useState(false)
  const [userErr, setUserErr] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [firstClass, setFirstClass] = useState('form-control')
  const [lastClass, setLastClass] = useState('form-control')
  const [userClass, setUserClass] = useState('form-control')
  const [passClass, setPassClass] = useState('form-control')

  const handleFirst = (e) => {
    setFirst(e.target.value)
  }
  const handleLast = (e) => {
    setLast(e.target.value)
  }
  const handleUser = (e) => {
    setUsername(e.target.value)
  }
  const handlePass = (e) => {
    setPassword(e.target.value)
  }
  
  const addUser = (e) => {
    e.preventDefault()
    const data = {
      first_name: first,
      last_name: last,
      username: username,
      password: password
    }
      fetch('https://still-pond-6102.fly.dev/sign-up', { 
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        })
        .then((resp) => resp.json())
        .then((resp) => {
          const jayed = JSON.stringify(resp)
          console.log('resp:' + jayed)
          setFirstErr(false)
          setPassErr(false)
          setUserErr(false)
          setLastErr(false)
          setUserClass('form-control')
          setFirstClass('form-control')
          setLastClass('form-control')
          setPassClass('form-control')
          resp.map((obj) => {
            if (obj.path === 'first_name') {
              console.log(`firstname err: ${obj.msg}`)
              setFirstErr(true)
              setFirstClass('form-control is-invalid')
            }
            if (obj.path === 'last_name') {
              console.log(`lastname err: ${obj.msg}`)
              setLastErr(true)
              setLastClass('form-control is-invalid')
            }
            if (obj.path === 'username') {
              console.log(`username err: ${obj.msg}`)
              setUserErr(true)
              setUserClass('form-control is-invalid')
            }
            if (obj.path === 'password') {
              console.log(`password err: ${obj.msg}`)
              setPassErr(true)
              setPassClass('form-control is-invalid')
            }
          })
        })
        .catch((err) => console.log(err))
}

  return (
    <>
      <div className="formContainer">
        <img src={Bear} alt="Grizzly Bear" />
        <div className="form">
            <form method='POST' className={ firstErr || lastErr || userErr || passErr ? '' : 'was-validated'} action='https://still-pond-6102.fly.dev/sign-up' noValidate>
            <h2>Sign up</h2>
            <div className="form-floating mb-3">
              <input type='text' required name='first_name' className={firstClass} onChange={handleFirst} id='first_name' placeholder='enter first name' />
              <label htmlFor='first_name'>First Name</label>
              { firstErr && <div className="invalid-feedback">First name required.</div> }
            </div>
            <div className="form-floating mb-3">
              <input type='text' required name='last_name' className={lastClass} onChange={handleLast} id='last_name' placeholder='enter last name' />
              <label htmlFor='last_name'>Last Name</label>
              { lastErr && <div className="invalid-feedback">Last name required.</div> }
            </div>
            <div className="form-floating mb-3">
              <input type='text' required name='username'className={userClass} onChange={handleUser} id='username' placeholder='enter username' />
              <label htmlFor='username'>Username</label>
              { userErr && <div className="invalid-feedback">Unique username required.</div> }
            </div>
            <div className="form-floating mb-3">
              <input type='password' required name='password' className={passClass} onChange={handlePass} id='password' placeholder='enter password' />
              <label htmlFor='password'>Password</label>
              { passErr && <div className="invalid-feedback">Password.</div> }
            </div>
              <button type='submit' className='btn btn-primary' onClick={(e) => {addUser(e)}}>Submit</button><div>Already have an account?<Link to='/log-in'>Log in</Link></div>
            </form>
          </div>
      </div>
    </>
  )
}

export default Signup
