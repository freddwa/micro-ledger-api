import { criarConta, depositar, sacar, estornar, buscarPorContaId} from "../src/services/contaService.js";
import { buscarPorId} from "../src/repositories/contaRepository.js";
import test from 'node:test';
import assert from 'node:assert'

test("deve ficar com saldo 100 depois de depositar 100", () => {
    const conta = criarConta("Fred")
    depositar(conta.id, 100);
    const contaAtualizada = buscarPorId(conta.id);
    assert.strictEqual(contaAtualizada.saldo, 100);
});







test("deve lançar erro ao depositar em conta inexistente", () => {
    assert.throws(
        () => depositar("id-inexistente", 100),
            { message: "conta nao encontrada", statusCode: 404 }
    )
});

test("deve lançar erro ao depositar valor negativo", () => {
    const conta = criarConta("Fred")
    assert.throws(
        () => depositar(conta.id, -100),
        { message: "valor invalido", statusCode: 400 }
    )
});

test("deve lançar erro ao sacar em conta inexistente", () => {
    assert.throws(
        () => sacar("id-inexistente", 100),
        { message: "conta nao encontrada", statusCode: 404 }
    )
});

test("deve lançar erro ao sacar valor negativo", () => {
    const conta = criarConta("Fred")
    assert.throws(
        () => sacar(conta.id, -100),
        { message: "valor invalido", statusCode: 400 }
    )
});


test("deve lançar erro ao sacar mais do que o saldo", () => {
    const conta = criarConta("Fred")
    assert.throws(
        () => sacar(conta.id, 100),
        { message: "saldo insuficiente", statusCode: 400 }
    )
});

test("deve ficar com saldo 70 depois de sacar 30 de 100", () => {
    const conta = criarConta("Fred")
    depositar(conta.id, 100);
    sacar(conta.id, 30);
    const contaAtualizada = buscarPorId(conta.id);
    assert.strictEqual(contaAtualizada.saldo, 70);
});


test("deve voltar o saldo a 0 depois de estornar um depósito de 100", () => {
    const conta = criarConta("Fred")
    depositar(conta.id, 100);
    const transacoes = buscarPorContaId(conta.id);
    estornar(transacoes[0].id);
    const contaAtualizada = buscarPorId(conta.id);
    assert.strictEqual(contaAtualizada.saldo, 0);
});


test("deve lançar erro ao depositar valor zero", () => {
    const conta = criarConta("Fred")
    assert.throws(
        () => depositar(conta.id, 0),
        { message: "valor invalido", statusCode: 400 }
    )
});



test("deve lançar erro ao depositar valor que não é número", () => {
    const conta = criarConta("Fred")
    assert.throws(
        () => depositar(conta.id, "abc"),
        { message: "valor invalido", statusCode: 400 }
    )
});

test("deve lançar erro ao sacar valor que não é número", () => {
    const conta = criarConta("Fred")
    assert.throws(
        () => sacar(conta.id, "abc"),
        { message: "valor invalido", statusCode: 400 }
    )
});


test("deve lançar erro ao criar conta com dono que não é texto", () => {
    assert.throws(
        () => criarConta(123),
        { message: "Dono é obrigatorio", statusCode: 400 }
    )
});

test("deve lançar erro ao criar conta com dono só com espaços", () => {
    assert.throws(
        () => criarConta("   "),
        { message: "Dono é obrigatorio", statusCode: 400 }
    )
});