import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  private storage;
  public dadosCliente;

  constructor() {
    this.storage = window.localStorage;
   }

  ngOnInit(): void {
    let cliente = JSON.parse(this.storage.getItem('cliente'));    
    this.dadosCliente = cliente;
    console.log(this.dadosCliente)
  }
} 
