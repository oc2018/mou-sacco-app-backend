import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    memberNo: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    datePaid: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    creator: {
        type: String,
        required: true,
    },

});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;