import React, { Component } from 'react'
import { Link } from "react-router-dom"

import Tasks from './tasks'

import * as moment from 'moment'

import classes from './task.module.sass'

import Button from '@material-ui/core/Button';



export default class Task extends Component{
    constructor(props){
        
        super(props);
        this.state = {
            filt: null,
            text: null,
            _id: null,
            description: null,
            author: null,
            status: null,
            dueDate: null,
            startDate: null,
            createDate: null,
            prioritynull: null,
            duration: null,
            completionPercentage: null,
            performer: null,
            isShow: true
        }
    }
    
    componentDidMount () {
        this.getData();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.taskId !== nextProps.taskId) 
            this.getData(nextProps.taskId);
      }
    getData = (taskId = this.props.taskId) =>{
        const {data, tableId,dataBoard,boardId} = this.props;
        const tblId = localStorage.getItem('tableId')
       /*  const brdId = localStorage.getItem('boardId')

        const b = dataBoard.filter(elem=> elem._id === brdId); */
        const filter1 = data.filter((elem)=>{
            return elem._id === tblId
        })
        const filter2 = filter1[0].task.filter((elem)=>{
            return elem._id === taskId
        })
        const task_data = filter2[0];
        if(task_data)
        {

            const {textTask,_id, description, author,status, dueDate, startDate, createDate, priority,completionPercentage, performer} = task_data;
            ;
            const dif = dueDate && startDate ? moment(dueDate).diff(moment(startDate),'days') : '';
            const exec = JSON.parse(localStorage.getItem('executor'))
            const ind = exec.findIndex(elem => elem._id === author);
            this.setState({
                filt: filter1[0],
                text: textTask,
                _id,
                description,
                author: exec[ind] ? exec[ind].lastName+' '+exec[ind].firstName: '',
                status,
                dueDate: dueDate?moment(dueDate).format('YYYY-MM-DD'):null,
                startDate: startDate?moment(startDate).format('YYYY-MM-DD'):null,
                createDate: moment(createDate).format('YYYY-MM-DD'),
                priority,
                duration: dif,
                performer,
                completionPercentage
            })
        }
    }
    onChangeInput = async (e) =>{
        const name = e.target.name;
        
        await this.setState({[name]: e.target.value})
        
        const {startDate, dueDate} = this.state

        if(dueDate && startDate)
            this.setState({duration:moment(dueDate).diff(moment(startDate),'days')})
    }
    changeTextarea = (e) => {
        this.setState({description: e.target.value})
    }
    
    isShow = () =>{
        this.setState({isShow: !this.state.isShow})
        if(this.state.isShow)
        {
            this.multilineTextarea.style.height = 'auto';
            this.multilineTextarea.style.height = this.multilineTextarea.scrollHeight + 'px';
        }
        else
        {
            this.multilineTextarea.style.height = '39px';
        }
    }
    uTask = (_id, tblId, description, text,status,performer,dueDate,startDate,priority, duration,completionPercentage) =>{
        const role = localStorage.getItem('role');
        const userId = JSON.parse(localStorage.getItem('userId'));
        if((role === 'Admin' || role === 'Manager') || (role==='Performer' && userId==performer))
        {
            this.props.updateTable({_id, tblId, description, text,status,performer,dueDate,startDate,priority, duration,completionPercentage}) 
        }
        else 
            alert('У вас недостатоно прав!')
    }
    render(){
        const {filt, text, description, author,status,performer,dueDate,startDate,priority, duration,completionPercentage,_id} = this.state;
        
        const optionStatus = [
            <option value=""></option>,
            <option value="Open">Открыто</option>,
            <option value="In Progress">В ходе выполнения</option>,
            <option value="In Review">В обзоре</option>,
            <option value="To Be Tested">В тестировании</option>,
            <option value="On Hold">Задержано</option>,
            <option value="Cancalled">Отменено</option>,
            <option value="Closed" disabled>Выполнено</option>
        ];
        const optionPriority = [
            <option value="None">None</option>,
            <option value="Hight">Высокий</option>,
            <option value="Low">Низкий</option>,
            <option value="Medium">Средний</option>,
        ];
        let optionExec = [];
        
        const localStorageExec = localStorage.getItem('executor');
        if(JSON.parse(localStorageExec))
        {
            JSON.parse(localStorageExec).map(item=>optionExec.push(<option value={item._id}>{item.firstName} {item.lastName}</option>))
        }
        
     
       
        const optionCP = [];
        for(let i=0; i<=100; i+=10){
            optionCP.push(<option value={i}>{i}</option>)
        }
        const tblId = localStorage.getItem('tableId')
      
        return(
            
            <div key={tblId} className={classes.taskPage}>
                
                <Tasks data={filt} id={_id}/>
                
                <div className={classes.task}>
                    <div className={classes.task__mark}>
                        <i class="fas fa-bookmark"> </i>
                        <span>BE2-I1</span>
                    </div>
                    
                    <div >
                        <Link to={'/board/'+'tasklist'}><i className="fas fa-window-close" style={{fontSize: '30px',marginTop: '5px'}}></i></Link>
                        <div className={classes.task__text}>
                            <input value={text} type='text' name='text' onChange={(e)=>{this.onChangeInput(e)}}/>
                        </div>
                    </div>
                    <div className={classes.task__info}>
                        <div className={classes.task__info__author}>
                            Задачу создал: {author}
                        </div>
                        <span>|</span>
                        <div className={classes.task__info__nameTable}>
                            <i className="fas fa-briefcase"></i>
                            {/* {nameBoard} */}
                        </div>
                    </div>
                    <div className={classes.task__status}>
                        <select name="pets" id="pet-select" value={status} onChange={(e)=>{this.setState({status: e.target.value})}}>
                            {[...optionStatus]}
                        </select>
                        <br/>
                        <span>Изменить статус</span> 
                    </div>
                    <div className={classes.task__description}>
                        
                        <h2>Описание <i class="fas fa-expand-alt" onClick={()=>this.isShow()}></i></h2>
                        <div className={classes.task__description__text}>
                            
                            <textarea 
                                onChange={(e)=>this.changeTextarea(e)}
                                ref={ref => this.multilineTextarea = ref} 
                                value={description} name='description' 
                            />
                        </div>
                    </div>
                    <div className={classes.task__information}>
                        <h2 className={classes.task__information__title}>
                            Информация о задаче
                        </h2>
                        <div className={classes.box}>
                            <div className={classes.task__information__wrapper}>
                                <div className={classes.left}>
                                    <div className={classes.task__information__wrapper__owner}>
                                        <p>Исполнитель</p> 
                                        <select value={performer} onChange={(e)=>{this.setState({performer: e.target.value})}}>
                                            <option value=' '>None</option>
                                            {[...optionExec]}
                                        </select>
                                    </div>
                                    <div className={classes.task__information__wrapper__startDate}>
                                        <p className={classes.text}>
                                            Дата начала 
                                        </p> 
                                        <input type='date' name='startDate' value={startDate} max={dueDate} onChange={(e)=>{this.onChangeInput(e)}}/>
                                    </div>
                                    <div className={classes.task__information__wrapper__duration}>
                                        <p className={classes.text}>
                                            Длительность  
                                        </p>
                                        <input type='text' name='duration' readOnly value={duration + ' d'}/>
                                    </div>
                                </div>
                                <div className={classes.right}>
                                    <div className={classes.task__information__wrapper__priority}>
                                        <p className={classes.text}>
                                            Приоритет 
                                        </p>
                                        <select value={priority} onChange={(e)=>{this.setState({priority: e.target.value})}}>
                                            {[...optionPriority]}
                                        </select>
                                    </div>
                                    <div className={classes.task__information__wrapper__dueDate}>
                                        <p className={classes.text}>
                                            Дата окончания
                                        </p>
                                        <input type='date' name='dueDate' min={startDate} value={dueDate} onChange={(e)=>{this.onChangeInput(e)}}/>
                                    </div>
                                    <div className={classes.task__information__wrapper__completionPercentage}>
                                        <p className={classes.text}>
                                            Процент выполнения   
                                        </p>
                                        <select value={completionPercentage} onChange={(e)=>{this.setState({completionPercentage: e.target.value})}}>
                                            {[...optionCP]}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={()=>this.uTask(_id, tblId, description, text,status,performer,dueDate,startDate,priority, duration,completionPercentage)}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        )
    }
}