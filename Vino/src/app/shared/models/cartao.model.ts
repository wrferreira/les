export class Cartao {
    id: Number;
    titular: String;
    numero: String;
    cvv: String;
    bandeira: String;
    dataValidade: Date;

    constructor(id: Number, titular: String, numero: String, cvv: String, bandeira: String, dataValidade: Date) {
        this.id = id;
        this.titular = titular;
        this.numero = numero;
        this.cvv = cvv;
        this.bandeira = bandeira;
        this.dataValidade;
    }
}