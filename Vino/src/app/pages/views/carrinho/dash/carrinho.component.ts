import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {
  
  constructor(
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.getListaCarrinho();  
  }

  getListaCarrinho(){
    this.carrinhoService.getLista().subscribe( lista => {
      console.log(lista)
    });
  }
}
