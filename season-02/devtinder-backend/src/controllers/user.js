const { AsyncHandler } = require("../utils/handlers");
const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");

const USER_SAFE_DATA = "name photoUrl age gender about skills";

// Get all requests received
const getAllRequestsReceived = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Get all the connection requests received by the user
    const allConnectionRequestsReceived = await ConnectionRequestModel.find({
        toUserId: loggedInUser._id,
        status: "interested"
    }).populate({ path: "fromUserId", select: USER_SAFE_DATA });

    // Get the requests received data in structured way
    const requestsReceivedData = allConnectionRequestsReceived.map((connection) => connection.fromUserId);

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all requests received successfully",
        data: requestsReceivedData
    });
});

// Get all connections
const getAllConnections = AsyncHandler(async (req, res, next) => {
    // Get logged in user data
    const loggedInUser = req.user;

    // Get all the connections of the user
    const allConnections = await ConnectionRequestModel.find({
        $or: [
            { fromUserId: loggedInUser._id, status: "accepted" },
            { toUserId: loggedInUser._id, status: "accepted" }
        ]
    }).populate([
        { path: "fromUserId", select: USER_SAFE_DATA },
        { path: "toUserId", select: USER_SAFE_DATA }
    ]);

    // Get the connections data in structured way
    const allConnectionsData = allConnections.map((connection) => {
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
        data: allConnectionsData
    });
});

// Get users in feed
const getUsersInFeed = AsyncHandler(async (req, res, next) => {
    // Get data from request query
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    let skip = (page - 1) * limit;

    // Get logged in user data
    const loggedInUser = req.user;

    // Get all the connections of the user
    const allConnections = await ConnectionRequestModel.find({
        $or: [
            { fromUserId: loggedInUser._id, status: "accepted" },
            { toUserId: loggedInUser._id, status: "accepted" }
        ]
    });

    // Filter out the unique users
    const usersToHide = new Set();
    allConnections.forEach((connection) => {
        usersToHide.add(connection.fromUserId._id.toString());
        usersToHide.add(connection.toUserId._id.toString());
    });

    // Find all the users to be shown on feed with pagination
    const usersToBeShownOnFeed = await UserModel.find({
        _id: { $nin: Array.from(usersToHide) }
    })
        .skip(skip)
        .limit(limit);

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched the feed successfully",
        data: usersToBeShownOnFeed
    });
});

module.exports = { getAllRequestsReceived, getAllConnections, getUsersInFeed };
