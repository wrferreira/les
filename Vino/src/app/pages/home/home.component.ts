import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public dadosCliente: Cliente;
  public logado = false;
  storage: Storage;

  constructor(private clienteService: ClienteService) {
    this.storage = window.localStorage;
  }
  
  ngOnInit(): void {
    this.carregarUsuario();
  }

  carregarUsuario() {
    if(this.storage.getItem('clienteId')) {
      this.logado = true;
      let id = parseInt(JSON.parse(this.storage.getItem('clienteId'))[0]);
      this.clienteService.getCliente(id).subscribe((result: any) => {
        this.dadosCliente = result.cliente;
      });
    }
  }

  componentRemoved(event){
    console.log(event);
    if(event.clienteComponent && event.cadastroForm?.valid){
      this.logado = true;
      this.dadosCliente = event.cliente;
    }
    if(event.loginForm) {
      this.carregarUsuario();
    }
  }

  onLogout(){
    this.logado = false;
    this.storage.clear();
  }
}
