const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    SenderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    ReceiverId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    message: {type: String},
    image: {type: String}
},
    {
        timestamps: true
    }
    );

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;