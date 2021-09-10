import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrinhoRoutingModule } from './carrinho-routing.module';
import { CarrinhoComponent } from './dash/carrinho.component';


@NgModule({
  declarations: [CarrinhoComponent],
  imports: [
    CommonModule,
    CarrinhoRoutingModule
  ]
})
export class CarrinhoModule { }
