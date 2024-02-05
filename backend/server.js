import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'; // Import the cors middleware
import categoryRoute from './routes/categoryRoute.js'
import leadRoute from './routes/LeadRoute.js'

const server = express();
let PORT = process.env.PORT || 8000


server.use(express.json())
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use('/api/category', categoryRoute)
server.use('/api/lead', leadRoute)

mongoose.connect(process.env.MONGODB_URI, { autoIndex: true, dbName: 'DataKindness' }).then((res) => console.log('database connection successfull')).catch((err) => console.log(`error in database connection : ${err}`))

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
)

server.listen(PORT, () => { console.log(`server is listening to the port ${PORT}`) })     