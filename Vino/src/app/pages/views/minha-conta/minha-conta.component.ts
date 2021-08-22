import { Component, OnInit } from '@angular/core';
import { Cartao } from 'src/app/shared/models/cartao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

  private storage;
  public dadosCliente: Cliente;
  public listaCartoes: Array<Cartao> = [
    new Cartao(0, 'ALEXANDRE L CUNHA', '5186 6193 8671 2238', '212', 'mastercard', new Date('Fri Dec 08 2032 07:44:57')),
    new Cartao(0, 'ALEXANDRE L CUNHA', '5371 6958 9184 6294', '121', 'mastercard', new Date('Fri Dec 08 2032 07:44:57')),
  ];

  public sexoLista = {
    M: 'Masculino',
    F: 'Feminino',
    O: 'Prefiro não informar'
  }

  public bandeiras = {
    mastercard: 'Master Card',
    visa: 'Visa'
  }

  constructor() {
    this.storage = window.localStorage;
   }

  ngOnInit(): void {
    let cliente = JSON.parse(this.storage.getItem('cliente'));    
    this.dadosCliente = cliente;
  }

  addEndereco(){
    this.dadosCliente.endereco.push(new Endereco);
  }
} 
