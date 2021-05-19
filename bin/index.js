"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var httpServer = http_1.createServer(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../build")));
app.get("/*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../build/index.html"));
});
io.on("error", function () {
    console.log("error");
});
io.on("connection", function (socket) {
    // Player events
    socket.on("join_room", function (id) {
        socket.join(id);
    });
    socket.on("play", function (id) {
        socket.to(id).emit("play_socket");
    });
    socket.on("pause", function (id) {
        socket.to(id).emit("pause_socket");
    });
    socket.on("seeked", function (id, currentTime) {
        socket.to(id).emit("seeked_socket", currentTime);
    });
    // Chat events
    socket.on("message", function (id, data) {
        socket.to(id).emit("message_socket", data);
    });
});
httpServer.listen(process.env.PORT || 3001);
