import { Link } from "react-router-dom"

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/create">Create new</Link>
        <Link style={padding} to="/about">About</Link>           
      </div>
    )
}

export default Menu