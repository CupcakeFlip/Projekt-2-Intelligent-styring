const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Server } = require("ws");

const server = express()
    .use(express.static(path.join(__dirname, "public")))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });
require("./websockets/simple.js")(wss);
