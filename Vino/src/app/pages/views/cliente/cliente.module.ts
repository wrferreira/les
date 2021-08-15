import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';

import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ClienteComponent],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
    MatStepperModule,
  ]
})
export class ClienteModule { }
