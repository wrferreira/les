export class Endereco {
    id: number;
    logradouro: string;
    cep: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    pais: string;
    descricaoEndereco: string;
    tipoEndereco: string;

    constructor(id: number, descricaoEndereco: string, pais: string) {
        this.id = id;
        this.descricaoEndereco = descricaoEndereco;
        this.pais = pais;
    }
}