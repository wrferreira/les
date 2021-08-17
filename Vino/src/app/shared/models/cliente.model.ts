import { Endereco } from "./endereco.model";

export class Cliente {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    confirmaSenha: string;       
    tipoTelefone: string;    
    telefone: string;
    sexo: string;
    endereco: Endereco[];
}