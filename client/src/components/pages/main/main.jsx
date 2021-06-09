import React, { Component } from 'react'

import logo from '../../../assets/img/log.svg'
import imgSec from './data-storage.svg'

import classes from './main.module.sass'
import './main.media.sass'

export default class Board extends Component{
    constructor(){
        super();
        this.state={
            activeModal: false,
            email: 'Doler@gmail.com',
            password: 'password1',
            auth: true,
            lastName: '',
            firstName: ''
        }
    }
    setValue = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        const { activeModal, email, password,lastName,firstName } = this.state;
        const { logIn, reg} = this.props;
        const inpStyle = {
            padding: '10px',
            border: '0',
            boxShadow: '0 0 15px 4px rgba(0,0,0,0.06)',
            fontSize: '15px'
        }
        const isVis = activeModal ? { transform: 'scale(1)' } : { transform: 'scale(0)' }
        const r = (
            <>
                <div className={classes.main__auth__inp__log}>
                    <input style={inpStyle} value={lastName} name='lastName' placeholder='Имя' onChange={(e)=>this.setValue(e)}></input>
                </div>
                <div className={classes.main__auth__inp__pas}>
                    <input style={inpStyle} value={firstName} name='firstName' placeholder='Фамилия' onChange={(e)=>this.setValue(e)}></input>
                </div>
            </>)
        return(
            <div className={classes.main}>
                <div className={classes.main__modal}  style={isVis}>
                    <div className={classes.main__auth}>
                        <div className={classes.main__auth__title}>
                            Авторизация
                            <i className="fas fa-times" onClick={()=>this.setState({activeModal: false})}></i>
                        </div>
                        <div className={classes.lr}>
                            <button style={{marginRight: '5px'}} onClick={()=>this.setState({auth: true})}>
                                Войти
                            </button>
                            <button onClick={()=>this.setState({auth: false})}>
                                Регистрироваться 
                            </button>
                        </div>
                        <div className={classes.main__auth__inp}>
                            
                            <div className={classes.main__auth__inp__log}>
                                <input style={inpStyle} value={email} name='email' placeholder='Email' onChange={(e)=>this.setValue(e)}></input>
                            </div>
                            <div className={classes.main__auth__inp__pas}>
                                <input style={inpStyle} value={password} name='password' placeholder='Password' onChange={(e)=>this.setValue(e)}></input>
                            </div>
                            {!this.state.auth ? r : null}
                            <div className={classes.main__auth__inp__btn}>
                                {this.state.auth?<button className={classes.main__auth__inp__btn__log} onClick={()=>logIn(email, password)}>Войти</button>:<button className={classes.main__auth__inp__btn__reg}  onClick={()=>{reg(email, password)}}>Регистрация</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.container}>
                    <div className={classes.main__header}>
                        <img src={logo} alt='img'/>
                        <div className={classes.main__header__title}>
                            <i className="fas fa-angle-double-right"></i> Managing projects 
                        </div>
                        <div className={classes.main__header__hr}></div>
                        <div className={classes.main__header__descr}>
                            Эффективная работа над проектами клиентов: планируем работу, учитываем время, контролируем результат
                        </div>
                        <button className={classes.main__header__btn} onClick={()=>this.setState({activeModal: true})}>Войти</button>
                    </div>
                </div>
                <div className={classes.main__pminfo}>
                    <div className={classes.container} style={{display: 'flex'}}>
                        <div>
                            <div className={classes.main__pminfo__title}>
                                Что такое программное обеспечение для управления проектами?
                            </div>
                            <div className={classes.main__pminfo__text}>
                                Это комплексный инструмент планирования, организации и управления работой коллектива. Хорошее программное обеспечение для управления проектами также является удобной средой для совместной работы. В ней можно координировать назначенные сотрудникам задачи, чтобы все знали, кто и что делает. Делитесь мнениями, файлами и обновлениями статуса. Вы также получаете полное представление о ведущейся работе, позволяющее специалистам заниматься нужными задачами в отведённое для них время.
                            </div>
                        </div>
                        <img src='https://image.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg' alt='img'/>
                    </div>
                    <div className={classes.main__pminfo__wh}>
                        <div className={classes.container} style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <img src={imgSec} alt='img'/>
                            <div>
                                <div className={classes.main__pminfo__wh__title}>
                                    Зачем оно вам?
                                </div>
                                <div className={classes.main__pminfo__wh__text}>
                                    Управление проектами — тяжёлая работа, делать которую ещё сложнее, если у вас нет программного обеспечения или вам приходится пользоваться кучей разных инструментов. Очень легко упустить из виду постоянно перемещающиеся компоненты и невероятно сложно быть в курсе всех событий. В этих условиях что-то неизбежно будет проходить незамеченным. Используйте один инструмент для организации проектов, обмена информацией и соблюдения сроков.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.main__capability}>
                    <div className={classes.container}>
                        <div className={classes.main__capability__title}>
                            Управляйте проектами с удовольствием
                        </div>
                        <div className={classes.main__capability__wrapper}>
                            <div className={classes.main__capability__wrapper__item}>
                                <div className={classes.main__capability__wrapper__item__icon}>
                                    <i className="far fa-calendar-check" style={{color: '#a6d4fa'}}></i>
                                </div>
                                <div className={classes.main__capability__wrapper__item__title}>
                                    Ход выполнения задач
                                </div>
                                <div className={classes.main__capability__wrapper__item__descr}>
                                    Получайте обновления статуса в реальном времени, готовьте отчёты и многое другое.
                                </div>
                            </div>
                            <div className={classes.main__capability__wrapper__item}>
                                <div className={classes.main__capability__wrapper__item__icon}>
                                    <i className="fas fa-clipboard-list" style={{color: '#f48fb1'}}></i>
                                </div>
                                <div className={classes.main__capability__wrapper__item__title}>
                                    Всё под рукой
                                </div>
                                <div className={classes.main__capability__wrapper__item__descr}>
                                    Сделайте так, чтобы всё самое важное, например планы и детали проектов и т. д., было легко найти.
                                </div>
                            </div>
                            <div className={classes.main__capability__wrapper__item}>
                                <div className={classes.main__capability__wrapper__item__icon}>
                                <i className="far fa-clock" style={{color: '#ff9800'}}></i>
                                </div>
                                <div className={classes.main__capability__wrapper__item__title}>
                                    Строго по графику
                                </div>
                                <div className={classes.main__capability__wrapper__item__descr}>
                                Ставьте цели и определяйте приоритет задач. Вы сможете быстро запускать проекты и укладываться в сроки.
                                </div>
                            </div>
                            <div className={classes.main__capability__wrapper__item}>
                                <div className={classes.main__capability__wrapper__item__icon}>
                                <i className="fas fa-users" style={{color: '#4caf50'}}></i>
                                </div>
                                <div className={classes.main__capability__wrapper__item__title}>
                                    Управление 
                                </div>
                                <div className={classes.main__capability__wrapper__item__descr}>
                                    Разделяйте проекты на этапы, расписывайте задачи каждого этапа и распределяйте задачи между командой.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.main__last}>
                    <div className={classes.container}>
                        <div className={classes.main__last__title}>
                            Начинайте свой проект с нами
                        </div>
                        <div className={classes.main__last__descr}>
                            Все, что нужно для работы над проектами, в одной системе
                        </div>
                        <button className={classes.main__last__btn} onClick={()=>this.setState({activeModal: true})}>НАЧАТЬ</button>
                    </div>
                </div>
            </div>
        )
    }
}