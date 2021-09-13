import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  public carrinho;

  constructor(
    private carrinhoService: CarrinhoService
  ) { }

 

  ngOnInit(): void {
    this.carrinhoService.getLista().subscribe( ret => {
      this.carrinho = ret;
    })
  }

  onSubmitPedido() {

  }
}
