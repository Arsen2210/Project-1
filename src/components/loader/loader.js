import React from 'react';
import classes from './loader.module.css';

function Loader(){
    return (
        <div className={classes.main}><div></div><div></div><div></div></div>
    );
}


export default React.memo(Loader)