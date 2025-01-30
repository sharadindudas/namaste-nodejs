const mongoose = require("mongoose");
const { ErrorHandler } = require("../utils/handlers");

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

// Check if the sender and receiver is different or not
// connectionRequestSchema.pre("save", function (next) {
//     if (this.fromUserId.equals(this.toUserId)) {
//         throw new ErrorHandler("You cannot send connection request to yourself", 409);
//     }
//     next();
// });

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;
