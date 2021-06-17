import React, { Component } from 'react'
import { Link } from "react-router-dom"
import classes from './nav.module.sass'
import Modal from './modal'
export default class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            active: false
        }
    }



    render(){
        const {updateProfile} = this.props;
        return(
            <div className={classes.nav}>
                <Modal active={this.state.active} updateProfile={updateProfile} close={()=>this.setState({active: false})}/>
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
                        <li className={classes.nav__item__profile}>
                            <i class="fas fa-id-card-alt"></i>
                            <span onClick={()=>{this.setState({active: true})}}>Профиль</span>
                        </li>
                        <li className={classes.nav__item__projects}>
                            <i className="fas fa-briefcase"></i>
                            <Link to='/board'>Проекты</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}