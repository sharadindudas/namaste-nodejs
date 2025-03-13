const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the sender id"],
            trim: true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the receiver id"],
            trim: true
        },
        status: {
            type: String,
            trim: true,
            lowercase: true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is not a valid status type`
            }
        }
    },
    { timestamps: true, versionKey: false }
);

// Compound indexing
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequestModel = mongoose.model("Connection Request", connectionRequestSchema);
module.exports = ConnectionRequestModel;
