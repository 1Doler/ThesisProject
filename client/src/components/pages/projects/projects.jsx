import React, { Component} from 'react'
import Snackbar  from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import classes from './board.module.sass'

import ProjectItem from './project_item'
import Search from '../../common/Search.jsx'
export default class Projects extends Component{
    constructor(props){
        super(props);
        this.state={
            search_data: [],
            open: false
        }
    }

   

    render(){
        const {board_data, onToggleImportant} = this.props;
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
            <div className={classes.container}>{/* 
                <button onClick={()=>{this.setState({open: !this.state.open})}}>fasd</button> */}
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.open}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="warning">
                        This is a success message!
                    </Alert>
                </Snackbar>
                <div className={classes.board}>
                    <h2>Page Board</h2>
                    <Search Submit={onSearch}/>
                    <ProjectItem data={vs} onToggleImportant={onToggleImportant}/>
                </div>
            </div>
            
        )
    }
}
