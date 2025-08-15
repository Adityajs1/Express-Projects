const Task = require('../models/Task')
const getAllTasks = async (req, res)=>{
    try {
        const tasks = await Task.find({})  // {} means find all
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
// res.json(req.body) it will run the name:inputs on the server provided by the clients
const createTasks = async (req, res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task}) 
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
// res.json({id : req.params.id}) to get the specific task
const getTasks = async (req, res)=>{
    try {
        const {id : taskID} = req.params;
        const task = await Task.findOne({id : taskID})
        if(!task){
            return res.status(400).json({message : `No message with task id : ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
const updateTasks = async (req, res)=>{
   
}
const deleteTasks = async (req, res)=>{
    try {
        const {id : taskID} = req.params;
        const task = await Task.findOneAndDelete({_id : taskId})
        if(!task){
        return res.status(400).json({message : `No message with task id : ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
         res.status(500).json({ msg: error })
    }


}
module.exports = {
    getAllTasks,createTasks, getTasks, updateTasks, deleteTasks
}