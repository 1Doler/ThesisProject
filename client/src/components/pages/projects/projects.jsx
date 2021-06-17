import React, { Component} from 'react'

import Snackbar  from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import classes from './board.module.sass'

import ProjectItem from './project_item'
import Nav  from '../../common/nav/Nav'
import Search from '../../common/Search.jsx'

export default class Projects extends Component{
    constructor(props){
        super(props);
        this.state={
            search_data: [],
            open: false,
            active_modal: false,
            nameBoard: '',
            descr: '',
            status: 'Active'
        }
    }

   onChange = (e) =>{
       const name = e.target.name;
       this.setState({[name]: e.target.value})
   }
   onClickBtn = (nameBoard, descr, status) =>{
        if(nameBoard.trim()){
            this.props.addBoard(nameBoard, descr, status);
            this.setState({active_modal: false})
        }
        else
            alert('Заполните поле Name board')
   }
    modal = () =>{
        const optionStatus = [
            <option value="Acive">Acive</option>,
            <option value="Open">Open</option>,
            <option value="Plannig">Plannig</option>,
            <option value="In Progress">In Progress</option>,
            <option value="On Track">On Track</option>,
            <option value="In Tested">In Tested</option>,
            <option value="On Hold">On Hold</option>,
            <option value="Delayed">Delayed</option>,
            <option value="Cancalled">Cancalled</option>,
            <option value="Ready">Ready</option>
        ];
        const { nameBoard, descr, status } = this.state;
        return(
            <div className={classes.modal}>
                <div className={classes.addTask__content}>
                        <h3>Создать проект</h3>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Название проекта:
                            </div>
                            <input 
                                className={classes.inp} 
                                type='text'
                                name='nameBoard' 
                                value={nameBoard}
                                onChange={(e)=>this.onChange(e)}
                            />
                        </div>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Описание: 
                            </div>
                            <input 
                                className={classes.inp} 
                                type='text'
                                name='descr' 
                                value={descr}
                                onChange={(e)=>this.onChange(e)}
                            />
                        </div>
                        <div className={classes.addTask__content__item}>
                            <div className={classes.addTask__content__item__text}>
                                Статус: 
                            </div>
                            <select 
                                className={classes.inp}
                                name='status' 
                                value={status}
                                onChange={(e)=>this.onChange(e)}
                            >
                                {[...optionStatus]}
                            </select>
                        </div>
                        <div 
                            className={classes.addTask__content__buttonAdd}
                            onClick={()=>this.onClickBtn(nameBoard, descr, status)}
                        >
                            Добавить
                        </div>
                        <div 
                            className={classes.addTask__content__buttonCancel}
                            onClick={()=>this.setState({active_modal: false})}
                        >
                            Отменить
                        </div>
                    </div>
            </div>
        )
    }
    render(){
        const {board_data, onToggleImportant, deleteBoard} = this.props;
        const {search_data} = this.state;
        
        const onSearch = (value,isSearch) =>{
            const search = board_data.filter((item)=>{
                return item.nameBoard.indexOf(value)>-1
            });
            if(search.length){
                this.setState({search_data: search})
            }
            else{
                if(isSearch)
                    this.setState({open: true})
            }
        }    
        const handleClose = () => {
            this.setState({open: false });
        };
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }
       
        const vs = !search_data.length?board_data: search_data;
        return(
            <div className={classes.sectionProjects}>
                <Nav />
                <div className={classes.container}>
                    {this.state.active_modal ? this.modal() : null}
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={this.state.open}
                        onClose={handleClose}
                        >
                        <Alert onClose={handleClose} severity="warning">
                            Проект с таким название не существует!
                        </Alert>
                    </Snackbar>
                    <div className={classes.board}>
                        <h2>Проекты</h2>
                        <Search Submit={onSearch}/>
                        <button onClick={()=>this.setState({active_modal: true})} className={classes.board__btn}>
                            Добавить проект
                        </button>
                        <ProjectItem data={vs} onToggleImportant={onToggleImportant} deleteBoard={deleteBoard}/>
                    </div>
                </div>
            </div>
            
        )
    }
}
