import React, { Component } from 'react'

import classes from './addTaskList.module.sass'
import Modal from '../../common/modal/Modal';

export default class AddTaksList extends Component{
    constructor(props){
        super(props);
        this.state={
            table_data: props.data,
            active_modal: false
        }
    }

    render(){

        return(
            <div className={classes.taskList}>
                
                <img src='https://img.zohocdn.com/projects/images/svg/kbn-tasklist_a2e38_.svg' alt='img'/>
                <p>
                    No task lists yet<br/>
                    Task lists help you group a set of tasks together.
                </p>
                
                <button className={classes.taskList__button} onClick={()=>this.setState({active_modal: true})}>Create a Task List</button>
                <Modal 
                    active={this.state.active_modal} 
                    setActive={()=>(this.setState({active_modal: false}))}
                    addTaskList={this.props.addTaskList}
                    board_id={this.props.board_id}
                />
            </div>
        )
    }
}