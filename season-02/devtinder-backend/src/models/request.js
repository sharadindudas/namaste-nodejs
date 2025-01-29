const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: String,
            required: [true, "Please provide the sender id"],
            trim: true
        },
        toUserId: {
            type: String,
            required: [true, "Please provide the receiver id"],
            trim: true
        },
        status: {
            type: String,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: `{VALUE} is not valid status type`
            },
            required: [true, "Please provide the connection status"],
            trim: true
        }
    },
    { timestamps: true, versionKey: false }
);

// Applying indexing
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;
