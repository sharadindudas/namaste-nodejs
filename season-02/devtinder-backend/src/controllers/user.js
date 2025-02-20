const ConnectionRequestModel = require("../models/connectionRequest");
const { AsyncHandler } = require("../utils/handlers");

const USER_SAFE_DATA = "name photoUrl age gender about skills";

// Connection requests received
const connectionRequestsReceived = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Get all the connections received by the user
    const connectionRequests = await ConnectionRequestModel.find({ toUserId: loggedInUser._id, status: "interested" }).populate(
        "fromUserId",
        USER_SAFE_DATA
    );

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched connection requests received successfully",
        data: connectionRequests
    });
});

// Get all connections
const getAllConnections = AsyncHandler(async (req, res, next) => {
    // Get the logged in user data
    const loggedInUser = req.user;

    // Get all the connections
    const allConnections = await ConnectionRequestModel.find({
        $or: [
            { fromUserId: loggedInUser._id, status: "accepted" },
            { toUserId: loggedInUser._id, status: "accepted" }
        ]
    })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

    // Get the connections data
    const connectionsData = allConnections.map((connection) => {
        if (String(connection.fromUserId._id) === String(loggedInUser._id)) {
            return connection.toUserId;
        }
        return connection.fromUserId;
    });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all connections successfully",
        data: connectionsData
    });
});

module.exports = { connectionRequestsReceived, getAllConnections };
