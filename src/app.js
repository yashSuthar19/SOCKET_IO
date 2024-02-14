import express from "express";
const app = express();
import { createServer } from "http";
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import nunjucks from "nunjucks";
import router from "./routes/userRoutes.js";
import cookieSession from "cookie-session";

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.set("view engine", "html");

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

app.use(
  cookieSession({
    name: process.env.cookieSessionName,
    secret: process.env.cookieSessionSecret,
    maxAge: 24 * 60 * 60 * 1000, // 24 Hrs
  })
);

app.use("/user", router);

export { server, io };
