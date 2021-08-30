import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss']
})
export class ListaClienteComponent implements OnInit {

  public listaClientes: Array<Cliente> = [
  ];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getListaClientes();
  }

  getListaClientes() {
    this.clienteService.getListaCliente().subscribe( (result:any) => {
      this.listaClientes = result.listaClientes;
    });
  }

  onInativoChange(event) {
    this.clienteService.setClienteDisabled(event.target.id, event.target.checked).subscribe((result: any) => {
      console.log(result);
    });
  }

}
