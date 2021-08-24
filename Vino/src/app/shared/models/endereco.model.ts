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

    constructor(id: number, descricaoEndereco: string, pais: string, logradouro?: string, cep?: string, numero?: string, complemento?: string,
                bairro?: string, cidade?: string, uf?: string, tipoEndereco?: string
        ) {
        this.id = id;
        this.descricaoEndereco = descricaoEndereco;
        this.pais = pais;
        this.logradouro = logradouro;
        this.cep = cep;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.tipoEndereco = tipoEndereco;
    }
}