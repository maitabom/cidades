var Estado = function () {
    this.sigla = '';
    this.cidades = [];
}

Estado.prototype.sort = function () {
    this.cidades.sort(function (a, b) {
        if (a.nome > b.nome) return 1;
        if (a.nome < b.nome) return -1;
        return 0;
    });
}

var Cidade = function () {
    this.nome = '';
    this.valor = 0;
}

var ColecaoCidades = function () {
    this.estados = [];
};

ColecaoCidades.prototype.adicionarCidade = function (sigla, cidade) {
    var uf = this.estados.find(u => u.sigla == sigla);

    if (uf == undefined) {
        uf = new Estado();
        uf.sigla = sigla;
        uf.cidades.push(cidade);

        this.estados.push(uf);
    } else {
        uf.cidades.push(cidade);
    }
}

ColecaoCidades.prototype.sort = function (recursive = true) {
    this.estados.sort(function (a, b) {
        if (a.sigla > b.sigla) return 1;
        if (a.sigla < b.sigla) return -1;
        return 0;
    });

    if (recursive) {
        this.estados.forEach(function (e) {
            e.sort();
        });
    }
}

ColecaoCidades.prototype.save = function () {
    window.sessionStorage.setItem('data', JSON.stringify(this.estados));
}

ColecaoCidades.prototype.dataBind = function(){
    this.estados = JSON.parse(window.sessionStorage.getItem('data'));
}