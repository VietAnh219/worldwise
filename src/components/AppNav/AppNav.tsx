// import PageNav from "../PageNav/PageNav"
import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

const AppNav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="cities">Cities</NavLink>
                </li>
                <li>
                    <NavLink to="countries">Coutries</NavLink>
                </li>

            </ul>
        </nav>
    )
}

export default AppNav