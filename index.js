const express = require("express");
const app = express();
const notifier = require('node-notifier');

//definição do bodyParser
const bodyParser = require("body-parser");

//conexão com o banco de dados
const connection = require("./database/database");

//model do BD para receber as respostas do gabarito de LPD1
const Lpd1 = require("./database/Lpd1");


//Conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada.");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//definição do view engine
app.set("view engine", "ejs");

//definição da pasta public para css, js e img
app.use(express.static("public"));

//configuração do bodyParser - serve para trabalhar com os formulários
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rota para a página inicial
app.get("/", (req, res) => {
    res.render("index");
});

//rota para exibição da página com o gabarito de história
app.get("/gabaritos", (req, res) => {
    var total = 0;
    Lpd1.findAll({order: [['nome', 'ASC']]}).then(lpd1 => {
        res.render("gabaritos", {
            total: total,
            lpd1: lpd1 
        }); 
    });
});

//rota para a página das questões de LPD1
app.get("/lpd1", (req, res) => {
    res.render("lpd1");
});


//rota para envio do gabarito de LPD1
app.post("/gabarito_lpd1", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    
    if(nome==""||q1==null||q2==null||q3==null||q4==null||q5==null||q6==null
    ||q7==null||q8==null||q9==null||q10==null){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd1");
    }else {
        Lpd1.create({
            nome: nome.toUpperCase(),
            q1: q1,
            q2: q2,
            q3: q3,
            q4: q4,
            q5: q5,
            q6: q6,
            q7: q7,
            q8: q8,
            q9: q9,
            q10: q10
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
              res.render("confirmacao", {
                nome: nome,
                q1: q1,
                q2: q2,
                q3: q3,
                q4: q4,
                q5: q5,
                q6: q6,
                q7: q7,
                q8: q8,
                q9: q9,
                q10: q10
            });
        });
    }
});

//rota para apagar um registro da tabela de história
app.post("/deletarlpd1", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Lpd1.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/lpd1");
        });
    }
    
    });


//servidor
app.listen(1517, ()=>{
    console.log("Servidor Rodando na porta 1517");
});
