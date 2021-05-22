import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Nav from '../../common/nav/Nav'
import AddTaskList from './addTaskList'
import Modal from '../../common/modal/Modal'

import * as moment from 'moment'

import classes from './board.module.sass'

export default class Board extends Component{
    constructor(props){
        super(props);
        
        const localStorageRef = localStorage.getItem('table')
        this.state={
            table_data: JSON.parse(localStorageRef),
            active_modal: false,
            active_modalTask: false,
            addText: '',
            addDescr: '',
            addExec: '',
            addPriority: '',
            tableId: ''
        }
    }
    


    delTable = (id) =>{
        this.props.deleteTaskList(id);
    }
    
    onChange = (e) =>{
        const name = e.target.name;
        this.setState({[name]: e.target.value})
    }
    onAddTask = ()=>{
        const { addText, addDescr, addExec,addPriority, tableId} = this.state;
        const {userId} = this.props;
        if(addText)
        {
            this.props.addTask({addText,addDescr,addExec, addPriority, userId, tableId});
            this.setState({active_modalTask: false})
        }
        else
            alert('Заполните поле "Name Task"')
    }

    mapTable = (data) =>{
        return data.map(item =>{
            return(
                <div key={item._id} className={classes.board__wrapper__item}>
                    <div className={classes.board__wrapper__item__nameTable}>
                        <b>{item.nameTable}</b>
                        <div style={{display: 'flex'}}>
                            <div className={classes.board__wrapper__item__btnAdd}>
                                <i className="far fa-plus-square" 
                                    style={{display: 'inline-block',textAlign:'right', marginRight: '5px'}}
                                    onClick={()=>this.setState({active_modalTask: true, tableId: item._id})}
                                />
                            </div>
                            <div className={classes.board__wrapper__item__btnClose} onClick={()=>{this.delTable(item._id)}}>
                                <i className={"far fa-window-close"}></i>
                            </div>

                        </div>
                    </div>
                    <div className={classes.wr_ts}>
                        {this.mapTask(item.task,item._id)}
                    </div>
                </div>
            )
        })
    }
    mapTask = (data,id) =>{
        if(data.length){
            return data.map(item =>{

                const link_task = '/task/'+ item._id;
                
                const colorDate = {color: '#99cc60'};

                if(item.dueDate){
                    if(moment(item.dueDate).isBefore(moment()))
                    {
                        colorDate.color = 'red';
                    }
                }
                let exec;
                const localStorageExec = localStorage.getItem('executor')
                if( JSON.parse(localStorageExec))
                {
                    exec = JSON.parse(localStorageExec).map((elem)=>{
                        if(elem._id===item.performer)
                        return ' ' + elem.firstName + ' ' + elem.lastName
                    })

                }
                // COLOR PRIORITY 
                let color_priority={};
                switch(item.priority){ 
                    case ('Hight'):
                        color_priority={color: 'red', fontSize: '15px',marginRight: '10px'};
                        break;
                    case ('Medium'):
                        color_priority={color: 'orange', fontSize: '15px',marginRight: '10px'};
                        break;
                    case ('Low'):
                        color_priority={color: 'green', fontSize: '15px',marginRight: '10px'};
                        break;
                    default:
                        color_priority={color: 'white', fontSize: '15px',marginRight: '10px'};
                        break
                }
                // COLOR STATUS 
                let color_status={};
                switch(item.status){
                    case ('Ready'):
                        color_status={backgroundColor: '#64b5f6'};
                        break;
                    case ('In Progress'):
                        color_status={backgroundColor: '#ffd54f'};
                        break;
                    default:
                        color_status={backgroundColor: '#99cc60'};
                        break;
                }

                return(
                    <div key={item._id} className={classes.board__wrapper__item__task}>
                        <Link onClick={()=>this.props.getTableId(id)} to={link_task} style={{textDecoration: 'none', color: 'black'}}>
                            <div className={classes.board__wrapper__item__task__textTask}>
                                {item.textTask}
                            </div>
                        </Link>
                        
                        <div className={classes.board__wrapper__item__task__status} style={color_status}>
                            {item.status}
                        </div>
                        <hr/>
                        <div className={classes.board__wrapper__item__task__footer}>
                            
                            <div className={classes.board__wrapper__item__task__footer__tag}>
                                <i className="fas fa-exclamation-triangle" style={color_priority}></i>
    
                                {item.tag.length?<i className="fas fa-bookmark"></i> : null}
                            </div>
                            <div className={classes.board__wrapper__item__task__footer__author}>
                                <i className="fas fa-grin-wink" style={{color: '#99cc60'}}></i>  
                                {exec}
                            </div>
                        </div>
                        
                        <div className={classes.board__wrapper__item__task__dueDate} style={colorDate}>
                            {item.dueDate ? moment(item.dueDate).format('DD.MM.YYYY') : null}
                        </div> 
                        <div className={classes.deleteTask} onClick={()=>this.props.deleteTask(id,item._id)}>Delete task</div>
                    </div>
                )
            })
        }
        else{
            return(
                
                <div className={classes.board__wrapper__null}>
                    <p>
                        Щелкните значок плюса, чтобы добавить новую задачу
                    </p>
                </div>
            )
        }
    }

    

    render(){
        const { addText, addDescr, addExec,addPriority} = this.state;
        const {board_id,addTaskList,userId} = this.props;
        const localStorageExec = localStorage.getItem('executor');
        let optionExec = [];
        if(JSON.parse(localStorageExec))
        {
            JSON.parse(localStorageExec).map(item=>optionExec.push(<option value={item._id}>{item.firstName} {item.lastName}</option>))
        }
        let visuble = <h1>NOT DATA</h1>;
        if(this.state.table_data){
            const filter_data = this.state.table_data.filter((elem)=>{
                return elem.boardId === board_id
            })
            visuble = this.mapTable(filter_data).length ? this.mapTable(filter_data) : <AddTaskList board_id={board_id} addTaskList={addTaskList}/>;
        }
        const activeStyle = this.state.active_modalTask ? {display: 'flex'}:{display: 'none'};
        return(
            <div className={classes.board}>
                <Modal 
                    active={this.state.active_modal} 
                    setActive={()=>(this.setState({active_modal: false}))}
                    addTaskList={addTaskList}
                    board_id={board_id}
                />
                <div className={classes.addTask} style={activeStyle}>
                    <div className={classes.addTask__content}>
                        <h3>Create Task</h3>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Name Task:
                            </div>
                            <input 
                                className={classes.inp} 
                                type='text'
                                name='addText' 
                                value={addText}
                                onChange={(e)=>this.onChange(e)}
                            />
                        </div>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Description: 
                            </div>
                            <input 
                                className={classes.inp} 
                                type='text'
                                name='addDescr' 
                                value={addDescr}
                                onChange={(e)=>this.onChange(e)}
                            />
                        </div>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Select executor: 
                            </div>
                            <select 
                                className={classes.inp}
                                name='addExec' 
                                value={addExec}
                                onChange={(e)=>this.onChange(e)}
                            >
                                <option value='None'>None</option>
                                {[...optionExec]}
                            </select>
                        </div>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Select priority: 
                            </div>
                            <select 
                                className={classes.inp}
                                name='addPriority' 
                                value={addPriority}
                                onChange={(e)=>this.onChange(e)}
                            >
                                <option value='None'>None</option>
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                                <option value='Hight'>Hight</option>
                            </select>
                        </div>
                        <div 
                            className={classes.addTask__content__buttonAdd}
                            onClick={()=>this.onAddTask()}
                        >
                            ADD
                        </div>
                        <div 
                            className={classes.addTask__content__buttonCancel}
                            onClick={()=>this.setState({active_modalTask: false})}
                        >
                            CANCEL
                        </div>
                    </div>
                </div>
                <Nav />
                <div className={classes.section__board}>
                    <h2 className={classes.title}>
                        Page Board
                    </h2>
                    <Link to='/users' className={classes.users}>Users</Link>
                    <Link to='/info' className={classes.users}>Info</Link>
                    <button className={classes.board__buttonAddTaskList} onClick={()=>{this.setState({active_modal: true})}}>Create a Task List</button>
                    <div className={classes.board__wrapper}>
                        {visuble}
                    </div>
                </div>
                
            </div>
        )
    }
}