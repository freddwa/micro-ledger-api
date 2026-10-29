import crypto from 'node:crypto';
import AppError from '../errors/AppError.js'
import {salvar, buscarPorId, listarTodas} from '../repositories/contaRepository.js'
import {buscarPorContaId, buscarPorId as buscarTransacaoPorId} from "../repositories/transacaoRepository.js"
import {registrarTransacao} from "./transacaoService.js"

class Conta {
    constructor (dono) {
    this.dono = dono;
    this.saldo = 0;
    this.id = crypto.randomUUID();
}
}

function criarConta(dono) {
    if (typeof dono !== "string" || dono.trim() === "") {
        throw new AppError("Dono é obrigatorio", 400)
    }

    const conta = new Conta(dono)
    salvar(conta)
    return conta
}


function depositar(id, valor) {
    const conta = buscarPorId(id);
    if (!conta) {
        throw new AppError("conta nao encontrada", 404);
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        throw new AppError("valor invalido", 400);
    }

    conta.saldo = conta.saldo + valor
    salvar(conta)
    registrarTransacao(id, "deposito", valor)
    return conta
}


function sacar(id, valor) {
    const conta = buscarPorId(id);
    if (!conta) {
        throw new AppError("conta nao encontrada", 404);
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        throw new AppError("valor invalido", 400);
    }

    if (valor > conta.saldo) {
        throw new AppError("saldo insuficiente", 400)
    }

    conta.saldo = conta.saldo - valor
    salvar(conta)
    registrarTransacao(id, "saque", valor)
    return conta
}

function estornar(transacaoId) {
  const transacao = buscarTransacaoPorId(transacaoId);
  if (!transacao) {
    throw new AppError("transacao nao encontrada", 404);
  }

  const conta = buscarPorId(transacao.contaId);

  if (transacao.tipo === "deposito") {
    conta.saldo = conta.saldo - transacao.valor;
  } else {
    conta.saldo = conta.saldo + transacao.valor;
  }

  salvar(conta)
  return conta      
}

function listarContas () {
    return listarTodas()
}


function transferir (origemId, destinoId, valor) {
    if (origemId === destinoId) {
        throw new AppError("origem e destino devem ser diferentes", 400)
    }

    if (!buscarPorId(destinoId)) {
        throw new AppError("conta de destino nao encontrada", 404)
    }

    const origem = sacar(origemId, valor)
    const destino = depositar(destinoId, valor)
    return { origem, destino }
}

export {Conta, criarConta, depositar, sacar, estornar, buscarPorContaId, listarContas, transferir}


