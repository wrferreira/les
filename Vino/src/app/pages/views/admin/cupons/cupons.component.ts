import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Cupom from 'src/app/shared/models/cupom.model';
import { CadastrarCupomComponent } from './cadastrar-cupom/cadastrar-cupom.component';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.scss']
})
export class CuponsComponent implements OnInit {

  public listaCupons: Array<Cupom> = [];

  constructor(private modalService: NgbModal) { }

  displayedColumns: string[] = ['id', 'codigo', 'valorDesconto', 'tipoCupom', 'ativo', 'excluir'];
  dataSource: MatTableDataSource<Cupom>;

  ngOnInit(): void {
    this.listaCupons.push(
      {
        id: 1,
        codigo: "VINO2021",
        tipoCupom: 'Primeira Compra',
        ativo: true,
        valorDesconto: 20.0
      }
    );

    this.dataSource = new MatTableDataSource(this.listaCupons);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  showCadastroModal() {
    const modalRef = this.modalService.open(CadastrarCupomComponent);
    // modalRef.componentInstance.produtosLista = produtosLista;
    // console.log(modalRef.componentInstance);
  }

}
