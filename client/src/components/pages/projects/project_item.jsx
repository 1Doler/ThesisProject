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
            status:''
        }
    }

    onEdite = (nameBoard,description,status) =>{
        this.setState({active: true,nameBoard,description,status});
    }
    onSetValue = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    Item = () =>{
        const {onToggleImportant, data, deleteBoard} = this.props;
        
        const styleIcon = {color: '#99cc60', cursor: 'pointer'};
        const styleLink = {textDecoration: 'none',color: 'black'};
        if(data.length){
            return data.map(item=>{
                const {nameBoard, description, fullName, status, favorite,_id} = item;
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
                            <Link to={link_board} onClick={()=>localStorage.setItem('boardId', _id)} style={styleLink}>{nameBoard}</Link>
                        </td>
                        <td className={classes.board_item__wrapper__author}>
                            {fullName}
                        </td>
                        <td className={classes.board_item__wrapper__descr}>
                            {description}
                        </td>
                        <td className={classes.board_item__wrapper__descr}>
                            {status}
                        </td>
                        <td className={classes.board_item__wrapper__btn}>
                            <div className={classes.board_item__wrapper__btn__btnEdite} onClick={()=>this.onEdite(nameBoard,description,status)}>
                                <i className="far fa-edit"></i>
                            </div>
                            <div className={classes.board_item__wrapper__btn__btnDelete} onClick={()=>{if(window.confirm('Вы действительно хотите удалить этот проект?')){deleteBoard(_id)}}}>
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
        const {active,nameBoard, description, status} = this.state;
        const boards = this.Item();
        return(
            <>
                <Modal 
                    active={active}
                    nameBoard={nameBoard} 
                    description={description}
                    status={status}
                    close={this.close}    
                    onSetValue={this.onSetValue}
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


