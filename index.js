
const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const _ = require("lodash");
const {v4: uuid} = require("uuid");
const { start } = require("repl");

const app = express();

app.use(express.json());

app.get("/outfit", (req, res) => {
    const tops = ["Black", "White", "Orange", "Navy"];
    const jeans = ["Brown", "Blue", "Grey", "Black"];
    const shose = ["White", "Dark-Grey", "Brown"];

    res.json({
        top: _.sample(tops),
        jeans: _.sample(jeans),
        shoes: _.sample(shose)
    });
});

app.post("/comments", async (req, res) => {
    const id = uuid();
    const content = req.body.content;

    if(!content) {
        return res.sendStatus(401);
    }

    await fs.mkdir("data/comments", {recursive: true});
    await fs.writeFile('data/comments/${id}.txt', content );

    res.sendStatus(201);
    
});

app.listen(3000, () => console.log("API Server is running..."));


