import React, { Component } from 'react'

import classes from './tasks.module.sass'

import { Link } from "react-router-dom"

export default class Tasks extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    mapTask=()=>{
        const {data}=this.props;
        return data.task.map((item, index)=>{
            return (
                <div className={classes.tasks__wrapper__item}>
                    <div className={classes.tasks__wrapper__item__ml}>
                        <Link to='#' className={classes.link}>
                            <div className={classes.tasks__wrapper__item__index}>
                            {index+1}
                            </div>
                            <div className={classes.tasks__wrapper__item__text}>
                                {item.textTask}
                            </div>
                            <div className={classes.tasks__wrapper__item__author}>
                                By: {item.author}
                            </div>
                    </Link>
                    </div>
                </div>
            )
        })
    }

    render(){
        return(
            <div className={classes.tasks}>
                <div className={classes.tasks__nameTable}>
                    {this.props.data.nameTable}
                    {this.props.data.length}
                </div>
                <div className={classes.tasks__wrapper}>
                    {this.mapTask()}
                </div>
            </div>
        )
    }
}