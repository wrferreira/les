import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [  
  { 
    path: '',
    component: HomeComponent,
    children: [
      { path: '', loadChildren: () => import('../views/produto/produto.module').then( m => m.ProdutoModule) },
      { path: 'cadastro', loadChildren: () => import('../views/cliente/cliente.module').then( m => m.ClienteModule) },
      { path: 'perfil', loadChildren: () => import('../views/perfil/perfil.module').then( m => m.PerfilModule) }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
