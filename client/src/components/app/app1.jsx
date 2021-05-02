import React, { useState,useEffect } from 'react'
import { Route, BrowserRouter as Router, Link } from "react-router-dom"
import {useHttp} from '../hooks/http.hook'

import Projects from '../pages/projects/projects'
import Board from '../pages/board/board'
import Task from '../pages/task/task'

import classes from './app.module.sass'
const App = () =>{
    const {request} = useHttp();
    const [boardData,setBoardData] = useState(null);
    const [board, setBoard] = useState('');
    const [boardId, setBoardId] = useState(null);
    const [tableId, setTableId] = useState(null);
    const [taskId, setTaskId] = useState(null);
    
    
    

    const Page =  () => {
        useEffect(async () => {
            try{
                /* await request('/api/auth/pb', 'POST'); */
                const data = await request('/api/auth/boarddata1', 'GET');
                setBoardData(data);
            }catch(e){
                alert('Инет пропал')
            }
        }, [boardData]);}
   
    const onToggleImportant = async (_id) =>{
        try{
            const index = boardData.findIndex(elem => elem._id === _id)
            
            const old = boardData[index];
            const newItem = {...old, favorite: !old.favorite};
            const newArr = [...boardData.slice(0,index),newItem,...boardData.slice(index+1)];     
            await request('/api/auth/ontoggleimportant', 'POST', newItem)
            setBoardData(newArr);
        }catch(e){
            console.log('ERROR')
        }
        
    }
    const ss = async () =>{
        try{
           
            const res = await request('/api/auth/updatetask', 'POST')
            console.log(res);
        }catch(e){
            console.log('ERROR')
        }
        
    }
    Page();
    return(
        <Router>
            <button onClick={()=>{ss()}}></button>
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
                        <Projects 
                            board_data={boardData?boardData:[]}
                            onToggleImportant = {onToggleImportant}    
                        />
                    </>
                    
                </Route>
                <Route path='/board/:id' render={
                    ({match}) => {
                        const {id} = match.params;
                        const data = boardData[boardData.findIndex(elem => elem._id === id)];
                        setBoardId(id);
                        setBoard(data);
                        return <Board 
                            data={data} 
                            board_id={id}
                            getIdTable ={(id)=>setTableId(id)}
                        />
                    }
                }/>
                <Route path='/task/:id' render={
                    ({match}) => {
                        
                        const {id} = match.params;
                        const bt = board.table;
                        const data_tableId = bt.findIndex(elem=> elem._id === tableId)     
                        const dataId = bt[data_tableId].task.findIndex(elem=>elem._id===id);
                        setTaskId(id);
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

export default App