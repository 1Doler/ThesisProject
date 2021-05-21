import React, { Component } from 'react'

import Nav from '../../common/nav/Nav'
import Modal from './modal.jsx'

import classes from './users.module.sass'

export default class Board extends Component{
    constructor(props){
        super(props);
        this.state={
            active: false,
        }
    }
    mapExecutor = () =>{
        const {executor} = this.props;
        if(executor){

            return executor.map(item=>{
                const {firstName, lastName, email, role} = item;
                return(
                    <div className={classes.users__wrapper__item}>
                        <div className={classes.fullName}>
                            {firstName} {lastName}
                        </div>
                        <div className={classes.email}>
                            {email}
                        </div>
                        <div className={classes.role}>
                            {role}
                        </div>
                        <div className={classes.btnDelete}>
                            Delete
                        </div>
                    </div>
                )
            })
        }
    }
    render(){
        const {addExecutor,boardId} = this.props;
        return(
            <div style={{display: 'flex'}}>
                <Nav />
                <div className={classes.users}>
                    <div className={classes.head}>
                        <h2>Page Users</h2>
                        <button className={classes.btnAdd} onClick={()=>this.setState({active: true})}>AddUser</button>
                    </div>
                    <Modal 
                        active={this.state.active} 
                        close={()=>this.setState({active: false})}
                        addExecutor={addExecutor}
                        boardId={boardId}
                        getExecutor={this.props.getExecutor}
                    />
                    <div className={classes.users__wrapper}>
                        {this.mapExecutor()}
                    </div>
                </div>
            </div>
        )
    }
}