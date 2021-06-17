import React, { Component } from 'react';

import classes from './modal.module.sass'

export default class Modal extends Component{
    
    
    onClick = () =>{
        const {close,status,nameBoard,description,_id,updateBoard} = this.props;
        if(nameBoard.trim()){
            updateBoard(status,nameBoard,description,_id)
        }
        else
            alert('Не удалось изменить данные из-за не корректные данные');
        close();
    }




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
                            <option value="Acive">Активно</option>,
                            <option value="Open">Открыто</option>,
                            <option value="Plannig">Планируется</option>,
                            <option value="In Progress">В ходе выполнения</option>,
                            <option value="In Tested">В тестировании</option>,
                            <option value="Delayed">Задержано</option>,
                            <option value="Cancalled">Отменено</option>,
                            <option value="Ready">Готово</option>
                        </select>
                    </div>
                    
                    <button className={classes.buttonAdd} onClick={()=>this.onClick()}>Изменить</button>
                    <br/>
                    <button className={classes.buttonCancel} onClick={()=>close()}>Отменить</button>
                </div>
            </div>
        )
    }
}