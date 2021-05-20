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
                    <h3>Add users</h3>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            User email:
                        </div>
                        <input value={email} onChange={(e)=>this.setState({email: e.target.value})}/>
                    </div>
                    <div className={classes.item}>
                        <div className={classes.text}>
                            Select role:
                        </div>
                        <select name='select' value={role} onChange={(e)=>this.setState({role: e.target.value})}>
                            <option value=''></option>
                            <option value='Manager'>Manager</option>
                            <option value='Performer'>Performer</option>
                        </select>
                    </div>
                    <button className={classes.buttonAdd} onClick={()=>this.onClick()}>Add</button>
                    <button className={classes.buttonCancel} onClick={()=>close()}>Cancel</button>
                </div>
            </div>
        )
    }
}