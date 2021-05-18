import React, { Component } from 'react'

import Nav from '../../common/nav/Nav'


import classes from './users.module.sass'

export default class Board extends Component{
    constructor(props){
        super(props);
        const {boardData, boardId, getExecutor, executor} = props;
        const executorsId = [];
        let executors = [];
        boardData.map(elem => {
            if (elem._id === boardId)
            {
                executors = elem.executor.map(item=>{
                    executorsId.push(item.userId)
                    return {id: item.userId, role: item.role}
                })
            }
        })
        console.log(executors);
        
        getExecutor(executorsId);
        
        this.state={
            executors,
            executor
        }
    }
    mapUsers = () =>{
        const {executor, executors} = this.state
        if(executor){
            return executors.map(item=>{
                console.log(executor)
                const ind = executor.findIndex(elem=>elem._id === item.id);
                return(
                <div className={classes.users__wrapper__item}>
                    <div className={classes.users__wrapper__item__name}>{executor[ind].firstName}</div>
                    <div className={classes.users__wrapper__item__email}>{executor[ind].email}</div>
                    <div className={classes.users__wrapper__item__role}>{item.role}</div>
                </div>
                )
            })

        }
    }
    render(){
        const {executor} = this.state;
        const vis = this.mapUsers();
        return(
            <div style={{display: 'flex'}}>
                <Nav />
                <div className={classes.users}>
                    <div className={classes.users__wrapper}>
                        {vis}
                    </div>
                </div>
            </div>
        )
    }
}