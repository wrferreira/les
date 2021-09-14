import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.scss']
})
export class MinhasComprasComponent implements OnInit, AfterViewInit {
  
  public itensCompra = [];

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['numeroPedido', 'status', 'valorTotal', 'data', 'metodoPagamento', 'cupom', 'acao'];
  dataSource = new MatTableDataSource<Compra>(ELEMENT_DATA_COMPRA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  showDetalheCompra(content, idCompra){    
    this.itensCompra = ELEMENT_DATA.filter( compra => compra.numeroPedido == idCompra);
    console.log(this.itensCompra)
    this.modalService.open(content, {
      windowClass: 'modal-produtos'
    })
  }

  setTrocaProduto(){
    this.modalService.dismissAll();
  }
}

export interface Compra {
  id: number;
  numeroPedido: string;
  status: string;
  valorTotal: number;  
  data: string;
  metodoPagamento: string;
  cupom: number;
}

export interface Produto {
  id: number;
  numeroPedido: string;
  nome: string;
  status: string;
  preco: number;
  qtd: number;
  data: string;
}

const ELEMENT_DATA_COMPRA: Compra[] = [
  {id: 1, numeroPedido: '03498642', status: 'concluído',   valorTotal: 292.0, data: "31/08/2021", metodoPagamento: "Cartão de Crédito", cupom: 30},
  {id: 2, numeroPedido: '04323932', status: 'em trânsito', valorTotal: 89.99, data: "10/09/2021", metodoPagamento: "Boleto bancário",   cupom: 25},
];

const ELEMENT_DATA: Produto[] = [
  {id: 1, numeroPedido:'03498642',  nome: 'Cruz Del Sur Malbec', status: 'concluído', preco: 100.0, qtd: 2, data: "31/08/2021"},
  {id: 2, numeroPedido:'03498642',  nome: 'El Bravo',            status: 'em processamento', preco: 42.0, qtd: 1, data: "31/08/2021"},
  {id: 3, numeroPedido:'03498642',  nome: 'Fonte Serrana',       status: 'em trânsito', preco: 150.0, qtd: 1, data: "31/08/2021"},
  {id: 4, numeroPedido:'04323932',  nome: 'Sangue de Boi',       status: 'concluído', preco: 89.99, qtd: 2, data: "31/08/2021"},
];