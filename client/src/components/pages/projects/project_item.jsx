import React, { Component} from 'react'
import { Link } from 'react-router-dom'

import Modal from './modal'

import classes from './board_item.module.sass'

export default class BoardItem extends Component{
    constructor(){
        super();
        this.state={
            active: false,
            nameBoard:'', 
            description:'', 
            status:'',
            _id:''
        }
    }

    role = (id) =>{
        const {data} = this.props;
        const userId = JSON.parse(localStorage.getItem('userId'));
        data.map(item=>{
            if(item._id===id)
            {
                item.executor.map(elem=>{
                    if(elem.userId === userId) 
                        localStorage.setItem('role', elem.role)
                })
            }
        })
    }
    onEdite = (nameBoard,description,status,_id) =>{
        this.setState({active: true,nameBoard,description,status,_id});
    }
    onSetValue = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    uBoard = (nameBoard,description,status,_id,userId) =>{
        const u = JSON.parse(localStorage.getItem('userId'));
        if(userId===u)
        {
            this.onEdite(nameBoard,description,status,_id) 
        }
        else 
            alert('У вас недостатоно прав!')
    }
    dBoard = (_id,userId) =>{
        const {deleteBoard} = this.props;
        const u = JSON.parse(localStorage.getItem('userId'));
        console.log(u + '===' + userId)
        if(userId===u)
        {
            if(window.confirm('Вы действительно хотите удалить этот проект?'))
                deleteBoard(_id)
        }
        else 
            alert('У вас недостатоно прав!')
    }
    Item = () =>{
        const {onToggleImportant, data, deleteBoard} = this.props;
        
        const styleIcon = {color: '#99cc60', cursor: 'pointer'};
        const styleLink = {textDecoration: 'none',color: 'black'};
        {/* <option value="Acive">Активно</option>,
        <option value="Open">Открыто</option>,
        <option value="Plannig">Планируется</option>,
        <option value="In Progress">В ходе выполнения</option>,
        <option value="In Tested">В тестировании</option>,
        <option value="Delayed">Задержано</option>,
        <option value="Cancalled">Отменено</option>,
        <option value="Ready">Готово</option> */}
        let status1='';
        if(data.length){
            return data.map(item=>{
                switch(item.status){
                    case ('Acive'):
                        status1='Активно';
                        break;
                    case ('Plannig'):
                        status1='Планируется';
                        break;
                    case ('In Progress'):
                        status1='В ходе выполнения';
                        break;
                    case ('In Tested'):
                        status1='В тестировании';
                        break;
                    case ('Delayed'):
                        status1='Задержано';
                        break;
                    case ('Ready'):
                        status1='Выполнено';
                        break;
                    case ('Open'):
                        status1='Открыто';
                        break;
                    default:
                        status1='';
                        break;
                }
                const {nameBoard, description, fullName, status, favorite,_id,userId} = item;
                const link_board = '/board/'+ 'tasklist';
                const isFavorite = !favorite ? 
                    <i className="far fa-star" style={styleIcon} onClick={()=>{onToggleImportant(_id)}}></i> : 
                    <i className="fas fa-star" style={styleIcon} onClick={()=>{onToggleImportant(_id)}}></i> ;
                return (
                    <tr  key={_id} className={classes.board_item__wrapper}>
                        <td>
                            {isFavorite}    
                        </td>
                        <td className={classes.board_item__wrapper__text}>
                            <Link to={link_board} onClick={()=>{localStorage.setItem('boardId', _id); this.role(_id)}} style={styleLink}>{nameBoard}</Link>
                        </td>
                        <td className={classes.board_item__wrapper__author}>
                            {fullName}
                        </td>
                        <td className={classes.board_item__wrapper__descr}>
                            {description}
                        </td>
                        <td className={classes.board_item__wrapper__descr}>
                            {status1}
                        </td>
                        <td className={classes.board_item__wrapper__btn}>
                            <div className={classes.board_item__wrapper__btn__btnEdite} onClick={()=>this.uBoard(nameBoard,description,status,_id,userId)}>
                                <i className="far fa-edit"></i>
                            </div>
                            <div className={classes.board_item__wrapper__btn__btnDelete} onClick={()=>this.dBoard(_id,userId)}>
                                <i className="far fa-window-close"></i>
                            </div>
                        </td>
                    </tr>
                )
            }) 
        }
    } 
    close = () =>{
        this.setState({active: false})
    }


    render(){
        const {active,nameBoard, description, status,_id} = this.state;
        const {updateBoard} = this.props;
        const boards = this.Item();
        return(
            <>
                <Modal 
                    active={active}
                    nameBoard={nameBoard} 
                    description={description}
                    status={status}
                    close={this.close}    
                    _id={_id}
                    onSetValue={this.onSetValue}
                    updateBoard={updateBoard}
                />
                <table className={classes.board_item}>
                    <tbody>
                        <tr key={'head'}>
                            <th><i className="fas fa-star"></i></th>
                            <th>Название проекта</th>
                            <th>Владелец</th>
                            <th>Описание</th>
                            <th>Статус</th>
                            <th></th>
                        </tr>
                        {boards}
                    </tbody>
                </table>
                {boards===undefined?<h2 style={{textAlign: 'center'}}>Отсуствуют проекты</h2>:null}
            </>
        )
    }
}


