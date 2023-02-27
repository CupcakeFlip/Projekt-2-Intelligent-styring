let count = 0;

function websocket(wss) {
    wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", (data, isBinary) => {
            data = isBinary ? data : data.toString();
            console.log(data);
        });

        ws.on("close", () => console.log("Client disconnected"));
    });

    setInterval(() => {
        wss.clients.forEach((client) => {
            client.send(count++);
        });
    }, 1000);
}

module.exports = websocket;
