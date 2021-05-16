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
            table_data: props.data ? props.data : JSON.parse(localStorageRef),
            active_modal: false
        }
    }
   
    componentDidUpdate() {
        const {data} = this.props;
        localStorage.setItem('table', JSON.stringify(data));
    }

    addTable = (boardId, nameTable) =>{
        const newItem = {boardId,nameTable,task:[]}
        this.setState({table_data: [...this.state.table_data,newItem]})
    }

    delTable = (id) =>{
        const {table_data} = this.state;
        const ind = table_data.findIndex(elem=> elem._id === id);
        const newArr = [...table_data.slice(0,ind),...table_data.slice(ind+1)]; 
        this.setState({table_data: newArr});
        this.props.deleteTaskList(newArr, id);
    }


    mapTable = (data) =>{
        return data.map(item =>{
            return(
                <div key={item._id} className={classes.board__wrapper__item}>
                    <div className={classes.board__wrapper__item__nameTable}>
                        <b>{item.nameTable}</b>
                        <div style={{display: 'flex'}}>
                            <div className={classes.board__wrapper__item__btnAdd}>
                                <i className="far fa-plus-square" style={{display: 'inline-block',textAlign:'right', marginRight: '5px'}}></i>
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
                // COLOR PRIORITY 
                let color_priority={};
                switch(item.priority){
                    case ('Hight'):
                        color_priority={color: 'red', fontSize: '15px',marginRight: '10px'};
                        break;
                    case ('Medium'):
                        color_priority={color: 'orange', fontSize: '15px',marginRight: '10px'};
                        break;
                    default:
                        color_priority={color: 'green', fontSize: '15px',marginRight: '10px'};
                        break;
                }
                // COLOR STATUS 
                let color_status={};
                switch(item.status){
                    case ('Ready'):
                        color_status={backgroundColor: '#64b5f6'};
                        break;
                    case ('in progress'):
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
                                {item.author}
                            </div>
                        </div>
                        
                        <div className={classes.board__wrapper__item__task__dueDate}>
                            {item.dueDate ? moment(item.dueDate).format('DD.MM.YYYY') : null}
                        </div> 
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
        const {table_data} = this.state;
        const {board_id,addTaskList,userId} = this.props;
        let visuble = <h1>NOT DATA</h1>;
        if(table_data){
            const filter_data = table_data.filter((elem)=>{
                return elem.boardId === board_id
            })
            visuble = this.mapTable(filter_data).length ? this.mapTable(filter_data) : <AddTaskList board_id={board_id} addTable={this.addTable} addTaskList={addTaskList}/>;
        }
        
        return(
            <div className={classes.board}>
                <Modal 
                    active={this.state.active_modal} 
                    setActive={()=>(this.setState({active_modal: false}))}
                    addTaskList={addTaskList}
                    addTable={this.addTable}
                    board_id={board_id}
                />
                <div className={classes.addTask}>
                    <div className={classes.addTask__content}>
                        <h3>Create Task</h3>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Name Task: 
                            </div>
                            <input type='text'/>
                        </div>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Chose: 
                            </div>
                            <input type='text'/>
                        </div>
                        <div className={classes.addTask__content__item}>
                        <div className={classes.addTask__content__item__text}>
                                Name Task: 
                            </div>
                            <input type='text'/>
                        </div>
                    </div>
                </div>
                <Nav />
                <div className={classes.section__board}>
                    <h2 className={classes.title}>
                        Page Board
                    </h2>
                    <button className={classes.board__buttonAddTaskList} onClick={()=>{this.setState({active_modal: true})}}>Add Task List</button>
                    <div className={classes.board__wrapper}>
                        {visuble}
                    </div>
                </div>
                
            </div>
        )
    }
}