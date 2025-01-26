const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");

const sendconnectionrequest = async (req, res) => {
  try {
    // Get data from request params and auth middleware
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    // Check if the receiver exists in the db or not
    const receiverExists = await UserModel.findById(toUserId);
    if (!receiverExists) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }

    // Check if sender and receiver is different or not
    if (String(fromUserId) === String(toUserId)) {
      return res.status(409).json({
        success: false,
        message: "Can't send connection request to yourself",
      });
    }

    // Check if the status is valid or not
    const ALLOWED_STATUS = ["interested", "ignored"];
    if (!ALLOWED_STATUS.includes(status)) {
      throw new Error(`${status} is not allowed`);
    }

    // Check if the connection request already exists in the db or not
    const connectionRequestExists = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (connectionRequestExists) {
      return res.status(409).json({
        success: false,
        message: "Connection request has been already sent",
      });
    }

    // Create a new connection request
    const newconnectionrequest = await ConnectionRequestModel.create({
      fromUserId,
      toUserId,
      status,
    });

    // Show the user details along with connection request data
    const populatedConnectionRequest = await newconnectionrequest.populate([
      { path: "fromUserId", select: "_id firstName lastName email" },
      { path: "toUserId", select: "_id firstName lastName email" },
    ]);

    // Return the response
    res.status(200).json({
      success: true,
      message: `Connection request ${
        status === "interested" ? "sent" : "ignored"
      } successfully`,
      data: populatedConnectionRequest,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const reviewconnectionrequest = async (req, res) => {
  try {
    // Get data from request params and auth middleware
    const { status, requestId } = req.params;
    const loggedInUser = req.user;

    // Validation of status
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(409).json({
        success: false,
        message: `Status is not allowed`,
      });
    }

    // Check if connection request exists in the db or not
    const connectionRequestExists = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
    console.log(connectionRequestExists);
    if (!connectionRequestExists) {
      return res.status(404).json({
        success: false,
        message: `Connection request does not exists`,
      });
    }

    // Update the status
    connectionRequestExists.status = status;
    const data = await connectionRequestExists.save({
      validateBeforeSave: false,
    });

    // Return the response
    res.status(200).json({
      success: true,
      message: `Connection request ${status} successfully`,
      data,
    });
  } catch (err) {}
};

module.exports = { sendconnectionrequest, reviewconnectionrequest };
