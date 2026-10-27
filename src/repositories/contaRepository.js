const contas = new Map(); 

function salvar (conta) {
        contas.set(conta.id, conta)
}

function buscarPorId (id) {
    return contas.get(id)

}

function listarTodas () {
    return Array.from(contas.values())
}

export { salvar, buscarPorId, listarTodas };  