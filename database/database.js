const Sequelize = require("sequelize");
//conexão com o banco de dados do mysql
const connection = new Sequelize("saeb-digital-julho", "aluno", "aluno", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
