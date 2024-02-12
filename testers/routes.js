const fs = require("fs");
const codes = require("./codes");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write(codes.code1);
        return res.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];

        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on("end", () => {
            const parsebody = Buffer.concat(body).toString();
            const msg = parsebody.split("=")[1];
            fs.writeFile("message.txt", msg, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }

    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>First Page</title></head>");
    res.write("<body><h1>Test Page Node.js</h1></body>");
    res.write("</html>");
    res.end();
};

module.exports = requestHandler;
