import React, { useState,Component } from 'react'
import { Route, BrowserRouter as Router, Link } from "react-router-dom"

import Projects from '../pages/projects/projects'
import Board from '../pages/board/board'
import Task from '../pages/task/task'

import classes from './app.module.sass'
export default class App extends Component{
  constructor(){
      super();
      this.state = {
        boardData:[],
        board: null,
        tableId:''
      }
  }
    
    async componentWillMount() {
      try{
          const response =  await fetch('/api/auth/boarddata1');
          const data = await response.json();
          this.setState({boardData: data});
          console.log(this.state.boardData)
      }catch(e){
          alert('ERROR')
      }
    }
    onToggleImportant = async (_id) =>{
        try{
            const {boardData}= this.state;
            const index = boardData.findIndex(elem => elem._id === _id)
            
            const old = boardData[index];
            const newItem = {...old, favorite: !old.favorite};
            const newArr = [...boardData.slice(0,index),newItem,...boardData.slice(index+1)];     
            this.setState({boardDate: newArr});
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newItem)
            };
            await fetch('/api/auth/ontoggleimportant', requestOptions)
                .then(response => response.json());
            
        }catch(e){
            console.log('ERROR')
        }
        
    }
    tt = (data) =>{
      this.setState({board: data});
    }
    render(){
      const {boardData,board,tableId}=this.state;
      return(
        <Router>
            <div className={classes.app}>
                <Route path='/' exact>
                    <ul>
                        <li><h1>MAIN PAGE</h1></li>
                        <li>
                            <Link to='/board'>Board PAGE</Link>
                        </li>
                    </ul>
                </Route>
                <Route path='/board/' exact>
                    <>
                        <button onClick={()=>this.AllDateBoard()}>BoardData</button>
                        <Projects 
                            board_data={boardData}
                            onToggleImportant = {this.onToggleImportant}    
                        />
                    </>
                    
                </Route>
                <Route path='/board/:id' render={
                    ({match}) => {
                        const {id} = match.params;
                        const data = boardData[boardData.findIndex(elem => elem._id === id)];
                        
                        return <Board 
                            data={data} 
                            board_id={id}
                            getIdTable ={(id)=>this.setState({tableId:id})}
                        />
                    }
                }/>
                <Route path='/task/:id' render={
                    ({match}) => {
                        const {id} = match.params;
                        const bt = board.table;
                        const data_tableId = bt.findIndex(elem=> elem._id === tableId)     
                        const dataId = bt[data_tableId].task.findIndex(elem=>elem._id===id);
                        const data = bt[data_tableId].task[dataId];
                        return <Task 
                            data={data}
                            data_id={id}
                        />
                    }
                }/>
            </div>
        </Router>
      )
    }
}