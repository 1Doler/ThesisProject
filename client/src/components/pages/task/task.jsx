import React, { Component } from 'react'

import Tasks from './tasks'

import * as moment from 'moment'

import classes from './task.module.sass'

import Button from '@material-ui/core/Button';

import Select from '../../common/select/select'

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
        console.log(filter1)
        const task_data = filter2[0];
        const {textTask,_id, description, author,status, dueDate, startDate, createDate, priority,completionPercentage} = task_data;
        const dif = moment(dueDate).diff(moment(startDate),'days');
        this.state = {
            filt: filter1[0],
            text: textTask,
            _id,
            description,
            author,
            status,
            dueDate: moment(dueDate).format('YYYY-MM-DD'),
            startDate: moment(startDate).format('YYYY-MM-DD'),
            createDate: moment(createDate).format('YYYY-MM-DD'),
            priority,
            duration: dif,
            completionPercentage
        }
    }
    
    onChangeInput = (e) =>{
        const name = e.target.name;
        this.setState({[name]: e.target.value})
        const {startDate, dueDate} = this.state
        
    }

    render(){
        const {data} = this.props;
        const {filt, text, description, author,status,createDate,dueDate,startDate,priority, duration,completionPercentage} = this.state;
        const optionStatus = [
            <option value=""></option>,
            <option value="Ready">Ready</option>,
            <option value="Open">Open</option>,
            <option value="Status">Status</option>,
            <option value="In Progress">In Progress</option>,
            <option value="In Review">In Review</option>,
            <option value="To Be Tested">To Be Tested</option>,
            <option value="On Hold">On Hold</option>,
            <option value="Delayed">Delayed</option>,
            <option value="Closed">Closed</option>,
            <option value="Cancalled">Cancalled</option>
        ];
        const optionPriority = [
            <option value="None">None</option>,
            <option value="Hight">Hight</option>,
            <option value="Low">Low</option>,
            <option value="Medium">Medium</option>,
        ];
        const optionCP = [];
        for(let i=0; i<=100; i+=10){
            optionCP.push(<option value={i}>{i}</option>)
        }
        
        return(
            <div key={this.props.tableId} className={classes.taskPage}>
                
                <Tasks data={filt}/>

                <div className={classes.task}>
                    <div className={classes.task__text}>
                        <input value={text} type='text' name='text' onChange={(e)=>{this.onChangeInput(e)}}/>
                    </div>
                    <div className={classes.task__info}>
                        <div className={classes.task__info__author}>
                            By {author}
                        </div>
                        <span>|</span>
                        <div className={classes.task__info__nameTable}>
                            <i className="fas fa-briefcase"></i>
                            NAME_BOARD
                        </div>
                    </div>
                    <div className={classes.task__status}>
                        <span>Current status </span> 
                        <select name="pets" id="pet-select" value={status} onChange={(e)=>{this.setState({status: e.target.value})}}>
                            {[...optionStatus]}
                        </select>
                    </div>
                    <div className={classes.task__description}>
                        <h2>Description</h2>
                        <div className={classes.task__description__text}>
                            <input value={description} type='text' name='description' onChange={(e)=>{this.onChangeInput(e)}}/>
                        </div>
                    </div>
                    <div className={classes.task__information}>
                        <h2 className={classes.task__information__title}>
                            Task Information
                        </h2>
                        <div className={classes.task__information__wrapper}>
                            <div className={classes.task__information__wrapper__owner}>
                                Owner: ...
                            </div>
                            <div className={classes.task__information__wrapper__startDate}>
                                <div className={classes.text}>
                                    startDate: 
                                </div> 
                                <input type='date' name='startDate' value={startDate} max={dueDate} onChange={(e)=>{this.onChangeInput(e)}}/>
                            </div>
                            <div className={classes.task__information__wrapper__dueDate}>
                                <div className={classes.text}>
                                    DueDate: 
                                </div>
                                <input type='date' name='dueDate' min={startDate} value={dueDate} onChange={(e)=>{this.onChangeInput(e)}}/>
                            </div>
                            <div className={classes.task__information__wrapper__priority}>
                                <div className={classes.text}>
                                    Priority: 
                                </div>
                                <select value={priority} onChange={(e)=>{this.setState({priority: e.target.value})}}>
                                    {[...optionPriority]}
                                </select>
                            </div>
                            <div className={classes.task__information__wrapper__duration}>
                                <div className={classes.text}>
                                    Duration: 
                                </div>
                                <input type='text' name='duration' value={duration}/>
                            </div>
                            <div className={classes.task__information__wrapper__completionPercentage}>
                                <div className={classes.text}>
                                    Complit: 
                                </div>
                                <select value={completionPercentage} onChange={(e)=>{this.setState({completionPercentage: e.target.value})}}>
                                    {[...optionCP]}
                                </select>
                            </div>
                        </div>
                    </div>
                    <Button variant="contained" color="primary">
                        Save
                    </Button>
                </div>
            </div>
        )
    }
}