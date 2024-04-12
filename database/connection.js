// const mongoose = require ("mongoose")

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASS;

// const connect = () => {
//     mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@starwar-api.t6xuan0.mongodb.net/test?retryWrites=true&w=majority&appName=starwar-api`)

//     const connection = mongoose.connection;

//     connection.on("error", () => {
//         console.error("Erro ao conectar o banco de dados")
//     })

//     connection.on("open", () => {
//         console.log("Conectado ao MongoDb")
//     })
// }

// connect();

// module.exports = mongoose;