import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js'


dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
    try{
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("MongoDB connected.");
    } catch (err){
        console.error(err.message);
        process.exit(1);
    }
};


connectDB().then(() => {
    app.listen(4000, () => console.log('listening on port 4000 '))
}).catch(err => console.log(err));


app.use('/api/posts', postRoutes);