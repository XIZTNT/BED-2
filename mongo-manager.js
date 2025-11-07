//Mongoose DB!!!
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const openMongoConnection = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connected to MongoDB");
    });
    mongoose.connect('mongodb+srv://ChadM:Cluster25!@cluster0.eozii.mongodb.net');
    //password was changed to "Cluster26! to restart after AWS crash paused cluster"
    //password had to be changed back to "Cluster25!" in order to authenticate properly
};

mongoose.set('strictQuery', true)

export {openMongoConnection};