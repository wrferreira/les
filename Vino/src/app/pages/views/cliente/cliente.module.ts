import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { EnderecoComponent } from '../endereco/endereco.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ClienteComponent,
    EnderecoComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    MatStepperModule,
    MatIconModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ClienteModule { }
