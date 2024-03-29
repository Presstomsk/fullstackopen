import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, createNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      await handleLogin(user)

      setUsername('')
      setPassword('')

      createNotification({ message: `${user.name} logged in`, isError: false })
    } catch (exception) {
      createNotification({ message: 'Wrong credentials', isError: true })
    }
  }

  return(
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={login}>
        <div>
            username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
            password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
}

export default LoginForm