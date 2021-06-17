import React, { Component } from 'react';

import classes from './modal.module.sass'

export default class Modal extends Component{
    
    
    
    render(){
        const {active, close} = this.props;
        const prof = JSON.parse(localStorage.getItem('profile'));
        
        return(
            <div className={classes.modal} style={active?{transform: 'scale(1)'}:{transform: 'scale(0)'}}>
                <div className={classes.content}>
                    <h3>Редактировать профиль</h3>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Имя:
                        </div>
                        <input name='firstName' value={prof.firstName}/>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Фамилия:
                        </div>
                        <input name='lastName' value={prof.lastName}/>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Пароль:
                        </div>
                        <input name='password' type="password"/>
                    </div>
                    <button className={classes.buttonAdd} onClick={()=>this.onClick()}>Изменить</button>
                    <br/>
                    <button className={classes.buttonCancel} onClick={()=>close()}>Отменить</button>
                </div>
            </div>
        )
    }
}