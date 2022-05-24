import mongoose from "mongoose";
export const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        userId: mongoose.Types.ObjectId,
        content: String,
        dateSend: Date,
        zoneId: mongoose.Types.ObjectId,
        isDeleted: Boolean
       
    })
);

export default Message;