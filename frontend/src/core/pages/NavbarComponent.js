import { NavLink } from 'react-router-dom'
import Logo from '../../assets/img/vphuoc.png'

const NavbarComponent = () => {
    const ActiveNavbar = (isActive) => ({
        color: isActive ? 'rgb(0, 0, 0)' : 'rgb(0, 0, 0, 0.3)',
    })

    return (
        <div className = "NavbarComponent">
             <a href = '/'>
                <img src = { Logo } alt = ""/>
             </a>
             <div className = "Routes">
                <NavLink className = "Home" style = {({ isActive }) => ActiveNavbar(isActive)} to = '/'>Home</NavLink>
             </div>
        </div>
    )
}

export { NavbarComponent }