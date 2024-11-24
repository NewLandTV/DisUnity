const express = require("express");
const { SendMessage } = require("./index.js");

const app = express();
const port = 2912;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Bot state : Online");
});

app.post("/", (req, res) => {
    const msg = `DisUnity : ${req.body.msg}`;

    console.log(msg);

    SendMessage(msg);

    res.end("OK");
});

function KeepAlive() {
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
}

module.exports = { KeepAlive };