import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { countryList } from 'src/app/shared/models/country.model';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Output() dadosEndereco = new EventEmitter();
  public enderecoForm: FormGroup;
  public countryList: Array<String>;
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { }  

  ngOnInit(): void {
    this.countryList = countryList;

    this.enderecoForm = this.formBuilder.group({
      cep: ['', [Validators.required]],
      numero: ['', Validators.required],
      endereco: ['', Validators.required],
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

  verificarErro(field){
    const listErros = this.enderecoForm.get(field).errors;
    if(listErros){
      if(listErros['required']){
        return listErros['required'] ? 'CEP obrigatório' : '';
      }
      if(listErros['pattern']){
        return listErros['pattern'] ? 'CEP inválido' : '';
      }
    }
  }

  onCEPChange() {
    let cep = this.enderecoForm.get('cep');
    if(cep.valid) {
      this.clienteService.getViaCep(cep.value.toString().replace('-','')).subscribe((dados) => {
        this.enderecoForm.get('endereco').setValue(dados['logradouro']);
        this.enderecoForm.get('cidade').setValue(dados['localidade']);
        this.enderecoForm.get('bairro').setValue(dados['bairro']);
        this.enderecoForm.get('complemento').setValue(dados['complemento']);
        this.enderecoForm.get('uf').setValue(dados['uf']);
      });
    }
  }

  onChange(){
    this.dadosEndereco.emit(this.enderecoForm);
  }  
}
