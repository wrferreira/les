import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhaContaRoutingModule } from './minha-conta-routing.module';
import { MinhaContaComponent } from './minha-conta.component';
import { MeuEnderecoComponent } from './meu-endereco/meu-endereco.component';
import { MeuCartaoComponent } from './meu-cartao/meu-cartao.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmacaoDialog } from 'src/app/shared/dialogs/confirm/confirmacao-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    MinhaContaComponent, 
    MeuEnderecoComponent, 
    MeuCartaoComponent, 
    AlterarSenhaComponent,
    ConfirmacaoDialog
  ],
  imports: [
    CommonModule,
    MinhaContaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(),
  ]
})
export class MinhaContaModule { }
