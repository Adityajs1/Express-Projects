const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const port = 3000
const connectDB = require('./controllers/databases/connect')
app.use(express.static('./public'))
app.use(express.json())
require('dotenv').config()
app.get('/hello',(req, res)=>{
    res.send('Task Manager App')
})
app.use('/api/v1/tasks', tasks)
const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
          console.log(`Server is listening on port ${port}...`)
        );
    }
    catch(error){
       console.log(error);
    }
}
start()
