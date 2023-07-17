const express = require("express");
const app = express();
const notifier = require('node-notifier');

//definição do bodyParser
const bodyParser = require("body-parser");

//conexão com o banco de dados
const connection = require("./database/database");

//model do BD para receber as respostas do gabarito de História
const Historia = require("./database/Historia");

//model do BD para receber as respostas do gabarito de Geografia
const Geografia = require("./database/Geografia");

//Conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco trabalho_de_historia.");
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
app.get("/gabarito_historia", (req, res) => {
    var total = 0;
    Historia.findAll({order: [['nome', 'ASC']]}).then(historia => {
        res.render("gabarito_historia", {
            total: total,
            historia: historia 
        }); 
    });
});

//rota para exibição da página com o gabarito de geografia
app.get("/gabarito_geografia", (req, res) => {
    var total = 0;
    Geografia.findAll({order: [['nome', 'ASC']]}).then(geografia => {
        res.render("gabarito_geografia", {
            total: total,
            geografia: geografia 
        }); 
    });
});


//rota para a página das questões de história
app.get("/historia", (req, res) => {
    res.render("historia");
});

//rota para a página das questões de geografia
app.get("/geografia", (req, res) => {
    res.render("geografia");
});

//rota para a página com o texto para o teste de leitura
app.get("/teste_de_leitura", (req, res) => {
    res.render("teste_de_leitura");
});

//rota para envio do gabarito de história
app.post("/gabarito_historia", (req, res) => {
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
    var q11 = req.body.q11;
    var q12 = req.body.q12;
    var q13 = req.body.q13;
    var q14 = req.body.q14;
    var q15 = req.body.q15;
    var q16 = req.body.q16;
    var q17 = req.body.q17;
    var q18 = req.body.q18;
    var q19 = req.body.q19;
    var q20 = req.body.q20;
    if(nome==""||q1==null||q2==null||q3==null||q4==null||q5==null||q6==null
    ||q7==null||q8==null||q9==null||q10==null||q11==null||q12==null||q13==null||q14==null||q15==null||q16==null||q17==null||q18==null||q19==null||q20==null ){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/historia");
    }else {
        Historia.create({
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
            q10: q10,
            q11: q11,
            q12: q12,
            q13: q13,
            q14: q14,
            q15: q15,
            q16: q16,
            q17: q17,
            q18: q18,
            q19: q19,
            q20: q20
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
                q10: q10,
                q11: q11,
                q12: q12,
                q13: q13,
                q14: q14,
                q15: q15,
                q16: q16,
                q17: q17,
                q18: q18,
                q19: q19,
                q20: q20
            });
        });
    }
});

//rota para envio do gabarito de geografia
app.post("/gabarito_geografia", (req, res) => {
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
        res.redirect("/geografia");
    }else {
        Geografia.create({
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
              res.render("confirmacao_geografia", {
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
app.post("/deletarhistoria", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Historia.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabarito_historia");
        });
    }
    
    });

//rota para apagar um registro da tabela de geografia
app.post("/deletargeografia", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Geografia.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabarito_geografia");
        });
    }
    
    });


//servidor
app.listen(1517, ()=>{
    console.log("Servidor Rodando na porta 1517");
});
