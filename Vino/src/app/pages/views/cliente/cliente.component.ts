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
      telefone: ['', Validators.required],
      sexo: ['0', Validators.required]
    });
    
    console.log(this.dadosForm.controls)
  }

  aplicaCssErro(field, form){  
    let touched = this[form].get(field).touched;
    let isValid = touched ? this[form].get(field).valid ? 'is-valid' : 'is-invalid' : '';
    return field ? isValid : '';
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
    this.endereco = event;
  }
}
