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
    const [table, setTable] = useState(null);
    const [tableId, setTableId] = useState(null);
    
    
    useEffect(async () => {
        async function fetchData(){
            try{
                const data = await request('/api/auth/boarddata1', 'GET');
                setBoardData(data);
            }catch(e){
                alert('Инет пропал')
            }
        }
        fetchData();
    }, []);

    useEffect(async () =>{
        async function fetchData(){
            try{
                try{
                    const data = await request('/api/auth/table', 'GET');
                    setTable(data)
                }catch(e){
                    alert('ERROR IN API TASK')
                }
            }catch(e){
                alert('Инет пропал')
            }
        }
        fetchData();
        
    },[boardData])
    

    
   
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
                        <Projects 
                            board_data={boardData?boardData:[]}
                            onToggleImportant = {onToggleImportant}    
                        />
                    </>
                    
                </Route>
                <Route path='/board/:id' render={
                    ({match}) => {
                        const {id} = match.params;
                        return <Board 
                            data={table} 
                            board_id={id}
                            getTableId={(id)=>setTableId(id)}
                        />
                    }
                }/>
                <Route path='/task/:id' render={
                    ({match}) => {
                        const {id} = match.params;
                        return <Task 
                            data={table}
                            tableId={tableId} 
                            taskId={id}
                        />
                    }
                }/>
            </div>
        </Router>
    )
    
}

export default App