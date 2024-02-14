"use strict";

import { Chat } from "./models/chatModel.js";
import { ApiError } from "./utils/appError.js";

export default function serverSideCode(socket) {
  console.log("User Connected!!!");

  socket.on("sender_message", async (data) => {
    let { sender_id, recevier_id, message } = data;

    // console.log(data.message, data.sender_id, data.recevier_id);
    if ([sender_id, recevier_id, message].some((field) => field === "")) {
      throw new ApiError(404, "User not found in the database.");
    }

    const newChat = await Chat.create({
      sender_id: sender_id,
      reciver_id: recevier_id,
      chats: message,
    });

    if (!newChat) {
      throw new ApiError(404, "User not found in the database.");
    }

    socket.broadcast.emit("reciveMsg", { recevier_id, sender_id, message });
  });

  socket.on("saveChat", async (data) => {
    const allChat = await Chat.find({
      $or: [
        { sender_id: data.sender_id, reciver_id: data.recevier_id },
        { sender_id: data.recevier_id, reciver_id: data.sender_id },
      ],
    });
    // console.log(allChat)
    socket.emit("loadChats", allChat);
  });
}
