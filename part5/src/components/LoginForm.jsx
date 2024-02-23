import { useState } from 'react'
import loginService from '../services/login'

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
                    type="text"
                    value={username}
                    name="Username"          
                    onChange={event => setUsername(event.target.value)}
                />
                </div>
                <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={event => setPassword(event.target.value)}
                />
                </div>
                <button type="submit">login</button>
            </form>      
        </div>
    ) 
}

export default LoginForm