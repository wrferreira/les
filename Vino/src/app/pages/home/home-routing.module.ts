import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: 'cadastro', loadChildren: () => import('../views/cliente/cliente.module').then( m => m.ClienteModule) }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
