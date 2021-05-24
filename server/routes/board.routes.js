const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Board = require('../models/Board')
const Table = require('../models/Table')
const User = require('../models/User')
const router = Router()

router.post('/boarddata1', async (req, res) =>{
    try{
        const alldata = await Board.find({$or: [{userId: req.body.id}, {'executor.userId': req.body.id}]});   
        res.json(alldata);
    }catch(e) {
        res.status(400).json({message: 'Что-то пошло не так'});
    }
})
router.post('/addboard', async (req, res) =>{
    try{
        const {lsUserId, nameBoard, descr, status} = req.body;
        const newItem = new Board({userId: lsUserId,nameBoard, description: descr,status, executor: {userId: lsUserId, role: 'Admin'}}); 
        await newItem.save();
       
        res.json('good');
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
        const exec = await Board.findOne({
            '_id': boardId,
            'executor.userId': user._id
        });
        if(!exec){
            await Board.updateOne(
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
        }
        else
            return res.status(400).json({message: 'Ошибочка'})

    }catch(e){
        res.status(400).json({message: 'Ошибочка'})
    }
})
module.exports = router
