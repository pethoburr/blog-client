import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/home'
import Posts from './components/Posts'
import Post from './components/Post'
import Topics from './components/Topics'
import Topic from './components/Topic'
import { createContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const AuthContext = createContext()

function App() {
  const saved = localStorage.getItem('token')
  const [token, setToken] = useState(saved ? saved : null)

  const login = (newToken) => {
    setToken(newToken)
  }

  const logout = () => {
    localStorage.clear()
    setToken(null)
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/posts',
      element: <Posts />
    },
    {
      path: '/posts/:id',
      element: <Post />
    },
    {
      path: '/topics',
      element: <Topics />
    },
    {
      path: '/topics/:id',
      element: <Topic />
    },
    {
      path: '/log-in',
      element: <Login />
    },
    {
      path: '/sign-up',
      element: <Signup />
    }
  ])
  
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}

export default App
