"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var httpServer = http_1.createServer();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("error", function () {
    console.log("error");
});
io.on("connection", function (socket) {
    return "a";
});
httpServer.listen(3000);
