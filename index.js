import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";


import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

dotenv.config();

app.use(express.json({ limit:"30mb",extended:true}));
app.use(express.urlencoded({ limit:"30mb",extended:true}));

app.use(cors());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/', (req,res) => {
    res.send('Welcome to mou api');
})


const PORT = process.env.PORT || 4021;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))).catch((error) => console.log(error.message));