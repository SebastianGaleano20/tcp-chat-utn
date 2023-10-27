import net from "node:net";

const PORT = 2010;
const serverTCP = net.createServer();

serverTCP.on("connection", (socket) => {
    console.log("Client connected " + new Date().toLocaleString());

    socket.on("data",(data) => {
        const stringRequest = data.toString();
        const request = JSON.parse(stringRequest);

        console.log(request);
    });

    socket.on("close", () => {
        console.log("Client disconnected " + new Date().toLocaleString());
    })

    socket.on("error", ()=> {
        console.log("Client error");
    })
});

serverTCP.listen(PORT, () =>{
    console.log("Server up on port " + PORT);
});



