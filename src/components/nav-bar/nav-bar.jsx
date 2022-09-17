import { Outlet, Link } from "react-router-dom";
import { Fragment } from 'react'
import {ReactComponent as Logo} from '../../assets/logo.svg'

import styles from './styles.module.css'
const Navigation = () => {
    return (
        <Fragment>
            <div className={styles.navbar}>
                <Link to='/' ><Logo className={styles.logo}/></Link>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;