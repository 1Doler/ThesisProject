import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classes from './main.module.sass'

export default class Board extends Component{
    constructor(){
        super();
        this.state={}
    }

    render(){
        const inpStyle = {
            padding: '10px',
            border: '0',
            boxShadow: '0 0 15px 4px rgba(0,0,0,0.06)',
            fontSize: '15px'
        }
        return(
            <div className={classes.main}>
               {/*  <div className={classes.main__nav}>
                    MB NAV..
                </div> */}
                <div className={classes.container}>
                    {/* <h1>MAIN PAGE</h1>
                    <Link to='/board'>Board PAGE</Link> */}
                    <div className={classes.main__header}>
                        {/* <img src='https://www.flaticon.com/svg/vstatic/svg/1055/1055648.svg?token=exp=1620936149~hmac=e314a25edf3611f638132ed31992fb7c'/> */}
                        <img src='https://www.flaticon.com/svg/vstatic/svg/1055/1055672.svg?token=exp=1620936192~hmac=643bc9ced436bb19b4aab159da170281'/>
                        <div className={classes.main__header__title}>
                            <i class="fas fa-angle-double-right"></i> Managing projects 
                        </div>
                        <div className={classes.main__header__hr}></div>
                        <div className={classes.main__header__descr}>
                            Эффективная работа над проектами клиентов: планируем работу, учитываем время, контролируем результат
                        </div>
                        <div className={classes.main__auth}>
                            <div className={classes.main__auth__title}>
                                Авторизация
                            </div>
                            <form className={classes.main__auth__inp}>
                                <div className={classes.main__auth__inp__log}>
                                    <input style={inpStyle} placeholder='Login'></input>
                                </div>
                                <div className={classes.main__auth__inp__pas}>
                                    <input style={inpStyle} placeholder='Password'></input>
                                </div>
                                <div className={classes.main__auth__inp__btn}>
                                    <button className={classes.main__auth__inp__btn__log}>Войти</button>
                                    <button className={classes.main__auth__inp__btn__reg}>Регистрация</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={classes.main__pminfo}>
                    <div className={classes.container}>
                    
                        <div className={classes.main__pminfo__title}>
                            Что такое программное обеспечение для управления проектами?
                        </div>
                        <div className={classes.main__pminfo__text}>
                            Это комплексный инструмент планирования, организации и управления работой коллектива. Хорошее программное обеспечение для управления проектами также является удобной средой для совместной работы. В ней можно координировать назначенные сотрудникам задачи, чтобы все знали, кто и что делает. Делитесь мнениями, файлами и обновлениями статуса. Вы также получаете полное представление о ведущейся работе, позволяющее специалистам заниматься нужными задачами в отведённое для них время.
                        </div>
                    </div>
                </div>
                {/* <div className={classes.main__} */}
            </div>
        )
    }
}