import { NavLink, Outlet } from "react-router-dom"

export const Layout = () => {
    return(
        <div>
            <NavLink to = "/Proyectos">
                Proyectos
            </NavLink>
            <Outlet/>
        </div>
    )
}