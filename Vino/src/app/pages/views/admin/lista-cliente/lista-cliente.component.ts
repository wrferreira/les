import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  ELEMENT_DATA = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  displayedColumns: string[] = ['index', 'nome', 'email', 'telefone', 'dataNasc', 'inativado', 'classificacao'];
  dataSource: MatTableDataSource<Cliente>;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getListaClientes();
  }

  getListaClientes() {
    this.clienteService.getListaCliente().subscribe( (result:any) => {
      result.listaClientes.forEach((cliente) => {
        let dataTratada = new RegExp(/\d{4}-\d{2}-\d{2}/).exec(cliente.dataNasc)[0].split('-');
        cliente.dataNasc = `${dataTratada[2]}/${dataTratada[1]}/${dataTratada[0]}`;
      });

      this.listaClientes = result.listaClientes;

      this.dataSource = new MatTableDataSource(this.listaClientes);
    });
  }

  onInativoChange(event) {
    this.clienteService.setClienteDisabled(event.target.id, event.target.checked).subscribe((result: any) => {
      let index = this.listaClientes.findIndex((cliente) => cliente?.id == event.target.id);
      this.listaClientes[index].inativado = event.target.checked;
      
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
