import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public endereco: FormGroup;
  public teste;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmaSenha: ['', Validators.required]
    })

    this.dadosForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      tipoTelefone: ['0', Validators.required],
      telefone: ['', Validators.required],
      sexo: ['0', Validators.required]
    });
    
    console.log(this.dadosForm.controls)
  }

  verificaValidTouched(field, form){    
    if(form == 'cadastroForm'){
      if(this.cadastroForm.get(field).touched){
        return this.cadastroForm.get(field).valid ? 'is-valid' : 'is-invalid';      
      }
    }
    if(form == 'dadosForm'){
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
  
  onPasswordChange() {
    if (this.cadastroForm.get('senha').value === this.cadastroForm.get('confirmaSenha').value) {
      this.cadastroForm.get('confirmaSenha').setErrors(null);
    } else {
      this.cadastroForm.get('confirmaSenha').setErrors({ mismatch: true });      
    }
  }

  getDadosEndereco(event){
    console.log(event)
    this.endereco = event;
  }
}
