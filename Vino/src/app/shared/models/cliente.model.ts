import { Cartao } from "./cartao.model";
import { Endereco } from "./endereco.model";

export class Cliente {    
    nome: string;
    dataNasc: string;
    cpf: string;
    email: string;
    senha: string;
    confirmaSenha: string;       
    tipoTelefone: string;    
    telefone: string;
    sexo: string;
    endereco: Endereco[];
    cartao: Cartao[];
}