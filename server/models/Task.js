const {Schema, model, Types} = require('mongoose')


const Board = new Schema({
    nameBoard: {type: String},
    description: {type: String},
    author: {type: String},
    tag: {type: [String]},
    completionPercentage: {type: Number, min: 0, max: 100, default: 0},
    status: {type: String},
    favorite: {type: Boolean},
    startDate: {type: Date, default: Date.now},
    dueDate: {type: Date},
    duration: {type: Number, min: 0},
    table: [{
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
            createData: {type: Date, default: Date.now},
            startDate: {type: Date, default: Date.now},
            dueDate: {type: Date}
        }]
    }]
})

module.exports = model('Board', Board)