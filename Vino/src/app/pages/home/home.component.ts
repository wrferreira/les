import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public dadosCliente:Cliente;
  public isLogado = false;

  constructor(
    private route: Router
  ) {
    this.dadosCliente = this.route.getCurrentNavigation().extras.state as Cliente;
  }

  ngOnInit(): void {
    console.log(this.dadosCliente);
    console.log(this.isLogado);

    if(this.dadosCliente?.nome != '' && this.dadosCliente?.nome){
      console.log(this.dadosCliente?.nome)
      console.log('logado')
      this.isLogado = true;
    }

    this.route.navigate(['/home/produto']);
  }
}
