const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Table = require('../models/Table')
const Board = require('../models/Board')

const router = Router()
router.post('/addtasklist', async (req, res)=>{
    try{
        const data = req.body;
        const {board_id, nameTaskList} = data;
        const newItem = new Table({nameTable: nameTaskList, boardId: board_id})
        await newItem.save()
        res.status(200).json({message: newItem});
    }catch(e){
        res.status(400).json({message: 'Ошибочка'})
    }
})

router.post('/deletetasklist', async (req, res)=>{
    try{
        const result = await Table.deleteOne({_id: req.body.id});
        res.status(200).json({message: result});
    }catch(e){
        res.status(400).json({message: 'Ошибочка'})
    }
})
router.post('/updatetask', async (req, res)=>{
    try{
        const data = req.body;
        const {_id, tableId, description, text, status, performer, startDate, priority, duration, completionPercentage, dueDate} = data;
        const fd = await Table.find({'_id': tableId,
        'task._id': _id,});
        const result = await Table.update(
            {   
                '_id': tableId,
                'task._id': _id,
                    
            },
            {'$set':{
                'task.$.description': description,
                'task.$.textTask': text,
                'task.$.status': status,
                'task.$.performer': performer,
                'task.$.startDate': startDate,
                'task.$.dueDate': dueDate,
                'task.$.priority': priority,
                'task.$.duration': duration,
                'task.$.completionPercentage': completionPercentage
            }, function(error, success) {}}    
        )
        res.status(200).json({message: result});
    }catch(e){
        res.status(400).json({message: 'Ошибочка'})
    }
})
module.exports = router
