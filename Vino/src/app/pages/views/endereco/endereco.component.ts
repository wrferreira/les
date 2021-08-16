import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { countryList } from 'src/app/shared/models/country.model';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit, OnChanges {

  @Output() dadosEndereco = new EventEmitter();
  @Input() resetEndereco = 0;
  @Input() loadData;
  public enderecoForm: FormGroup;
  public countryList: Array<String>;
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { }  

  ngOnInit(): void {
    this.loadForm();
  }

  ngOnChanges(){    
    if(this.resetEndereco){      
      this.resetForm();
    }
    if(this.loadData){
      this.enderecoForm.patchValue({
        cep: this.loadData.cep,
        numero: this.loadData.numero,
        endereco: this.loadData.endereco,
        complemento: this.loadData.complemento,
        bairro: this.loadData.bairro,
        cidade: this.loadData.cidade,
        uf: this.loadData.uf,
        pais: this.loadData.pais,
        descricaoEndereco: this.loadData.descricaoEndereco,
        tipoEndereco: this.loadData.tipoEndereco
      });
    }
    
  }

  loadForm(){
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

  resetForm(){    
    if(this.enderecoForm){
      this.enderecoForm.reset();
      this.loadForm();
    }
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
