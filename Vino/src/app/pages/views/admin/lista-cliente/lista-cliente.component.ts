import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss']
})
export class ListaClienteComponent implements OnInit {

  public listaClientes: Array<Cliente> = [
  ];

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.listaClientes.push(JSON.parse(localStorage.getItem('cliente')) as Cliente);
  }

}
