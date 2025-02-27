const UserModel = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");

const USER_SAFE_DATA = "name photoUrl age gender about skills";

// Connection requests received
const connectionRequestsReceived = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Get all the pending connection requests for the logged in user
    const connectionRequests = await ConnectionRequestModel.find({
        toUserId: loggedInUser._id,
        status: "interested"
    }).populate({ path: "fromUserId", select: USER_SAFE_DATA });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched connections requests received successfully",
        data: connectionRequests
    });
});

// Get all connections
const getAllConnections = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Get all the connections
    const allConnections = await ConnectionRequestModel.find({
        $or: [
            { toUserId: loggedInUser._id, status: "accepted" },
            { fromUserId: loggedInUser._id, status: "accepted" }
        ]
    }).populate([
        { path: "fromUserId", select: USER_SAFE_DATA },
        { path: "toUserId", select: USER_SAFE_DATA }
    ]);

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

// User should see all user cards except
// 0. his own card
// 1. his connections (status -> accepted)
// 2. ignored/rejected people (status -> ignored, rejected)
// 3. already sent the connection request

// Pagination logic
/*
    /feed?page=1&limit=10 => users 1-10 => skip(0) limit(10) // (1-1)* 10
    /feed?page=2&limit=10 => users 11-20 => skip(10) limit(10) // (2-1)*10
    /feed?page=3&limit=10 => users 21-30 => skip(20) limit(10) // (3-1)*10

    .skip() .limit()
    skip = (page - 1) * limit
*/

// Get all the users in feed
const getAllUsersInFeed = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Get data from request params
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Get all the connections of the logged in user
    const allConnections = await ConnectionRequestModel.find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
    }).select("fromUserId toUserId status");

    // Get the users from the feed to hide
    const hideUsersFromFeed = new Set();
    allConnections.forEach((connection) => {
        hideUsersFromFeed.add(connection.fromUserId.toString());
        hideUsersFromFeed.add(connection.toUserId.toString());
    });

    // Find the users who are not included inside hide users from feed
    const usersToShowOnFeed = await UserModel.find({ _id: { $nin: Array.from(hideUsersFromFeed) } })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all users successfully",
        data: {
            count: usersToShowOnFeed.length,
            users: usersToShowOnFeed
        }
    });
});

module.exports = { connectionRequestsReceived, getAllConnections, getAllUsersInFeed };
