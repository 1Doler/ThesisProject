import { Route, BrowserRouter as Router } from "react-router-dom"
import React, { useState,useEffect } from 'react'
import {useHttp} from '../hooks/http.hook'


import InfoBoard from '../pages/info_board/info_board'
import Projects from '../pages/projects/projects'
import Board from '../pages/board/board'
import Users from '../pages/users/users'
import Main from '../pages/main/main'
import Task from '../pages/task/task'

import classes from './app.module.sass'

const App = () =>{
    const {request} = useHttp();
    const [boardData,setBoardData] = useState(null);
    const [boardId, setBoardId] = useState(null);
    const [tableId, setTableId] = useState(null);
    const [userId, setUserId] = useState(null)
    const [executor, setExecutor] = useState(null)

    ////getBoardDate
    const fetchData1 = async () =>{
        try{
            const localStorageRef = localStorage.getItem('userId')
            const id = JSON.parse(localStorageRef);
            const data = await request('/api/auth/boarddata1', 'POST', {id});
            const executorId = [];
            data.map(item=>{
                executorId.push(item.userId)
            })
            const res = await request('/api/auth/getexecutor', 'POST', {executorId});
            const nd = data.map(i=>{
                const ind = res.findIndex(elem => elem._id === i.userId);
                i.fullName = res[ind].lastName+' '+res[ind].firstName
                return i
            })
            setBoardData(nd);
        }catch(e){
            alert('Инет пропал')
        }
    }
    useEffect(async () => {
        fetchData1();
    }, []);


    useEffect(async () =>{
        try{
            const data = await request('/api/auth/table', 'GET');
            localStorage.setItem('table', JSON.stringify(data));
        }
        catch(e){
            alert('ERROR IN API TASK')
        }
        
    },[])

    useEffect(()=>{
        getExecutor();
    },[boardId])
    const getExecutor = async () =>{
        if(boardData){
            const executorId = [];
            const b = [];
            boardData.map(elem => {
                if (elem._id === boardId)
                {
                    b.push(elem)
                    elem.executor.map(item=>{
                        executorId.push(item.userId);
                    })
                    
                }
            })
            const res = await request('/api/auth/getexecutor', 'POST', {executorId});
            res.map(item=>{
                b[0].executor.map(elem=>{
                    if(elem.userId === item._id){
                        item.role = elem.role;
                    }
                })
            })
            localStorage.setItem('executor', JSON.stringify(res));
            setExecutor(res);
        }
    };

    useEffect(()=>{
        if(userId!=null)
        {
            localStorage.setItem('userId', JSON.stringify(userId));
            window.location.assign("/board");
        }
    },[userId]);

    ///auth requiset
    const logIn = async (email, password) =>{
        try{
            const res = await request('/api/auth/login', 'POST', {email, password})
            if(res.message==='Вы удачно вошли в аккаунт')
            {
                setUserId(res.user._id)
            }
            else
                alert('Некорректно ввели пароль/логин')
        }catch(e){
            console.log('Error app');
        }
    }
    const reg = async (email, password) =>{
        try{
            const res = await request('/api/auth/register', 'POST', {email, password})
            alert('Вы удачно зарегистрировались')
        }catch(e){
            alert(e)
        }
    }

    
    const addBoard = async (nameBoard, descr, status) =>{
        try{
            const lsUserId = JSON.parse(localStorage.getItem('userId'))
            const a = await request('/api/auth/addboard', 'POST', {lsUserId, nameBoard, descr, status})
            window.location.reload();
        }catch(e){
            console.log("eerrror")
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


    const addTaskList = async (board_id, nameTaskList) =>{
        try{
            await request('/api/auth/addtasklist', 'POST', {board_id, nameTaskList});
            const data1 = await request('/api/auth/table', 'GET');
            
            localStorage.setItem('table', JSON.stringify(data1));
            window.location.reload();
            
        }catch(e){
            console.log('Error app')
        }
    }
    const deleteTaskList = async (id) =>{
        try{
            await request('/api/auth/deletetasklist', 'POST', {id})
            
            const data1 = await request('/api/auth/table', 'GET');
            
            localStorage.setItem('table', JSON.stringify(data1));
            window.location.reload();
        }catch(e){
            console.log('ERROR DelteTaskList');
        }
    }
    const updateTable = async (state) =>{
        try{
            const {completionPercentage, status} = state;
            const st = completionPercentage != 100 ? status : 'Closed'
            const res = await request('/api/auth/updatetask', 'POST', {...state, status: st});
            const data1 = await request('/api/auth/table', 'GET');
            window.location.reload();
            localStorage.setItem('table', JSON.stringify(data1));
        }catch(e){
            alert('Error app')
        }
    }

    const addTask = async (info) =>{
        const res = await request('/api/auth/addtask', 'POST', info);
        const data1 = await request('/api/auth/table', 'GET');
        
        localStorage.setItem('table', JSON.stringify(data1));
        window.location.reload();
        
    }
    const deleteTask = async (tableId, taskId) =>{
        await request('/api/auth/deletetask', 'POST', {tableId,taskId});
        const data1 = await request('/api/auth/table', 'GET');
        localStorage.setItem('table', JSON.stringify(data1));
        window.location.reload();
    }
    


    const addExecutor = async (executors) =>{
        try{
            const res = await request('/api/auth/addexecutor', 'POST', executors);
            if(res!=0)
            {
                const index = boardData.findIndex(elem=>elem._id===boardId)
                const old = boardData[index];
                const newItem = {userId: res.userId, role: executors.role};
                old.executor.push(newItem);
                const newArr = [...boardData.slice(0,index),old,...boardData.slice(index+1)]
                setBoardData(newArr);
                if(boardData){
                    const executorId = [];
                    const b = [];
                    boardData.map(elem => {
                        if (elem._id === boardId)
                        {
                            b.push(elem)
                            elem.executor.map(item=>{
                                executorId.push(item.userId);
                            })
                            
                        }
                    })
                    
                    const res1 = await request('/api/auth/getexecutor', 'POST', {executorId});
                    res1.map(item=>{
                        b[0].executor.map(elem=>{
                            if(elem.userId === item._id){
                                item.role = elem.role;
                            }
                        })
                    })
                    localStorage.setItem('executor', JSON.stringify(res1));
                    setExecutor(res1);
                }
                window.location.reload();
            }
            else
                alert('Такой пользователь уже добавлен')
        }catch(e){
            alert('Не удалось добавить исполнителя')
        }
    }
    const deleteExecutor = async (userId) =>{
        const res = await request('/api/auth/deleteexecutor', 'POST', {boardId, userId});
        const localStorageExec = JSON.parse(localStorage.getItem('executor'));
        const ind = localStorageExec.findIndex(elem=>elem._id===userId);
        const newArr=[...localStorageExec.slice(0,ind),...localStorageExec.slice(ind+1)]
        localStorage.setItem('executor', JSON.stringify(newArr));
        window.location.reload();
    } 

    

    const localStorageId = localStorage.getItem('userId')
    const localStorageTable = JSON.parse(localStorage.getItem('table'))
    const localStorageBoardId = localStorage.getItem('boardId')
    return(
        <Router>
            <div className={classes.app}>
                <Route path='/' exact>
                    <Main 
                        logIn={logIn}
                        reg={reg}
                    />
                </Route>
                <Route path='/board/' exact>
                    <>
                        <Projects 
                            board_data = { boardData ? boardData: [] }
                            onToggleImportant = { onToggleImportant }    
                            addBoard= { addBoard }
                        />
                    </>
                    
                </Route>
                <Route path='/info' exact>
                    <InfoBoard 
                        table={localStorageTable}
                        boardId={localStorageBoardId}
                    />                    
                </Route>
                <Route path='/board/:id' render={
                    ({match}) => {
                        setBoardId(localStorage.getItem('boardId'))
                        return <Board 
                            board_id={localStorage.getItem('boardId')}
                            executor={executor}
                            getTableId={(id)=>{setTableId(id);localStorage.setItem('tableId', id)}}
                            addTaskList={addTaskList}
                            deleteTaskList={deleteTaskList}
                            deleteTask={deleteTask}
                            userId={JSON.parse(localStorageId)}
                            addTask={addTask}
                        />
                    }
                }/>
                <Route path='/users' exact>
                    <Users 
                        boardData={boardData}
                        boardId={localStorage.getItem('boardId')}
                        addExecutor={addExecutor}
                        getExecutor={getExecutor}
                        executor={executor}
                        deleteExecutor={deleteExecutor}
                        />
                </Route>
                <Route path='/task/:id' render={
                    ({match}) => {
                        const {id} = match.params;
                        localStorage.setItem('taskId', id)
                        const tskId = localStorage.getItem('taskId')
                        const brdId = localStorage.getItem('boardId')
                        return <Task 
                            executor={executor}
                            dataBoard={boardData}
                            data={localStorageTable}
                            tableId={tableId} 
                            taskId={tskId}
                            boardId={brdId}
                            updateTable={updateTable}
                        />
                    }
                }/>
            </div>
        </Router>
    )
    
}

export default App