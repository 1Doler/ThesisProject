import React, { Component } from 'react'

import * as moment from 'moment'
import Nav from '../../common/nav/Nav'

import classes from './info_board.module.sass'
import { Link } from 'react-router-dom';

export default class Task extends Component{
    constructor(props){
        super(props);
        const {table, boardId} = this.props; 
        const task = [];
        if(table)
        {
            table.map(elem => {
                if (elem.boardId === boardId)
                {
                    elem.task.map(itemTask=>{
                        task.push({...itemTask,tableId: elem._id})
                    })
                }
            })
        }
        const overdue_task = [];
        task.map(item=>{
            if(moment(item.dueDate).isBefore(moment()) && item.completionPercentage !=100)
                overdue_task.push(item)
        })
        let all_perc = 0, cls=0;
        task.map(item=>{
            all_perc += item.completionPercentage;
            if(item.completionPercentage===100)
                cls++;
            
        })
        all_perc /= task.length
        this.state = {
            task,
            status: {},
            status_task: task,
            overdue_task,
            current_status: 'All',
            executor_task: task,
            current_executor: '',
            all_perc,
            cls,
            percentage: 100
        }
    }
    componentDidMount = () =>{
        this.taskStatus()
    }
    taskStatus = () =>{
        const {task} = this.state;
        let status = {};
        if(task){
            task.map(item=>{
                const value = status[item.status] ? status[item.status] + 1 : 1
                const key = [item.status] != '' ? [item.status] : 'Not status'
                status = {...status, [key]: value}
            })
            this.setState({status})
        }
    }


    getStatusTask = (key) =>{
        const st = [];

        this.setState({current_status: key !='' ? key: 'Not status'})
        const {task} = this.state
        task.map(item=>{
            if(item.status===key){
                st.push(item)
            }
        })
        this.setState({status_task: st})
    }
    mapStatusTask = (status, percentage=false) =>{
        return status.map(item =>{
            if(percentage){
                if(item.completionPercentage == this.state.percentage)
                {
                    return(
                        <div className={classes.item}>
                            <Link onClick={()=>localStorage.setItem('tableId', item.tableId)} to={`/task/${item._id}`} className={classes.textTask}>
                                {item.textTask} {percentage? `- ${item.completionPercentage}%`: null}
                            </Link>
                        </div>
                    )
                }
            }
            else{
                return(
                    <div className={classes.item}>
                        <Link onClick={()=>localStorage.setItem('tableId', item.tableId)} to={`/task/${item._id}`} className={classes.textTask}>
                            {item.textTask} {percentage? `- ${item.completionPercentage}%`: null}
                        </Link>
                    </div>
                )
            }
        })
    }
    mapStatus = () =>{
        const {status} = this.state;
        const arr = []
        let allCount=0;
        for (var key in status){
            allCount += status[key];
            const k = key != 'Not status' ? key : '';
            arr.push(
                <div className={classes.item} onClick={()=>this.getStatusTask(k)}>
                    <div>{key}:</div> 
                    <div>
                        {status[key]}
                    </div>
                </div>
            )
        }
        arr.push(<div className={classes.item} onClick={()=>this.setState({status_task: this.state.task, current_status: 'All'})}>
                    <div>Все:</div> 
                    <div>
                        {allCount}
                    </div>
                </div>)
        return arr
    }
    mapOverdue = () =>{
        const {overdue_task} = this.state;
        return overdue_task.map(item =>{
            const late = moment().diff(moment(item.dueDate), 'days');
            const colorLate = late != 0 ? {color: 'red'} : {color: 'orange'}
            return(
                <div className={classes.item}>
                    <Link onClick={()=>localStorage.setItem('tableId', item.tableId)} to={`/task/${item._id}`} className={classes.textTask}>
                        {item.textTask} - <span style={colorLate}>просрочено на {late} д.</span>
                    </Link>
                </div>
            )
        })
    }
    mapExecutor = () =>{
        const exec = JSON.parse(localStorage.getItem('executor'));
        const b = exec.map(item=>{
            return(
                <div className={classes.item} onClick={()=>this.setExecutor(item._id,item.lastName+' '+item.firstName)}>
                    {item.lastName} {item.firstName} 
                </div>
            )
        })
        return b
    }
    setExecutor = (id,fullName) =>{
        const {task} = this.state;
        const executor_task = [];
        task.map(item=>{
            if(item.performer===id)
                executor_task.push(item)
        })
        this.setState({executor_task, current_executor: fullName})
    }

    render(){
        const {executor_task,cls,task, status_task,current_executor,all_perc,percentage} = this.state
        return(
            <div style={{display: 'flex'}}>
                <Nav />
                <div className={classes.info} style={{padding: '20px'}}>
                    <div className={classes.boardInfo}>
                        <h3>Информация о проекте</h3>
                        <div className={classes.wrapper}>
                            <div className={classes.item}>
                                Название проекта: Lorerne
                            </div>
                            <div className={classes.item}>
                                Автор: Kabilov Daler
                            </div>
                            <div className={classes.item}>
                                Описание: descr
                            </div>
                            <div className={classes.item}>
                                Дата создания: date
                            </div>
                            <div className={classes.item} style={{border: 'none'}}>
                                Проецент выполнения: {Math.round(all_perc)}%
                                <div style={{display: 'flex', alignItems: 'flex-end'}}>
                                    <div style={{marginRight: '10px'}}>{cls}</div> 
                                    <div className="myProgress" style={{width: '20%', backgroundColor: 'grey', height: '15px', marginTop: '5px'}}>
                                         <div className="myBar" style={{width: all_perc+'%',height: '15px', backgroundColor: '#81bb7c'}}></div>
                                    </div>
                                    {task.length-cls}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className={classes.taskPercentage}>
                        <h3>Процент выполнения задач</h3>
                        <select value={percentage} onChange={(e)=>this.setState({percentage: e.target.value})}>
                            <option value='0'>0</option>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='40'>40</option>
                            <option value='50'>50</option>
                            <option value='60'>60</option>
                            <option value='70'>70</option>
                            <option value='80'>80</option>
                            <option value='90'>90</option>
                            <option value='100'>100</option>
                        </select>
                        <div className={classes.wrapper}>
                            {this.mapStatusTask(task,true)}
                        </div>
                    </div>
                    <div className={classes.fullStatus}>
                        <div className={classes.status}>
                            <h3>Статусы задач</h3>
                            <div className={classes.wrapper}>
                                {this.mapStatus()}
                            </div>
                        </div>
                        <div className={classes.statusTask}>
                            <h3>Задача ({this.state.current_status})</h3>
                            <div className={classes.wrapper}>
                                {this.mapStatusTask(status_task)}
                            </div>
                        </div>
                    </div>
                    <div className={classes.overdue}>
                        <h3>Просроченные задачи</h3>
                        <div className={classes.wrapper}>
                            {this.mapOverdue()}
                        </div>
                    </div>
                    <div className={classes.fullStatus}>
                        <div className={classes.status}>
                            <h3>Исполнители</h3>
                            <div className={classes.wrapper}>
                                {this.mapExecutor()}
                                <div className={classes.item} onClick={()=>this.setExecutor(' ','Not executor')}>
                                    Без исполнителя
                                </div>
                            </div>
                        </div>
                        <div className={classes.statusTask}>
                            <h3>{current_executor !='' ? `Current executor: ${current_executor}` : current_executor}</h3>
                            <div className={classes.wrapper}>
                                {this.mapStatusTask(executor_task)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}