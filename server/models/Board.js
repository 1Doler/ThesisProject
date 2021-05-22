const {Schema, model, Types} = require('mongoose')


const Board = new Schema({
    userId: {type: Types.ObjectId, ref: 'Users'},
    nameBoard: {type: String},
    description: {type: String},
    author: {type: String},
    executor: [{
        userId: {type: Types.ObjectId, ref: 'Users'},
        role: {type: String}
    }],
    tag: {type: [String]},
    completionPercentage: {type: Number, min: 0, max: 100, default: 0},
    status: {type: String, default: 'Active'},
    favorite: {type: Boolean},
    startDate: {type: Date, default: Date.now},
    duration: {type: Number, min: 0},
})

module.exports = model('Boards', Board)