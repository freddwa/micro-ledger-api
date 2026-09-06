import  crypto from "node:crypto";
import {buscarPorContaId, salvar} from "../repositories/transacaoRepository.js"
class Transacao {
    constructor (contaId, tipo, valor) {
        this.contaId = contaId;
        this.tipo = tipo;
        this.valor = valor;
        this.id = crypto.randomUUID();
        this.data = new Date();
    }
}

function registrarTransacao(contaId, tipo, valor){

const transacao = new Transacao (contaId, tipo, valor)
salvar (transacao)
return transacao

}

export {Transacao, registrarTransacao}

