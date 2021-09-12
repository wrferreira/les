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