import React, { Component } from 'react'

import classes from './task.module.sass'

import Button from '@material-ui/core/Button';

export default class Task extends Component{
    constructor(props){
        super(props);

        const {data, tableId, taskId} = props;
        const filter1 = data.filter((elem)=>{
            return elem._id === tableId
        })
        const filter2 = filter1[0].task.filter((elem)=>{
            return elem._id === taskId
        })
        const task_data = filter2[0];
        const {textTask,_id, description, author} = task_data;
        this.state = {
            text: textTask,
            _id: _id,
            description: description,
            author: author
        }
    }
    
    onChangeInput = (e) =>{
        const name = e.target.name;
        this.setState({[name]: e.target.value})
    }

    render(){
        
        
        const {_id, text, description, author} = this.state;
        
        return(
            <div className={classes.task}>
                Task_ID: {_id}
                <div className={classes.task__text}>
                    <input value={text} type='text' name='text' onChange={(e)=>{this.onChangeInput(e)}}/>
                </div>
                <div className={classes.task__author}>
                    By {author}
                </div>
                <div className={classes.task__description}>
                    Description:  <input value={description} type='text' name='description' onChange={(e)=>{this.onChangeInput(e)}}/>
                </div>
                <Button variant="contained" color="primary">
                    Save
                </Button>
            </div>
        )
    }
}