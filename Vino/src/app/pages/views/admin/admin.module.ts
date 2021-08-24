import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';

@NgModule({
  declarations: [AdminComponent, ListaClienteComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
