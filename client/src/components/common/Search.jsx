import React, { useState } from 'react'

import classes from './search.module.sass'

const Search = ({Submit}) =>{
    const [value, setValue] = useState('');
    const [isSearch,setIsSearch] = useState(true);

    const onSubmit = () =>{
        setIsSearch(!isSearch);
        if(isSearch===false){
            setValue('');
            Submit('',isSearch);
        }
        else{
            Submit(value,isSearch);
        }     
    }
    const icon = isSearch ? "fas fa-search" : "fas fa-times";
    return(
        <div className={classes.search}>
            <input type='text' value={value} onChange={(e)=>{setValue(e.target.value)}}></input>
            <i className={icon} onClick={()=>{onSubmit()}}></i>
        </div>
            
        
    )
}

export default Search