import React, { Component } from 'react'

import classes from './tasks.module.sass'

import { Link } from "react-router-dom"

export default class Tasks extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    mapTask=()=>{
        const {data,id}=this.props;
        
        return data.task.map((item, index)=>{
            let color_priority={};
            switch(item.priority){
                case ('Hight'):
                    color_priority={color: 'red', fontSize: '10px'};
                    break;
                case ('Medium'):
                    color_priority={color: 'orange', fontSize: '10px'};
                    break;
                default:
                    color_priority={color: 'green', fontSize: '10px'};
                    break;
            }
            
            const bgcolor = item._id===id ? {backgroundColor: '#f5e3e3', borderLeft: '3px solid red',fontWeight: 'bold'} : null;

            const textsl = item.textTask.length>60 ? item.textTask.slice(0,60)+'...' : item.textTask;

            return (
                <div className={classes.tasks__wrapper__item} style={bgcolor}>
                    <div className={classes.tasks__wrapper__item__ml}>
                        <Link to={'/task/'+item._id} className={classes.link}>
                            <div className={classes.tasks__wrapper__item__text}>
                                <span className={classes.tasks__wrapper__item__index} style={{color: '#f48fb1', fontWeight: 'bold'}}>BE2-T{index+1} </span>
                                - {textsl}
                            </div>
                            <div className={classes.tasks__wrapper__item__author}>
                                By: {item.author}
                                <i className="fas fa-exclamation-triangle" style={color_priority}></i>
                            </div>
                    </Link>
                    </div>
                </div>
            )
        })
    }
    isNull = (data) =>{
        if(data){
            return (<div className={classes.tasks}>
                <div className={classes.tasks__nameTable}>
                    <p>
                        {data.nameTable} 
                        <span>({this.props.data.task.length})</span>
                    </p>
                </div>
                <div className={classes.tasks__wrapper}>
                    {this.mapTask()}
                </div>
            </div>)
        }
    }
    render(){
        const {data}=this.props;
        const ret = this.isNull(data);
        return (
            <div>
                {ret}
            </div>    
        )
    }
}