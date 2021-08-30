import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public dadosCliente: Cliente;
  public logado = false;

  constructor(    
  ) {
  }
  
  ngOnInit(): void {}

  componentRemoved(event){
    console.log(event)
    if(event.clienteComponent && event.cadastroForm?.valid){
      this.logado = true;
      this.dadosCliente = event.cliente;
    }
  }

  onLogout(){
    this.logado = false;
  }
}
