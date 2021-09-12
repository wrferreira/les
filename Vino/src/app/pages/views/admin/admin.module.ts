import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CuponsComponent } from './cupons/cupons.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarProdutoComponent } from './pedidos/listar-produto/listar-produto.component';
import { CadastrarCupomComponent } from './cupons/cadastrar-cupom/cadastrar-cupom.component';

@NgModule({
  declarations: [AdminComponent, ListaClienteComponent, DashboardComponent, CuponsComponent, ConfiguracoesComponent, PedidosComponent, ListarProdutoComponent, CadastrarCupomComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule
  ]
})
export class AdminModule { }
