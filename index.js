// const express = require('express')
// const colors = require('colors')  # this is not the ES6 way, so added "type": module

import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import ticketRoute from './routes/ticketRoute.js';
import authRoute from './routes/authRoute.js';
import path from 'path';

dotenv.config();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

// all routes

app.use('/api/v1/ticket', ticketRoute);
app.use('/api/v1/auth', authRoute);


const port = process.env.PORT || 5000;

// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/category', categoryRoutes);
// app.use('/api/v1/product', productRoutes);

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' })
})

app.use('*', function(req,res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(port, "192.168.31.126", () => {
    console.log(`Example app listening on port ${port}`.bgCyan.green)
})