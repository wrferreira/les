import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { listaProdutos } from 'src/app/shared/models/produtos.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Carrinho } from 'src/app/shared/models/carrinho.model';
import { NavigationExtras, Router } from '@angular/router';
import { CarrinhoService } from '../carrinho/carrinho.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  public produtos = listaProdutos;
  public closeModal: string;
  public listaCompras: Carrinho[] = [];
  public valorTotal: number;
  
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) { }

  @ViewChild('modalData') modalData: TemplateRef<any>;
  ngOnInit(): void {
  }

  showCarrinho(content) {    
    this.modalService.open(content);
  }

  addCarrinho(item){
    let existsItem = this.listaCompras.filter(i => i.id === item.id)[0];
    if(existsItem){
      existsItem.qtd++;
    }else{
      this.listaCompras.push(new Carrinho(item.id, item.imagem, item.precoPor, 1, item.titulo));
    }

    this.updateValorTotal();
    this.showCarrinho(this.modalData);
  }

  removeCarrinho(item){
    this.listaCompras.splice(this.listaCompras.findIndex(i => i.id === item.id), 1);
    if(!this.listaCompras.length){
      this.modalService.dismissAll();
    }
  }

  updateQtd(item, valor){
    this.listaCompras.filter(i => i.id === item.id)[0].qtd += valor;    
    this.updateValorTotal();
  }

  updateValorTotal(){
    this.valorTotal = this.listaCompras.reduce((acc, item) => { return acc + (item.precoPor * item.qtd) }, 0);
  }
 
  goParaPagamento(){    
    this.modalService.dismissAll();
    this.carrinhoService.setLista(this.listaCompras);
    this.router.navigate(['home/carrinho']);    
  }
}
