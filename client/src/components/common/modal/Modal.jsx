import React, { Component } from 'react'

import classes from './Modal.module.sass'

export default class Modal extends Component{
    constructor(props){
        super(props);
        this.state={
            nameTask: ''
        }
    }

    onClick = () =>{
        
        const { setActive, addTaskList, board_id,addTable } = this.props
        if(this.state.nameTask)
        {
            addTaskList(board_id, this.state.nameTask);
            setActive();
        }
        else
            alert('Заполните поле Name "TaskList"')
    }
    render(){
        const { active, setActive } = this.props
            return(
                <div className={active ? classes.active : classes.modal}>
                    <div className={classes.modal__content}>
                        <div className={classes.modal__content__title}>
                            Создать "TaskList"
                        </div>
                        <div className={classes.modal__content__nameTask}>
                            <p>Название "TaskList"</p>
                            <input value={this.state.nameTask} onChange={(e)=>this.setState({nameTask: e.target.value})}/>
                        </div>
                        <button className={classes.modal__content__buttonAdd} onClick={()=>this.onClick()}>Добавить</button><br/>
                        <button className={classes.modal__content__buttonCancel} onClick={()=>setActive()}>Отменить</button>
                    </div>
                </div>
            )
    }
}