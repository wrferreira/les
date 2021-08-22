import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {

  @Output() alteraSenha = new EventEmitter();
  alterarSenhaForm: FormGroup;
  private storage;
  public senha;

  constructor(
    private formBuilder: FormBuilder,
    ) {
      this.storage = window.localStorage;
      this.senha = JSON.parse(this.storage.getItem('cliente'))?.senha;
    }

  ngOnInit(): void {
    this.alterarSenhaForm = this.formBuilder.group({
      atual: ['', Validators.required],
      senhaNova: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmaSenha: ['', Validators.required]
    });
  }

  aplicaCssErro(field, form){
    let touched = this[form].get(field).touched;
    let isValid;

    if(field != 'confirmaSenha'){
      isValid = touched ? ( this[form].get(field).valid && this.verifyAtual() ? 'is-valid' : 'is-invalid' ) : '';
    }else{
      isValid = touched ? ( this[form].get(field).valid && this.verifyConfirma() ? 'is-valid' : 'is-invalid' ) : '';
    }

    return field ? isValid : '';
  }

  verificarErro(field){    
    const listErros = this.alterarSenhaForm.get(field).errors;
    if(listErros){
      if(listErros['required']){
        return listErros['required'] ? 'Senha obrigatória' : '';
      }
      if(listErros['pattern']){
        return listErros['pattern'] ? 'Senha inválida' : '';
      }
    }
  }
  verifyAtual(){
    let atual = this.alterarSenhaForm.get('atual').value;
    return atual == this.senha ? true : false;
  }

  verifyConfirma(){
    let nova = this.alterarSenhaForm.get('senhaNova').value;
    let confirma = this.alterarSenhaForm.get('confirmaSenha').value;

    return nova == confirma ? true : false;
  }

  submit(){
    this.alteraSenha.emit(this.alterarSenhaForm);
  }
}
