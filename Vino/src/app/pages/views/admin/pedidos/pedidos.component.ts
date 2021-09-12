import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Pedido, StatusPedido } from 'src/app/shared/models/pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor() { }

  public listaPedidos: Array<Pedido> = [
  ];

  displayedColumns: string[] = ['id', 'clienteNome'];
  dataSource: MatTableDataSource<Pedido>;

  ngOnInit(): void {
    let cli: Cliente = {nome: 'Alexandre', cpf: '479.824.918-12'};
    this.listaPedidos.push({id: 1,cliente: cli, status: StatusPedido.EM_PROCESSAMENTO, valorFrete: 20, valorTotal: 40})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
