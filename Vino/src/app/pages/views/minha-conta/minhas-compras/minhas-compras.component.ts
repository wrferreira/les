import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.scss']
})
export class MinhasComprasComponent implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['id', 'nome', 'preco', 'qtd', 'data'];
  dataSource = new MatTableDataSource<Produto>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  qtd: number;
  data: string;
}

const ELEMENT_DATA: Produto[] = [
  {id: 1, nome: 'Cruz Del Sur Malbec', preco: 100.0, qtd: 2, data: "31/08/2021"},
  {id: 2, nome: 'El Bravo', preco: 42.0, qtd: 1, data: "31/08/2021"},
  {id: 3, nome: 'Fonte Serrana', preco: 150.0, qtd: 1, data: "31/08/2021"},
  {id: 4, nome: 'Sangue de Boi', preco: 89.99, qtd: 2, data: "31/08/2021"},
];