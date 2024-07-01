import logger from './logger.js';
import morgan from 'morgan';

import 'dotenv/config'
import express from 'express'
const app = express()
const port = process.env.PORT  || 3000

app.use(express.json())

const teaData = []
const morganFormat = ':method :url :status :response-time ms';

let nextId = 1

app.use(morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
  
        };
        logger.info(JSON.stringify(logObject));
      }
    }
  }));
  
app.post("/teas", (req, res) => {
    logger.warn("Post request")
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get("/teas", (req, res) => {
    res.status(200).send(teaData)
})

app.get("/teas/:id", (req, res) => {
    const teaId = Number(req.params.id)
    const getTea = teaData.find((item) => item.id === teaId)
    if (!getTea) {
        return res.status(404).send("There Is No Tea")
    }
    else {
        return res.status(200).send(getTea)
    }
})

app.put("/teas/:id", (req, res) => {
    const { name, price } = req.body
    const teaId = Number(req.params.id)
    const tea = teaData.find((item) => item.id === teaId)
    if (!tea) {
        return res.status(404).send("There Is No Tea")
    }
    else {
        tea.name = name
        tea.price = price
        return res.status(200).send(tea)
    }
})

app.delete("/teas/:id", (req, res) => {
    const teaId = Number(req.params.id)
    const indexOfItem = teaData.findIndex((item) => item.id === teaId)
    if(indexOfItem===-1){
        return res.status(404).send("No item found")
    }
    else{
        teaData.splice(indexOfItem, 1)
        return res.status(204).send("Item Deleted Successfully")
    }
})

app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})