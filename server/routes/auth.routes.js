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
        if(!candidate){
            res.status(400).json({message: "Такой пользователь не существует"})
        }
        const isMatch = await bcrypt.compare(password, candidate.password);
        if(!isMatch){
            return res.status(400).json({message: 'Неверный пароль'})
        } 
        res.status(400).json({message: 'Такой пользователь существует'});
    } catch(e){
        res.status(400).json({message: 'Что-то пошло не так'});
    }
        
})

router.post(
    '/register', 
    ////проверка на корректность введённых значений пользователем
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный email').isLength({min: 2})
    ],
    async (req, res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации12'
            })
        }
        const {email, password} = req.body;
        const candidate = await User.findOne({email})
        if(candidate){
            res.status(400).json({message: "Такой пользователь уже существует"})
        }
        //////Хеширование пароля
        const hashedPassword = await bcrypt.hash(password,6 );

        const user = new User({email, password: hashedPassword});
        //запись в бд
        await user.save();
        
        res.status(201).json({message: 'Пользователь добавлен'});
        
    } catch(e) {
        res.status(500).json({message: "Erro"})
    }
})


module.exports = router