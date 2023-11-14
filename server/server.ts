import net from "node:net";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const serverTCP = net.createServer();

serverTCP.on("connection", (socket) => {
    console.log("Client connected " + new Date().toLocaleString());

    socket.on("data",(data) => {
        const stringRequest = data.toString();
        const r = JSON.parse(stringRequest);
        let response;

        if(r[0] === "get" && r[1] === "all"){
            response = "Solicitud para mostrar toda la lista de libros";
            socket.write(JSON.stringify(response));
        }else if(r[0] === "get" && r[1] === "id" && r.length === 3){
            response = "Solicitud para mostrar un libro por su id";
            socket.write(JSON.stringify(response));
        }else if(
            r[0] === "add" &&
            r[1] ==="name" &&
            r[2] !== "premiere" &&
            r[3] === "premiere" &&
            r[4] !== "rating" &&
            r[5] === "rating" &&
            r[6] !== "atp" &&
            r[7] === "atp"){
            response = "Solicitud para agregar un libro nuevo";
            socket.write(JSON.stringify(response));
        }else if(r[0] === "delete" && r[1] === "id" && r.length === 3){
            response = "Solicitud para borrar un libro";
            socket.write(JSON.stringify(response));
        }else{
            response = "Request incorrecta";
            socket.write(JSON.stringify(response));
        }
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



