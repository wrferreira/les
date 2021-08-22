import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public meuEnderecoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.countryList = listaPaises;
   }

  ngOnInit(): void {
    this.meuEnderecoForm = this.formBuilder.group({
      cep: ['', [Validators.required]],
      numero: ['', Validators.required],
      logradouro: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      pais: ['Brasil', Validators.required],
      descricaoEndereco: ['', Validators.required],
      tipoEndereco: ['', Validators.required]
    });
  }

  aplicaCssErro(field, form){  
    let touched = this[form].get(field).touched;
    let isValid = touched ? this[form].get(field).valid ? 'is-valid' : 'is-invalid' : '';
    return field ? isValid : '';
  }

}
