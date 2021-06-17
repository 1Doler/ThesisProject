import React, { Component } from 'react';

import classes from './modal.module.sass'

export default class Modal extends Component{
    
    
    
    render(){
        const {active, close,status,nameBoard,description,onSetValue} = this.props;
        
        return(
            <div className={classes.modal} style={active?{transform: 'scale(1)'}:{transform: 'scale(0)'}}>
                <div className={classes.content}>
                    <h3>Редактировать проект</h3>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Название:
                        </div>
                        <input name='nameBoard' value={nameBoard} onChange={(e)=>{onSetValue(e)}}/>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Описание:
                        </div>
                        <input name='description' value={description} onChange={(e)=>{onSetValue(e)}}/>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Статус:
                        </div>
                        <select name='status' value={status} onChange={(e)=>{onSetValue(e)}}>
                            <option value="Acive">Acive</option>,
                            <option value="Open">Open</option>,
                            <option value="Plannig">Plannig</option>,
                            <option value="In Progress">In Progress</option>,
                            <option value="On Track">On Track</option>,
                            <option value="In Tested">In Tested</option>,
                            <option value="On Hold">On Hold</option>,
                            <option value="Delayed">Delayed</option>,
                            <option value="Cancalled">Cancalled</option>,
                            <option value="Ready">Ready</option>
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