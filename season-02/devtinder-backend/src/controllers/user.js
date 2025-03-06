const UserModel = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");
const { AsyncHandler } = require("../utils/handlers");

const USER_SAFE_DATA = "name photoUrl age gender about skills";

// Connection requests received
const connectionRequestsReceived = AsyncHandler(async (req, res, next) => {
    // Get the logged in user data
    const loggedInUser = req.user;

    // Get all the connection requests received by the logged in user
    const allConnectionRequestsReceived = await ConnectionRequestModel.find({
        toUserId: loggedInUser._id,
        status: "interested"
    })
        .populate({ path: "fromUserId", select: USER_SAFE_DATA })
        .select("fromUserId");

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all connection requests successfully",
        data: allConnectionRequestsReceived
    });
});

// Get all connections
const getAllConnections = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Get all the connections of the logged in user
    const allConnections = await ConnectionRequestModel.find({
        $or: [
            { fromUserId: loggedInUser._id, status: "accepted" },
            { toUserId: loggedInUser._id, status: "accepted" }
        ]
    }).populate([
        { path: "fromUserId", select: USER_SAFE_DATA },
        { path: "toUserId", select: USER_SAFE_DATA }
    ]);

    // Get only the connections data
    const connectionsData = allConnections.map((connection) => {
        if (connection.fromUserId._id.toString() === loggedInUser._id.toString()) {
            return connection.toUserId;
        } else {
            return connection.fromUserId;
        }
    });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all connections successfully",
        data: connectionsData
    });
});

// Get all the users in feed
const getAllUsersInFeed = AsyncHandler(async (req, res, next) => {
    // Get the logged in user data
    const loggedInUser = req.user;

    // Get data from request query
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Get all the connections of the logged in user
    const allConnections = await ConnectionRequestModel.find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
    }).select("fromUserId toUserId");

    // Filter our the users to hide from feed
    const hideUsersFromFeed = new Set();
    allConnections.forEach((connection) => {
        hideUsersFromFeed.add(connection.fromUserId.toString());
        hideUsersFromFeed.add(connection.toUserId.toString());
    });

    // Find the users to be shown on feed
    const usersToShowOnFeed = await UserModel.find({ _id: { $nin: Array.from(hideUsersFromFeed) } })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all users for feed successfully",
        data: {
            count: usersToShowOnFeed.length,
            users: usersToShowOnFeed
        }
    });
});

module.exports = { connectionRequestsReceived, getAllConnections, getAllUsersInFeed };
