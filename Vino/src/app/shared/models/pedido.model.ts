import { Cliente } from "./cliente.model";
import { Produto } from "./produtos.model";

export enum StatusPedido {
    EM_PROCESSAMENTO,
    PAGAMENTO_REALIZADO,
    EM_TRANSPORTE,
    TROCA_SOLICITADA,
    TROCA_ACEITA,
    TROCA_AUTORIZADA,
    TROCA_EFETUADA,
    TROCA_REJEITADA,
    CANCELAMENTO_ACEITO,
    CANCELAMENTO_EFETUADO,
    CANCELAMENTO_SOLICITADO,
    CANCELAMENTO_REJEITADO,
}

export let StatusPedidoNome = {
    0: 'Em Processamento',
    1: 'Pagamento Realizado',
    2: 'Em Transporte',
    3: 'Troca Solicitada',
    4: 'Troca Aceita',
    5: 'Troca Autorizada',
    6: 'Troca Efetuada',
    7: 'Troca Rejeitada',
    8: 'Cancelamento Aceito',
    9: 'Cancelamento Efetuado',
    10: 'Cancelamento Solicitado',
    11: 'Cancelamento Rejeitado'
};

export class Pedido {
    valorTotal?: number;
    valorFrete?: number;
    id?: number;
    status?: StatusPedido;
    cliente?: Cliente;
    // cupom?: Cupom;
    // pagamento?: Pagamento;
    dataPedido?: Date;
    produtos?: Array<Produto>;
}