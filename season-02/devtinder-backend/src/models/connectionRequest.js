const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the sender id"]
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the receiver id"]
        },
        status: {
            type: String,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: `{VALUE} is not a valid status type`
            },
            required: [true, "Please provide the connection status"]
        }
    },
    { timestamps: true }
);

// Compound indexing
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequestModel = mongoose.model("Connection Request", connectionRequestSchema);
module.exports = ConnectionRequestModel;
