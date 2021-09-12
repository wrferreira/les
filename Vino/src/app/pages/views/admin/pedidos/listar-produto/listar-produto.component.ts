import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'src/app/shared/models/produtos.model';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.scss']
})
export class ListarProdutoComponent implements OnInit {

  @Input() produtosLista: Array<Produto>;

  constructor() { }

  ngOnInit(): void {
  }

}
