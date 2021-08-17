import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Router } from '@angular/router';

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
  public loadData:FormGroup;
  public enderecoValid: boolean;
  public resetEndereco = 0;
  public listaEnderecos = [];
  public cliente: Cliente;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router    
  ) {
    this.cliente = new Cliente();
    this.cliente.endereco = []
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
      tipoTelefone: ['0', Validators.required],
      telefone: ['', Validators.required],
      sexo: ['0', Validators.required]
    });
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
    if(event.valid){
      this.endereco = event;
    }
    this.enderecoValid = event.valid ? false : true;
  }

  addEndereco(){
    this.resetEndereco += 1;

    if(this.endereco?.valid){
      if(this.endereco.get('id').value){        
        //Alterar
        let idx = this.listaEnderecos.findIndex(lista => lista.id == this.endereco.get('id').value)
        this.listaEnderecos[idx] = this.endereco.value;
      }else{
        //Novo
        const newId = this.listaEnderecos.length + 1;
        this.endereco.patchValue({id: newId});
        this.listaEnderecos.push(this.endereco.value);
      } 
    }
  }

  editEndereco(enderecoIdx){
    this.resetEndereco = -1;
    this.loadData = this.listaEnderecos[enderecoIdx];    
  }

  removeEndereco(enderecoIdx){
    this.listaEnderecos.splice(enderecoIdx, 1);
  }

  loadDadosCliente(){
    this.cliente.nome = this.dadosForm.get('nome').value;
    this.cliente.cpf = this.dadosForm.get('cpf').value;
    this.cliente.tipoTelefone = this.dadosForm.get('tipoTelefone').value;
    this.cliente.telefone = this.dadosForm.get('telefone').value;
    this.cliente.sexo = this.dadosForm.get('sexo').value;
    
    this.cliente.email = this.cadastroForm.get('email').value;
    this.cliente.senha = this.cadastroForm.get('senha').value;
    this.cliente.confirmaSenha = this.cadastroForm.get('confirmaSenha').value;

    if(!this.listaEnderecos.length){
      this.cliente.endereco[0] = this.endereco.value;
    }else{
      this.cliente.endereco = this.listaEnderecos;
    }
  }

  onSubmit(){
    this.loadDadosCliente();
    this.route.navigate(['/home/signin'], { state: this.cliente });
  }
}
