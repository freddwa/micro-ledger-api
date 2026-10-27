import {criarConta, depositar, sacar, estornar, buscarPorContaId, listarContas} from "../services/contaService.js"

function criarContaController (req, res) {

    let corpo = "";

    req.on("data", (pedaco) => {
      corpo += pedaco;
    });

    req.on("end", () => {
  try {
    const dados = JSON.parse(corpo);
    const conta = criarConta(dados.dono);
    res.end(JSON.stringify(conta));
  } catch (erro) {
    res.statusCode = erro.statusCode || 500;
    res.end(JSON.stringify({ erro: erro.message }));
  }
});
}


function depositarController (req, res) {

    let corpo = "";
    req.on("data", (pedaco) => {
    corpo += pedaco;
});
    
    req.on("end", () => {
      try {
        const dados = JSON.parse(corpo);
        const conta = depositar(dados.id, dados.valor);
        res.end(JSON.stringify(conta));
      } catch (erro) {
        res.statusCode = erro.statusCode || 500;
        res.end(JSON.stringify({ erro: erro.message}));
      }
    });
}

function sacarController (req, res) {

    let corpo = "";
    req.on("data", (pedaco) => {
    corpo += pedaco;
});

req.on("end", () => {
  try {
    const dados =JSON.parse(corpo);
    const conta = sacar(dados.id, dados.valor);
    res.end(JSON.stringify(conta));
  } catch (erro) { 
    res.statusCode = erro.statusCode || 500;
    res.end(JSON.stringify({erro: erro.message}));
  }
    });
}

function estornarController ( req, res) {

    let corpo = "";
    req.on("data", (pedaco) => {
    corpo += pedaco;
});
    
    
    req.on("end", () => {
      try {
        const dados =JSON.parse(corpo);
        const conta = estornar(dados.transacaoId);
        res.end(JSON.stringify(conta));
      } catch (erro) {
        res.statusCode = erro.statusCode || 500;
        res.end(JSON.stringify({erro: erro.message}));
      }
    });

}

function extratoController (req, res) {

    try {
        const url = new URL(req.url, "http://localhost:3000");
        const id = url.searchParams.get("id");
        const extrato = buscarPorContaId(id);
        res.end(JSON.stringify(extrato));
      } catch (erro) {
        res.statusCode = erro.statusCode || 500;
        res.end(JSON.stringify({ erro: erro.message }));
      }
}

function listarContasController (req, res) {
    try {
        const contas = listarContas();
        res.end(JSON.stringify(contas));
    } catch (erro) {
        res.statusCode = erro.statusCode || 500;
        res.end(JSON.stringify({ erro: erro.message }));
    }
}
    
export {criarContaController, depositarController, sacarController, estornarController, extratoController, listarContasController}
