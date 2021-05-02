import React, { Component } from 'react'

import classes from './task.module.sass'

import Button from '@material-ui/core/Button';

export default class Task extends Component{
    constructor({data}){
        super({data});
        this.state = {
            text: data.textTask,
            _id: data._id,
            description: data.description,
            author: data.author
        }
    }
    
    onChangeInput = (e) =>{
        const name = e.target.name;
        this.setState({[name]: e.target.value})
    }

    render(){
       const {data} = this.props;
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