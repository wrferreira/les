import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { countryList } from 'src/app/shared/models/country.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ClienteComponent implements OnInit {

  public cadastroForm: FormGroup;
  public dadosForm: FormGroup;
  public enderecoForm: FormGroup;
  public countryList: Array<String>;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { 
    this.countryList = countryList;
  }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmaSenha: ['', Validators.required]
    })

    this.dadosForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      sexo: ['0', Validators.required]
    })

    this.enderecoForm = this.formBuilder.group({
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      endereco: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      pais: ['Brasil', Validators.required],

    });
    console.log(this.dadosForm.controls)
  }

  verificaValidTouched(field, form){
    if(form == 'cadastro'){
      if(this.cadastroForm.get(field).touched){
        return this.cadastroForm.get(field).valid ? 'is-valid' : 'is-invalid';      
      }
    }
    if(form == 'step2'){
      if(this.dadosForm.get(field).touched){
        return this.dadosForm.get(field).valid ? 'is-valid' : 'is-invalid';      
      }
    }
    return '';
  }

  aplicaCssErro(field, form){    
    return field ? this.verificaValidTouched(field, form) : '';
  }

  verificarErro(field){
    const listErros = this.cadastroForm.get(field).errors;
    if(listErros){
      if(listErros['required']){
        return listErros['required'] ? 'Senha obrigatória' : '';
      }
      if(listErros['pattern']){
        return listErros['pattern'] ? 'Senha inválida' : '';
      }
    }
  }

  onCEPChange() {
    let cep = this.enderecoForm.get('cep');
    console.log(cep.errors);
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

  onPasswordChange() {
    if (this.cadastroForm.get('senha').value === this.cadastroForm.get('confirmaSenha').value) {
      this.cadastroForm.get('confirmaSenha').setErrors(null);
    } else {
      this.cadastroForm.get('confirmaSenha').setErrors({ mismatch: true });      
    }
  }
}
