import React, { Component } from 'react';

import classes from './modal.module.sass'

export default class Modal extends Component{
    state={
        email:'',
        role: ''
    }
    
    onClick = async ()=>{
        const {boardId,addExecutor} = this.props;
        const {email, role} = this.state;
        await addExecutor({email, boardId,role})
        this.props.getExecutor()
    }
    render(){
        const {active, close, addExecutor, boardId} = this.props;
        const {email, role} = this.state;
        return(
            <div className={classes.modal} style={active?{transform: 'scale(1)'}:{transform: 'scale(0)'}}>
                <div className={classes.content}>
                    <h3>Добавить исполнителя</h3>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            E-mail исполнителя:
                        </div>
                        <input value={email} onChange={(e)=>this.setState({email: e.target.value})}/>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Роль:
                        </div>
                        <select name='select' value={role} onChange={(e)=>this.setState({role: e.target.value})}>
                            <option value=''></option>
                            <option value='Manager'>Менеджер</option>
                            <option value='Performer'>Исполнитель</option>
                        </select>
                    </div>
                    <button className={classes.buttonAdd} onClick={()=>this.onClick()}>Добавить</button>
                    <br/>
                    <button className={classes.buttonCancel} onClick={()=>close()}>Отменить</button>
                </div>
            </div>
        )
    }
}