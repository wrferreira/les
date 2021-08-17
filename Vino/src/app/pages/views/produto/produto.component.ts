import { Component, OnInit } from '@angular/core';
import { listaProdutos } from 'src/app/shared/models/produtos.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  public produtos = listaProdutos;

  constructor() { }

  ngOnInit(): void {
  }

}
