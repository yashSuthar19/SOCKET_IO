import { mongoose, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reciver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chats: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export { Chat };
