import React, { Component } from 'react';

import classes from './modal.module.sass'

export default class Modal extends Component{
    constructor(){
        super();
        const prof = JSON.parse(localStorage.getItem('profile'));
        this.state={
            firstName: prof ? prof.firstName : '',
            lastName: prof ? prof.lastName : ''
        }
    }

    modal = () =>{
        const prof = this.state;
        const {close} = this.props;
        if(prof)
        {
            return(
                <div className={classes.content}>
                    <h3>Редактировать профиль</h3>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Имя:
                        </div>
                        <input name='firstName' value={prof.firstName} onChange={(e)=>this.setState({firstName: e.target.value})}/>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Фамилия:
                        </div>
                        <input name='lastName' value={prof.lastName} onChange={(e)=>this.setState({lastName: e.target.value})}/>
                    </div>
                    <button className={classes.buttonAdd} onClick={()=>this.onClick(prof.firstName, prof.lastName)}>Изменить</button>
                    <br/>
                    <button className={classes.buttonCancel} onClick={()=>close()}>Отменить</button>
                </div>
            )
                
        }
    }
    onClick = (firstName, lastName) =>{
        const {updateProfile} = this.props;
        if(firstName.trim() && lastName.trim()){
            updateProfile(firstName, lastName)
        }
        else
            alert('Заполните все поля')
    }
    
    render(){
        const {active} = this.props;
        
        return(
            <div className={classes.modal} style={active?{transform: 'scale(1)'}:{transform: 'scale(0)'}}>
               {this.modal()}
            </div>
        )
    }
}