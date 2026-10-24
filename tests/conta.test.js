import { criarConta, depositar} from "../src/services/contaService.js";
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
    assert.throws(() => depositar("id-inexistente", 100))

    
    

});