const img = document.querySelector("#cam");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// WS setup
const HOST = "wss://url.to.server";
let ws = new WebSocket(HOST);
ws.onopen = () => {
  console.log("Websocket connected!");
  ws.send("sender");
  refresh();
};

ws.onclose = () => (ws = new WebSocket(HOST));

function refresh() {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  context.drawImage(img, 0, 0);
  setTimeout(refresh, 100);
}

async function send_image(blob) {
  if (blob) {
    buffer = await blob.arrayBuffer();
    ws.send(buffer);
  }
}
