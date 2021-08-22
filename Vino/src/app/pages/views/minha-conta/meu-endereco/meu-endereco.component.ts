import { Component, Input, OnInit } from '@angular/core';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { listaPaises } from 'src/app/shared/models/paises.model';

@Component({
  selector: 'app-meu-endereco',
  templateUrl: './meu-endereco.component.html',
  styleUrls: ['./meu-endereco.component.scss']
})
export class MeuEnderecoComponent implements OnInit {

  @Input('endereco') endereco: Endereco;
  public countryList: Array<String>;
  constructor() {
    this.countryList = listaPaises;
   }

  ngOnInit(): void {
  }

  aplicaCssErro(field, form){  
    let touched = this[form].get(field).touched;
    let isValid = touched ? this[form].get(field).valid ? 'is-valid' : 'is-invalid' : '';
    return field ? isValid : '';
  }

}
