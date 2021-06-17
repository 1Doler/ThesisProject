import React, { Component } from 'react'

import classes from './profile.module.sass'

import Nav from '../../common/nav/Nav' 

export default class Board extends Component{
    constructor(){
        super();
        this.state={
            
        }
    }

    render(){

        return(
            <div className={classes.profile}>
                <Nav/>
                <div className={classes.user_info}>
                    <div className={classes.firstName}>
                        Name
                    </div>
                    <div className={classes.lastName}>
                        lastName
                    </div>
                </div>
            </div>
        )
    }

}