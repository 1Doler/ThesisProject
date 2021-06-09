import React, { Component } from 'react'
import { Link } from "react-router-dom"
import classes from './nav.module.sass'

export default class Nav extends Component{
    constructor(props){
        super(props);
        this.state={}
    }



    render(){
        return(
            <div className={classes.nav}>
                <div className={classes.top}>
                    <div className={classes.nav__logo}>
                        <i className="fas fa-clipboard-list"></i>
                        PROJECT MANAGER
                    </div>
                    <hr />
                    <ul className={classes.nav__item}>
                        <li className={classes.nav__item__home}> 
                            <i className="fas fa-home"></i>
                            <Link to='/'>Домашняя страница</Link>
                        </li>
                        <li className={classes.nav__item__projects}>
                            <i class="fas fa-id-card-alt"></i>
                            <Link to='/board'>Профиль</Link>
                        </li>
                        <li className={classes.nav__item__projects}>
                            <i className="fas fa-briefcase"></i>
                            <Link to='/board'>Поекты</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}