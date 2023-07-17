const Sequelize = require("sequelize");
//conexão com o banco de dados do mysql
const connection = new Sequelize("trabalho_de_historia", "root", "admin", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;