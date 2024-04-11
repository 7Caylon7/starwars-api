const express = require("express");
const mongoose = require("mongoose"); //biblioteca do mongodb
const cors = require('cors');
require("dotenv").config()



const app = express() //essa é uma aplicação express
app.use(cors()); // Isso permite solicitações de todas as origens
app.use(express.json()) //lendo requisição de dados de JSON
const port = 3000 //aplicação vai usar a porta 3000


//criando model mongoose com nome de Filme com algumas caracteristicas do tipo String
const Filme = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
})


//Buscando a lista de dados
app.get("/", async(req, res) => { //Definindo a rota de requisição e resposta
    const films = await Filme.find() //metodo para buscar todos os meus dados no  banco de dados
    return res.send(films) //resposta.envie
})


//deletando um dado a partir do seu id
app.delete("/:id", async(req, res) =>{
    const film = await Filme.findByIdAndDelete(req.params.id)
    return res.send(film)
})


//Alterando um dado
app.put("/:id", async(req, res) => {
    const film = await Filme.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    }, {
        new: true
    })
    return res.send(film)
})

//salvando um novo dado - operação assincrona(async)
app.post("/", async(req,res) => {
    const film = new Filme({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
    })

    await film.save() //espere o filme ser salvo para passar pro próximo passo
    return res.send(film)
})

app.listen(port, () => {
    console.log('App running')
})


require("../database/connection")