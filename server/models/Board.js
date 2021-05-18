const {Schema, model, Types} = require('mongoose')


const Board = new Schema({
    userId: {type: Types.ObjectId, ref: 'Users'},
    nameBoard: {type: String},
    description: {type: String},
    author: {type: String},
    executor: [{
        executorId: {type: Types.ObjectId, ref: 'Users'},
        role: {type: String}
    }],
    tag: {type: [String]},
    completionPercentage: {type: Number, min: 0, max: 100, default: 0},
    status: {type: String},
    favorite: {type: Boolean},
    startDate: {type: Date, default: Date.now},
    dueDate: {type: Date},
    duration: {type: Number, min: 0},
})

module.exports = model('Boards', Board)