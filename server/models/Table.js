const {Schema, model, Types} = require('mongoose')


const Table = new Schema({
    boardId: {type: Types.ObjectId, ref: 'Boards'},
    nameTable: {type: String},
    task: [{
        textTask: {type: String},
        description: {type: String},
        author: {type: String},
        performer: {type: String},
        tag: {type: [String]},
        status: {type: String},
        priority: {type: String},
        completionPercentage: {type: Number, min: 0, max: 100, default: 0},
        createData: {type: Date},
        startDate: {type: Date},
        dueDate: {type: Date},
    }]
})

module.exports = model('Tables', Table)