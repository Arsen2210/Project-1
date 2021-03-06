import React from 'react';
import classes from './style.module.css';
import {NavLink, withRouter} from 'react-router-dom';


function NavMenu(){
    return (
        <nav>
            <ul className={classes.ul}>
            <li><NavLink activeClassName = {classes.active} exact className={classes.navlink} to="/">Home</NavLink></li>
            <li><NavLink activeClassName = {classes.active} exact className={classes.navlink} to="/about">About App</NavLink></li>
            <li><NavLink activeClassName = {classes.active} exact className={classes.navlink} to="/contact">Contact Us</NavLink></li>
        </ul>
        </nav>
    );
}

export default withRouter(React.memo(NavMenu));