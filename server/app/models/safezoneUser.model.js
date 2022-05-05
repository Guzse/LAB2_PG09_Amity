import mongoose from 'mongoose';
export const SafezoneUser = mongoose.model(
    'SafezoneUser',
    new mongoose.Schema({
        userId: mongoose.Types.ObjectId,
        zoneId: mongoose.Types.ObjectId,
        dateCreated: Date
    })
);
export default SafezoneUser;