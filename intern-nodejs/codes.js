c1 = `
    <html>
        <head>
            <title>Enter Message</title>
        </head>
        <body>
            <form action = "/message" method = "POST">
                <input type = "text" name = "message">
                <button type = "submit">Send</button>
            </form>
        </body>
    </html>`;

module.exports = {
    code1: c1,
};
