import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ClienteComponent implements OnInit {

  public step1Form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.step1Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmaSenha: ['', Validators.required]
    })
  }

  verificaValidTouched(field){
    if(this.step1Form.get(field).touched){
      return this.step1Form.get(field).valid ? 'is-valid' : 'is-invalid';      
    }
    return '';
  }

  aplicaCssErro(field){
    return this.verificaValidTouched(field);
  }

  verificarErro(field){
    const listErros = this.step1Form.get(field).errors;
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
    if (this.step1Form.get('senha').value === this.step1Form.get('confirmaSenha').value) {
      this.step1Form.get('confirmaSenha').setErrors(null);
    } else {
      this.step1Form.get('confirmaSenha').setErrors({ mismatch: true });      
    }
  }
}
