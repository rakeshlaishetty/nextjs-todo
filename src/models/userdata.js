import mongoose from "mongoose";

const TodouserSchema = new mongoose.Schema({
    name: {
        type: String,
    }, email: {
        type: String,
        unique: true
    }, password: {
        type: String
    }
})

export const usersdata = mongoose.models.userdata || mongoose.model("userdata", TodouserSchema)