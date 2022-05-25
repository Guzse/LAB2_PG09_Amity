import mongoose from 'mongoose';

// "mongoose.model" will create a sort of mirror to the database. Later, this is where we will interact with the database
export const Safezone = mongoose.model(
    'Safezone', // Name of the model

    new mongoose.Schema({
        // Here you just list all the variables that the object contains
        zoneName: String,
        description: String,
        maxMembers: Number,
        meetingDate: Date
    })
);
export default Safezone;