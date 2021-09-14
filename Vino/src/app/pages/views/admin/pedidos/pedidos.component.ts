import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Pedido, StatusPedido, StatusPedidoNome } from 'src/app/shared/models/pedido.model';
import { listaProdutos, Produto } from 'src/app/shared/models/produtos.model';
import { ListarProdutoComponent } from './listar-produto/listar-produto.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  public listaPedidos: Array<Pedido> = [];

  displayedColumns: string[] = ['id', 'cliente', 'status', 'valorTotal', 'dataPedido', 'acao'];
  dataSource: MatTableDataSource<Pedido>;
  ngOnInit(): void {

    this.listaPedidos.push({
      id: 1,
      cliente: {nome: 'Alexandre'},
      status: StatusPedido.EM_PROCESSAMENTO, 
      valorFrete: 20, 
      valorTotal: 40, 
      dataPedido: new Date(),
      produtos: listaProdutos
    });

    this.dataSource = new MatTableDataSource(this.listaPedidos);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListaStatus() {
    const StringIsNumber = value => isNaN(Number(value)) === false;
    return Object.keys(StatusPedido)
        .filter(StringIsNumber)
        .map(key => StatusPedido[key]);
  }

  getStatusNome(status: number) {
    return StatusPedidoNome[status];
  }

  getNomeProdutos(produtosLista: Array<Produto>) {
    return produtosLista.map(p => p.titulo).reduce((p, n) => `${p}, ${n}`);
  }

  showProdutoLista(produtosLista) {    
   const modalRef = this.modalService.open(ListarProdutoComponent);
   modalRef.componentInstance.produtosLista = produtosLista;
   console.log(modalRef.componentInstance);
  }
}
