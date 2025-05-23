// import { style } from "framer-motion/client"
import { Outlet } from "react-router-dom"
import AppNav from "../AppNav/AppNav"
import Logo from "../Logo/Logo"
import style from "./Sidebar.module.css"

const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <Logo />
            <AppNav />

            <Outlet />
            <footer className={style.footer}>
                <p className={style.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by Worldwide Inc.
                </p>
            </footer>
        </div>
    )
}

export default Sidebar