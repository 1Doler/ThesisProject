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
        const localStorageExec = JSON.parse(localStorage.getItem('executor'));
        if(localStorageExec){

            return localStorageExec.map(item=>{
                const {firstName, lastName, email, role, _id} = item;
                const disNone = role === 'Admin' ? {display: 'none'} : null;
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
                        <div className={classes.btnDelete} style={disNone} onClick={()=>this.dExecutor(_id)}>
                            Удалить
                        </div>
                    </div>
                )
            })
        }
    }
    dExecutor = (_id) =>{
        const role = localStorage.getItem('role');
        if(role === 'Admin' || role === 'Manager')
        {
            if(window.confirm('Вы действительно хотите удалить этого пользователя?'))
                this.props.deleteExecutor(_id)
        }
        else 
            alert('У вас недостатоно прав!')
    }
    aExecutor = () =>{
        const role = localStorage.getItem('role');
        if(role === 'Admin' || role === 'Manager')
        {
            this.setState({active: true}) 
        }
        else 
            alert('У вас недостатоно прав!')
    }
    render(){
        const {addExecutor,boardId,updateProfile} = this.props;
        return(
            <div style={{display: 'flex'}}>
                <Nav updateProfile={updateProfile}/>
                <div className={classes.users}>
                    <div className={classes.head}>
                        <h2>Исполнители</h2>
                        <button className={classes.btnAdd} onClick={()=>this.aExecutor()}>Добавить исполнителя</button>
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