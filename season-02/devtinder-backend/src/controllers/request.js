const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const ConnectionRequestModel = require("../models/request");
const { validateSendConnectionRequest, validateReviewConnectionRequest } = require("../utils/validation");
const UserModel = require("../models/user");

// Send connection request
const sendConnectionRequest = AsyncHandler(async (req, res, next) => {
    // Get logged in user id from auth middleware and data from request params
    const fromUserId = req.user._id;
    const { status, userId: toUserId } = req.params;

    // Validation of data
    validateSendConnectionRequest(req.params);

    // Check if the receiver exists in the db or not
    const receiverExists = await UserModel.findById(toUserId);
    if (!receiverExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the sender and receiver is different or not
    if (String(fromUserId) === String(toUserId)) {
        throw new ErrorHandler("You cannot send connection request to yourself", 409);
    }

    // Check if the connection request already exists in the db or not
    const connectionRequestExists = await ConnectionRequestModel.findOne({
        $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
        ]
    });
    if (connectionRequestExists) {
        throw new ErrorHandler("Connection request already sent", 409);
    }

    // Create a new connection request
    const newConnectionRequest = await ConnectionRequestModel.create({
        fromUserId,
        toUserId,
        status
    });

    // Populate the new connection request
    const populatedConnectionRequest = await newConnectionRequest.populate([
        { path: "fromUserId", select: "_id firstName lastName email" },
        { path: "toUserId", select: "_id firstName lastName email" }
    ]);

    // Return the response
    res.status(201).json({
        success: true,
        message: `Connection request ${status === "interested" ? "sent" : "ignored"} successfully`,
        data: populatedConnectionRequest
    });
});

// Review connection request
const reviewConnectionRequest = AsyncHandler(async (req, res, next) => {
    // Get logged in user id from auth middleware and data from request params
    const toUserId = req.user._id;
    const { status, requestId } = req.params;

    // Validation of data
    validateReviewConnectionRequest(req.params);

    // Check if the connection request exists in the db or not
    const connectionRequestExists = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId,
        status: "interested"
    });
    if (!connectionRequestExists) {
        throw new ErrorHandler("Connection request does not exists", 404);
    }

    // Update the connection request status
    connectionRequestExists.status = status;
    const updatedConnectionRequest = await connectionRequestExists.save({ validateBeforeSave: false });

    // Populate the updated connection request
    const populatedConnectionRequest = await updatedConnectionRequest.populate([
        {path: "fromUserId", select: "_id firstName lastName email"},
        {path: "toUserId", select: "_id firstName lastName email"},
    ])

    // Return the response
    res.status(200).json({
        success: true,
        message: `Connection request ${status} successfully`,
        data: populatedConnectionRequest
    });
});

module.exports = { sendConnectionRequest, reviewConnectionRequest };
