import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() deleteEvent = new EventEmitter();
  @Output() alterarEvent = new EventEmitter();

  public countryList: Array<String>;

  public meuEnderecoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.countryList = listaPaises;
   }

  ngOnInit(): void {
    this.meuEnderecoForm = this.formBuilder.group({
      cep: [this.endereco.cep ?? '', [Validators.required]],
      numero: [this.endereco.numero ?? '', Validators.required],
      logradouro: [this.endereco.logradouro ?? '', Validators.required],
      complemento: [this.endereco.complemento ?? ''],
      bairro: [this.endereco.bairro ?? '', Validators.required],
      cidade: [this.endereco.cidade ?? '', Validators.required],
      uf: [this.endereco.uf ?? '', Validators.required],
      pais: [this.endereco.pais ?? 'Brasil', Validators.required],
      descricaoEndereco: [this.endereco.descricaoEndereco ?? '', Validators.required],
      tipoEndereco: [this.endereco.tipoEndereco ?? '', Validators.required]
    });
  }

  aplicaCssErro(field, form){  
    let touched = this[form].get(field).touched;
    let isValid = touched ? this[form].get(field).valid ? 'is-valid' : 'is-invalid' : '';
    return field ? isValid : '';
  }

  onDelete() {
    this.deleteEvent.emit(this.endereco?.id);
  }

  onAlterar() {
    this.alterarEvent.emit(this.endereco);
  }

}
