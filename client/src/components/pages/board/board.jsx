import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Nav from '../../common/nav/Nav'

import * as moment from 'moment'

import classes from './board.module.sass'

export default class Board extends Component{
    constructor(props){
        super(props);
        this.state={
            table_data: props.data
        }
    }

    mapTable = (data) =>{
        return data.map(item =>{
            return(
                <div key={item._id} className={classes.board__wrapper__item}>
                    <div className={classes.board__wrapper__item__nameTable}>
                        <b>{item.nameTable}</b>
                        <i className="far fa-plus-square" style={{display: 'inline-block',textAlign:'right'}}></i>
                    </div>
                    <div className={classes.wr_ts}>
                        {this.mapTask(item.task,item._id)}
                    </div>
                </div>
            )
        })
    }
    mapTask = (data,id) =>{
        return data.map(item =>{
            const link_task = '/task/'+ item._id;
            // COLOR PRIORITY 
            let color_priority={};
            switch(item.priority){
                case ('High'):
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
                        DueDate: {moment(item.dueDate).format('DD.MM.YYYY')}
                    </div> 
                </div>
                
            )
        })
    }

    render(){
        const {table_data} = this.state;
        const {board_id} = this.props;
        
        const filter_data = table_data.filter((elem)=>{
            return elem.boardId === board_id
        })
        const visuble = this.mapTable(filter_data).length ? this.mapTable(filter_data) : <h1>NOT DATA!!</h1>;
        
        return(
            <div className={classes.board}>
                <Nav />
                <div className={classes.section__board}>
                    <h2 className={classes.title}>
                        Page Board
                    </h2>
                    <div className={classes.board__wrapper}>
                        {visuble}
                    </div>
                </div>
                
            </div>
        )
    }
}