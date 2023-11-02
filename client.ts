import net from "node:net";

const OPTIONS = {
    port: 2010,
    host: "127.0.0.1",
}

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