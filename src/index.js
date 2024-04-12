const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());

// Criando a conexão com o banco de dados
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@starwar-api.t6xuan0.mongodb.net/test?retryWrites=true&w=majority&appName=starwar-api`, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro ao conectar o banco de dados:"));
db.once("open", function() {
    console.log("Conectado ao banco de dados");
});

const port = process.env.PORT || 3003;

const Filme = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
});

app.get("/", async(req, res) => {
    const films = await Filme.find();
    return res.send(films);
});

app.delete("/:id", async(req, res) =>{
    const film = await Filme.findByIdAndDelete(req.params.id);
    return res.send(film);
});

app.put("/:id", async(req, res) => {
    const film = await Filme.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    }, { new: true });
    return res.send(film);
});

app.post("/", async(req,res) => {
    const film = new Filme({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    });

    await film.save();
    return res.send(film);
});

module.exports = app;
