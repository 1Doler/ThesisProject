const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../models/User')
const Board = require('../models/Board')

const router = Router()

router.post('/boarddata', async (req, res) =>{
    try{
       /*  const data = new Board({text: "Text", author: "Author", status: "Ready"});
        await data.save(); */
        const new_data = req.body;
        const alldata = new Board(new_data); 
        await alldata.save();
        res.send(alldata);
    }catch(e) {
        res.status(400).json({message: 'Что-то пошло не так'});
    }
})
router.post(
    '/login', 
    async (req, res) =>{
    try{
        const {email, password} = req.body;
        const candidate = await User.findOne({email})
        let isLog = true
        if(!candidate){
            isLog = false;
        }
        const isMatch = await bcrypt.compare(password, candidate.password);
        if(!isMatch){
            isLog = false;
        } 
        if(!isLog)
            return res.status(400).json({message: 'Неверный логин/пароль'})

        res.status(200).json({message: 'Вы удачно вошли в аккаунт', user: candidate});
    } catch(e){
        res.status(400).json({message: 'Что-то пошло не так'});
    }
        
})
router.post('/profile', async (req, res) =>{
    try{
        
        const cand = await User.findOne({_id: req.body.id},{_id: false,email: false, password:false})
        
        res.status(200).json({ user: cand});
    } catch(e){
        res.status(400).json({message: 'Что-то пошло не так'});
    }
        
})

router.post(
    '/register', 
    ////проверка на корректность введённых значений пользователем
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный данные').isLength({min: 2}),
        check('lastName', 'Некорректный данные').isLength({min: 2}),
        check('firstName', 'Некорректный данные').isLength({min: 2})
    ],
    async (req, res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }
        const {email, password, firstName, lastName} = req.body;
        const candidate = await User.findOne({email})
        if(candidate){
            res.status(400).json({message: "Такой пользователь уже существует"})
        }
        //////Хеширование пароля
        const hashedPassword = await bcrypt.hash(password,6 );

        const user = new User({email, password: hashedPassword, firstName, lastName});
        //запись в бд
        await user.save();
        
        res.status(201).json({message: 'Пользователь добавлен'});
        
    } catch(e) {
        res.status(500).json({message: "Erro"})
    }
})


module.exports = router