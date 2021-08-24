import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cartao } from 'src/app/shared/models/cartao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

  private storage;
  public dadosCliente: Cliente;
  public perfilForm: FormGroup;
  public cardAtivo = 1;
  public bandeiras = {
    mastercard: 'Master Card',
    visa: 'Visa',
    diners: 'DinersClub',
    amex: 'American Express',
    discover: "Discover",
    hipercard: 'Hipercard',
    elo: 'Elo',
    novo: 'Novo Cartão'
  }

  constructor(private formBuilder: FormBuilder) {
    this.storage = window.localStorage;
   }

  ngOnInit(): void {
    let cliente = JSON.parse(this.storage.getItem('cliente'));
    
    this.perfilForm = this.formBuilder.group({
      nome: [cliente.nome ?? '', Validators.required],
      cpf: [cliente.cpf],
      email: [cliente.email],
      telefone: [cliente.telefone ?? '', Validators.required],
      tipoTelefone: [cliente.tipoTelefone ?? '', Validators.required],
      sexo: [cliente.sexo ?? '0', Validators.required],
      nascimento: [cliente.nascimento ?? '', Validators.required]
    });
    this.dadosCliente = cliente;    
    this.verificaCliente();
  }

  verificaCliente(){
    if(!this.dadosCliente.cartao){
      this.dadosCliente.cartao = [];
    }
  }

  aplicaCssErro(field, form){
    let touched = this[form].get(field).touched;      
    let isValid = touched ? ( this[form].get(field).valid ? 'is-valid' : 'is-invalid' ) : '';
    
    return field ? isValid : '';
  }

  addEndereco(){
    let index = this.dadosCliente.endereco.length;
    this.dadosCliente.endereco.push(new Endereco(index, 'Novo Endereço', 'Brasil'));
  }

  onEnderecoDeleted(id: number) {
    console.log(id);
    console.log(this.dadosCliente.endereco)

    let indexEnd = this.dadosCliente.endereco.findIndex(e => e.id == id);
    this.dadosCliente.endereco.splice(indexEnd, 1);
  }

  onEnderecoAlterado(dados: Endereco) {
    let indexEnd = this.dadosCliente.endereco.findIndex(e => e.id == dados.id); 
    this.dadosCliente.endereco[indexEnd] = dados;

    this.updateStorage();
  }

  /** PERFIL */
  onSubmitPerfil(){
    if(this.perfilForm.valid){
      this.dadosCliente.nome = this.perfilForm.get('nome').value;
      this.dadosCliente.sexo = this.perfilForm.get('sexo').value;
      this.dadosCliente.telefone = this.perfilForm.get('telefone').value;
      this.dadosCliente.tipoTelefone = this.perfilForm.get('tipoTelefone').value;
      this.dadosCliente.nascimento = this.perfilForm.get('nascimento').value;
      
      this.updateStorage();
    }
  }

  /** SENHA */
  onAlteraSenha(event){
    if(event){
      this.dadosCliente.senha = event.controls['senhaNova'].value;
      
      this.updateStorage();
    }
  }

  /** CARTÃO */
  addCartao(){
    if(!this.dadosCliente.cartao){
      this.dadosCliente.cartao = [];      
    }
    console.log(this.dadosCliente.cartao)

    let index = this.dadosCliente.cartao.length;
    this.dadosCliente.cartao.push(new Cartao(index, null, null, null, 'novo', null));    
  }

  onCartaoDeleted(cartaoId){
    let cartao = this.dadosCliente.cartao.findIndex(c => c.id == cartaoId);
    this.dadosCliente.cartao.splice(cartao, 1);
    
    this.updateStorage();
  }
  
  onCartaoAlterado(cartaoAlterado){
    let idxCartao = this.dadosCliente.cartao.findIndex(c => c.id == cartaoAlterado.id);    
    this.dadosCliente.cartao[idxCartao] = cartaoAlterado;
    
    this.updateStorage();
  }

  /** STORAGE */
  updateStorage(){
    this.storage.setItem('cliente', JSON.stringify(this.dadosCliente));
  }

}
