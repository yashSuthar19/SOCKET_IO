import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { server, io } from "./app.js";
import serverSideCode from "./Socket.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    io.on("connection", (Socket) => {
      serverSideCode(Socket);
      
      Socket.on("disconnect", () => {
        console.log("User disconnect!!!");
      });
    });
    server.listen(process.env.PORT || 8000, (req, res) => {
      console.log(`* Server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Some error : ${error.message}`);
  });
