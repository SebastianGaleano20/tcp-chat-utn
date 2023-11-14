import net from "node:net";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const host = process.env.HOST || "127.0.0.1";

const OPTIONS = { port, host };
const clientTCP = net.connect(OPTIONS);

clientTCP.on("connect", () =>{
    console.log("Conection succesful");

    const args = process.argv.splice(2);
    const request = JSON.stringify(args);

    clientTCP.write(request);

  //  clientTCP.write(request);
  //setTimeout(() => {
  //      clientTCP.end();}, 5000);
});

clientTCP.on("data",(data) =>{
    const stringResponse = data.toString();
    const response = JSON.parse(stringResponse);
    console.log(response);
    clientTCP.end();
});