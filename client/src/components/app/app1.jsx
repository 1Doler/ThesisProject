import React, { useState,useEffect } from 'react'
import { Route, BrowserRouter as Router, Link } from "react-router-dom"
import {useHttp} from '../hooks/http.hook'


import Projects from '../pages/projects/projects'
import Board from '../pages/board/board'
import Task from '../pages/task/task'
import Main from '../pages/main/main'


//ELLENLINE
import News from '../Ellenline/news/News'
import Footer from '../Ellenline/footer/Footer'
import Spec from '../Ellenline/specOffers/SpecOffers'
///

import classes from './app.module.sass'
const App = () =>{
    const {request} = useHttp();
    const [boardData,setBoardData] = useState(null);
    const [boardId, setBoardId] = useState(null);
    const [table, setTable] = useState(null);
    const [tableId, setTableId] = useState(null);
    const [userId, setUserId] = useState(null)


     
    
    useEffect(async () => {
        async function fetchData(){
            try{
                const localStorageRef = localStorage.getItem('userId')
                const id = JSON.parse(localStorageRef);
                const data = await request('/api/auth/boarddata1', 'POST', {id});
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
                alert('EEE')
            }
        }
        fetchData();
        
    },[])
    
    useEffect(()=>{
        if(userId!=null)
        {
            localStorage.setItem('userId', JSON.stringify(userId));
            window.location.assign("/board");
        }
    },[userId]);
    const logIn = async (email, password) =>{
        try{
            const res = await request('/api/auth/login', 'POST', {email, password})
            console.log(res)
            if(res.message==='Вы удачно вошли в аккаунт')
            {
                setUserId(res.user._id)
            }
            else
                console.log('nooooooo')
        }catch(e){
            console.log('Error app');
        }
    }
    const reg = async (email, password) =>{
        try{
            const res = await request('/api/auth/register', 'POST', {email, password})
            console.log(res)
        }catch(e){
            console.log('Error app');
        }
    }
    const addTaskList = async (board_id, nameTaskList) =>{
        try{
            const resIns = await request('/api/auth/addtasklist', 'POST', {board_id, nameTaskList})
            const data = await request('/api/auth/table', 'GET')
            setTable(data)
            
        }catch(e){
            console.log('Error app')
        }
    }
    const updateTable = async (state) =>{
        
        try{
            const update = await request('/api/auth/updatetask', 'POST', state);
            console.log(update);
            const data1 = await request('/api/auth/table', 'GET');
            setTable(data1)
        }catch(e){
            alert('Error app')
        }
    }
   
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
    
    const deleteTaskList = async (newArr, id) =>{
        try{
            const a = await request('/api/auth/deletetasklist', 'POST', {id})
            setTable(newArr);
        }catch(e){
            console.log('ERROR DelteTaskList');
        }
    }

    const localStorageRef = localStorage.getItem('userId')
    return(
        <Router>
            <div className={classes.app}>
                <Route path='/' exact>
                    <Main 
                        logIn={logIn}
                        reg={reg}
                    />
                </Route>
                <Route path='/elen' exact>
                
                    <Spec />
                    <News />
                    <Footer />
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
                        setBoardId(id);
                        return <Board 
                            data={table} 
                            board_id={id}
                            getTableId={(id)=>setTableId(id)}
                            addTaskList={addTaskList}
                            deleteTaskList={deleteTaskList}
                            userId={JSON.parse(localStorageRef)}
                        />
                    }
                }/>
                <Route path='/task/:id' render={
                    ({match}) => {
                        const {id} = match.params;
                        return <Task 
                            dataBoard={boardData}
                            data={table}
                            tableId={tableId} 
                            taskId={id}
                            boardId={boardId}
                            updateTable={updateTable}
                        />
                    }
                }/>
            </div>
        </Router>
    )
    
}

export default App