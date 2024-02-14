import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/appError.js";

//Register User Route
const userRegisterRoute = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ([email, userName, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const newUser = await User.create({
    userName,
    email,
    password,
  });

  if (!newUser) {
    throw new ApiError(
      400,
      "Error in the backend: Unable to save data to the database."
    );
  }

  res.send(newUser);
});

//// User Login Logout Route
const userLoginPage = (req, res) => {
  res.render("loginUser.html");
};

const userLoginRoute = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const findUser = await User.findOne({ email: email });

  req.session.User = findUser;

  if (!findUser) {
    throw new ApiError(404, "User not found in the database.");
  }

  res.redirect("/user/chatboard");
});

////DashBoard
const chatDashBoard = asyncHandler(async (req, res) => {
  const findAllUser = await User.find({ _id: { $ne: req.session.User._id } });

  if (!findAllUser) {
    throw new ApiError(404, "User found in the database Error.");
  }
  let user = await User.findOne({ email: req.session.User.email });

  if (!user) {
    throw new ApiError(404, "User found in the database Error.");
  }
  let chats = await Chat.find({});

  if (!chats) {
    throw new ApiError(404, "Chat found in the database Error.");
  }
  res.render("chatPage.html", { findAllUser, user, chats });
});

//Export all Controllers
export { userRegisterRoute, userLoginRoute, userLoginPage, chatDashBoard };
