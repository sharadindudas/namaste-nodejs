const { AsyncHandler } = require("../utils/handlers");
const UserModel = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = "name photoUrl age gender about skills";

// Received / Pending connection requests
const receivedConnectionRequests = AsyncHandler(async (req, res, next) => {
    // Get logged in user's data
    const loggedInUser = req.user;

    // Get all the connection requests received by the user
    const connectionRequestsReceived = await ConnectionRequestModel.find({
        toUserId: loggedInUser._id,
        status: "interested"
    })
        .select("fromUserId")
        .populate({ path: "fromUserId", select: USER_SAFE_DATA });

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched connection requests received successfully",
        data: connectionRequestsReceived
    });
});

// All connection requests
const allConnectionRequests = AsyncHandler(async (req, res, next) => {
    // Get logged in user's data
    const loggedInUser = req.user;

    // Get all the connections of the user
    const allConnections = await ConnectionRequestModel.find({
        $or: [
            { fromUserId: loggedInUser._id, status: "accepted" },
            { toUserId: loggedInUser._id, status: "accepted" }
        ]
    })
        .select("fromUserId toUserId")
        .populate([
            { path: "fromUserId", select: USER_SAFE_DATA },
            { path: "toUserId", select: USER_SAFE_DATA }
        ]);

    // Get only the connections data
    const allConnectionsData = allConnections.map((connection) => {
        if (String(connection.fromUserId._id) === String(loggedInUser._id)) {
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

// User's feed
const usersFeed = AsyncHandler(async (req, res, next) => {
    // Get logged in user's data
    const loggedInUser = req.user;

    // Get data from request query
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    let skip = (page - 1) * limit;

    // Get all the connections of the user
    const allConnections = await ConnectionRequestModel.find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
    }).select("fromUserId toUserId");

    // Filter all the users from the connections
    const usersToHideFromFeed = new Set();
    allConnections.forEach((connection) => {
        usersToHideFromFeed.add(connection.fromUserId._id.toString());
        usersToHideFromFeed.add(connection.toUserId._id.toString());
    });

    // Find all the users to show on feed
    const usersToBeShownOnFeed = await UserModel.find({
        $and: [{ _id: { $nin: Array.from(usersToHideFromFeed) } }, { _id: { $ne: loggedInUser._id } }]
    })
        .limit(limit)
        .skip(skip);

    // Return the response
    res.status(200).json({
        success: true,
        message: "Fetched all the users for feed successfully",
        data: usersToBeShownOnFeed
    });
});

module.exports = { receivedConnectionRequests, allConnectionRequests, usersFeed };
