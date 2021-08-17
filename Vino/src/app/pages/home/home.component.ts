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
  private storage;

  constructor(    
  ) {
    this.storage = window.localStorage;
  }
  
  ngOnInit(): void {}

  componentRemoved(event){    
    if(event.clienteComponent){
      this.logado = true;
      this.dadosCliente = event.cliente;

      this.storage.setItem('cliente', JSON.stringify(event.cliente));
    }
  }
}
