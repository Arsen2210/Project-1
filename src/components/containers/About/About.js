import React  from 'react';
import classes from './style.module.css';


function About(){
        return (
            <>
                <h1 className= {classes.heading}>About us page</h1>
                <h4 className= {classes.heading}>This is a ToDo project,and it's very easy to use.You can easily add task and delete it after finishing it,you can
                 easily edit if you want.This project was made by Arsen Madanyan,during react.js lesson.You can also view your task in single page or in modal.
                 This project is made by Arsen Madanyan,during react.js lesson, but it would be impossible without my trainer Masis Karapetyan.
                 </h4>
            </>
        );
}

export default React.memo(About);