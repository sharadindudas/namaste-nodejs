const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");
const { AsyncHandler, ErrorHandler } = require("../utils/handlers");
const { validateSendConnectionRequest, validateReviewConnectionRequest } = require("../utils/validations");

// Send connection request
const sendConnectionRequest = AsyncHandler(async (req, res, next) => {
    // Get data from request params
    const { status, userId: toUserId } = req.params;

    // Get logged in user id
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

    // Save the new connection request
    const newConnectionRequest = await ConnectionRequestModel.create({
        fromUserId,
        toUserId,
        status
    });

    // Populate the connection request data
    const populatedConnectionRequest = await newConnectionRequest.populate([
        { path: "fromUserId", select: "name" },
        { path: "toUserId", select: "name" }
    ]);

    // Return the response
    return res.status(201).json({
        success: true,
        message: `Connection request ${status === "interested" ? "sent" : status} successfully`,
        datA: populatedConnectionRequest
    });
});

// Review connection request
const reviewConnectionRequest = AsyncHandler(async (req, res, next) => {
    // Get data from request params
    const { status, requestId } = req.params;

    // Get logged in user id
    const loggedInUserId = req.user._id;

    // Validation of data
    validateReviewConnectionRequest(req.params);

    // Check if the connection request exists in the db or not
    const connectionRequestExists = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested"
    });
    if (!connectionRequestExists) {
        throw new ErrorHandler("Connection request does not exists", 404);
    }

    // Update the connection request status
    connectionRequestExists.status = status;
    const updatedConnectionRequest = await connectionRequestExists.save({ validateBeforeSave: false });

    // Populate the connection request
    const populatedConnectionRequest = await updatedConnectionRequest.populate([
        { path: "fromUserId", select: "name" },
        { path: "toUserId", select: "name" }
    ]);

    // Return the response
    res.status(200).json({
        success: true,
        message: `Connection request ${status} successfully`,
        data: populatedConnectionRequest
    });
});

module.exports = { sendConnectionRequest, reviewConnectionRequest };
