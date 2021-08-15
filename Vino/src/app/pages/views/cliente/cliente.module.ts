import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';

import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { EnderecoComponent } from '../endereco/endereco.component';

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
    NgxMaskModule.forRoot(),
  ]
})
export class ClienteModule { }
