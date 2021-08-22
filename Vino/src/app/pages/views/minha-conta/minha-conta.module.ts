import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhaContaRoutingModule } from './minha-conta-routing.module';
import { MinhaContaComponent } from './minha-conta.component';
import { MeuEnderecoComponent } from './meu-endereco/meu-endereco.component';
import { MeuCartaoComponent } from './meu-cartao/meu-cartao.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [MinhaContaComponent, MeuEnderecoComponent, MeuCartaoComponent, AlterarSenhaComponent],
  imports: [
    CommonModule,
    MinhaContaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class MinhaContaModule { }
