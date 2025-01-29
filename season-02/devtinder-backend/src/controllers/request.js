const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const ConnectionRequestModel = require("../models/request");
const { validateSendConnectionRequest, validateReviewConnectionRequest } = require("../utils/validation");
const UserModel = require("../models/user");

// Send connection request
const sendConnectionRequest = AsyncHandler(async (req, res, next) => {
    // Get data from request params and logged in user id
    const status = req.params.status;
    const toUserId = req.params.userId;
    const fromUserId = req.user._id;

    // Validation of data
    validateSendConnectionRequest(req.params);

    // Check if the receiver exists in the db or not
    const receiverExists = await UserModel.findById(toUserId);
    if (!receiverExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the sender and receiver is different or not
    if (String(fromUserId) === String(toUserId)) {
        throw new ErrorHandler("Cannot send connection request to yourself", 409);
    }

    // Check if the connection request already exists in the db or not
    const connectionRequestExists = await ConnectionRequestModel.findOne({
        $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
        ]
    });
    if (connectionRequestExists) {
        throw new ErrorHandler("Connection request already exists", 409);
    }

    // Create a new connection request
    const newConnectionRequest = await ConnectionRequestModel.create({
        fromUserId,
        toUserId,
        status
    });

    // Return the response
    return res.status(200).json({
        success: true,
        message: `Connection request ${status === "interested" ? "sent" : "ignored"} successfully`,
        data: newConnectionRequest
    });
});

// Review connection request
const reviewConnectionRequest = AsyncHandler(async (req, res, next) => {
    // Get data from request params and logged in user details
    const status = req.params.status;
    const requestId = req.params.requestId;
    const loggedInUser = req.user;

    // Validation of data
    validateReviewConnectionRequest(req.params);

    // Check if the connection request exists in the db or not
    const connectionRequestExists = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested"
    });
    if (!connectionRequestExists) {
        throw new ErrorHandler("Connection request does not exists", 404);
    }

    // Update the status
    connectionRequestExists.status = status;
    const updatedConnectionRequest = await connectionRequestExists.save({ validateBeforeSave: false });

    // Return the response
    return res.status(200).json({
        success: true,
        message: `Connection request ${status} successfully`,
        data: updatedConnectionRequest
    });
});

module.exports = { sendConnectionRequest, reviewConnectionRequest };
