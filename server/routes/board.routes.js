const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Board = require('../models/Board')
const Table = require('../models/Table')
const User = require('../models/User')
const router = Router()

router.post('/pb',async (req,res)=>{
    try{
        const {data} = req.body;
        const newdata = new Board(data);
        const re = await newdata.save();
        res.status(400).json({message: re})
    }catch(e){
        res.status(400).json({message: 'Ашибка'});
    }
})
router.post('/boarddata1', async (req, res) =>{
    try{
        
        const alldata = await Board.find({userId: req.body.id}); 
        res.json(alldata);
    }catch(e) {
        res.status(400).json({message: 'Что-то пошло не так'});
    }
})
router.post('/ontoggleimportant', async (req, res)=>{
    try{
        const data = req.body;
        const {_id, favorite} = data;
        const ab = await Board.updateOne({_id},{$set: {favorite}},(err, result) => {
            if (err) {
              console.log('Unable update user: ', err)
              throw err
            }
        })
        res.status(200).json({message: ab});

    }catch(e){
        res.status(400).json({message: 'Ошибочка'})
    }
})
router.get('/table', async (req, res)=>{
    try{
        const alldata = await Table.find(); 
        res.json(alldata);
    }catch(e){
        res.status(400).json({message: 'Ошибочка в TASK'})
    }
})
router.post('/getexecutor', async(req,res)=>{
    try{
        const data = req.body;
        const {executorId} = data;
        const users = await User.find({
            '_id': {$in: executorId}
        }, {password: false}); 
        res.json(users);
    }catch(e){
        res.status(400).json({message: 'Ошибочка'})
    }
})
router.post('/addexecutor', async(req,res)=>{
    try{
        const data = req.body;
        const {email, role, boardId} = data;
        const user = await User.findOne({
            'email': email
        });
        if(!user)
        {
            return res.status(400).json({message: 'Такого пользователя не существует'});
        }
        
        const result = await Board.updateOne(
            {   
                '_id': boardId
            },
            {'$push':{
                executor:{
                    $each: [ {'userId': user._id, 'role': role} ] 
                }
            }}
        )
        res.status(200).json({userId: user._id});

    }catch(e){
        res.status(400).json({message: 'Ошибочка'})
    }
})
module.exports = router
