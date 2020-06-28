import React from 'react';
import classes from './style.module.css';


function NotFound(){
        return (
            <div>
            <h1 className= {classes.heading}>Error 404</h1>
            <h2 >The page not found!</h2>
            </div>
         
        );
}

export default React.memo(NotFound);