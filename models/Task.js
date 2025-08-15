const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'must provide name'],
            trim: true,
            maxlength: [20, 'name can not be more than 20 characters'],
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Optional: adds createdAt and updatedAt fields
    }
)

module.exports = mongoose.model('Task', TaskSchema)