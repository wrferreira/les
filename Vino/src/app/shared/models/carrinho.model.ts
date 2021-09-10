export class Carrinho {    
    id: number;
    imagem: string;    
    precoPor: number;
    qtd: number;       
    titulo: string;

    constructor(id: number, imagem: string, precoPor: number, qtd: number, titulo: string) {
        this.id = id;        
        this.imagem = imagem;
        this.precoPor = precoPor;
        this.qtd = qtd;
        this.titulo = titulo;
    }
}