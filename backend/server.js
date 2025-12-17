import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connetBD from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminroute.js';
import userRouter from './routes/userRoute.js';


// app config
const app = express()
const port = process.env.PORT || 4000
connetBD();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints

app.use('/api/admin', adminRouter)
// localhost:4000/api/admin/add-doctor
app.use('/api/user', userRouter);

app.get('/', (req, res)=>{
    res.send('API working..');
})

app.listen(port, ()=> console.log("Server Started", port));

