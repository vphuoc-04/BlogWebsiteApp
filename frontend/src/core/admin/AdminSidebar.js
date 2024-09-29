import { NavLink } from "react-router-dom"

const ActiveSidebarItems = (isActive) => ({
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    margin: '50px 20px -20px 20px',
    padding: '5px 10px',
    borderRadius: '10px',
    backgroundColor: isActive ? 'rgb(67, 169, 162)' : 'rgb(246, 246, 246)',
    color: isActive ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
    gap: '20px',
})

const AdminSidebar = () => {
    return (
        <div className = "AdminSidebar">
            <NavLink to = '/admin/dashboard' style = {({ isActive }) => ActiveSidebarItems(isActive)}>
                <i class = "fa-solid fa-chart-pie"></i>
                <p>Dashboard</p>
            </NavLink>
            <NavLink to = '/admin/profile' style = {({ isActive }) => ActiveSidebarItems(isActive)}>
                <i class = "fa-solid fa-user"></i>
                <p>Profile</p>
            </NavLink>
        </div>
    )
}

export { AdminSidebar }