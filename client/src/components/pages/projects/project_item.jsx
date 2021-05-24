import React, { Component} from 'react'
import { Link } from 'react-router-dom'

import classes from './board_item.module.sass'

export default class BoardItem extends Component{
    constructor(){
        super();
        this.state={}
    }


    Item = () =>{
        const {onToggleImportant, data} = this.props;
        
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
                            <i className="far fa-edit" style={styleIcon}></i>
                        </td>
                    </tr>
                )
            }) 
        }
    } 
    


    render(){
        const boards = this.Item();
        return(
            <>
                <table className={classes.board_item}>
                    <tbody>
                        <tr key={'head'}>
                            <th><i className="fas fa-star"></i></th>
                            <th>PROJECT NAME</th>
                            <th>OWNER</th>
                            <th>DESCRIPTION</th>
                            <th>Status</th>
                            <th>BTN</th>
                        </tr>
                        {boards}
                    </tbody>
                </table>
                {boards===undefined?<h2 style={{textAlign: 'center'}}>NOT DATA</h2>:null}
            </>
        )
    }
}


