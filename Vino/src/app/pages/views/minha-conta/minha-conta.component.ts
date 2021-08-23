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

  public listaCartoes: Cartao[] = [
    new Cartao(0, 'ALEXANDRE L CUNHA', '5186 6193 8671 2238', '212', 'mastercard', '01/2022'),
    new Cartao(1, 'JOAO', '5371 6958 9184 6294', '121', 'mastercard', '06/2023'),
  ];
 
  public bandeiras = {
    mastercard: 'Master Card',
    visa: 'Visa',
    novo: 'Novo Cartão'
  }

  constructor(private formBuilder: FormBuilder) {
    this.storage = window.localStorage;
   }

  ngOnInit(): void {
    //let cliente = JSON.parse(this.storage.getItem('cliente'));
    let cliente = {
      confirmaSenha: "AAAaaa@123",
      cpf: "12312312312",
      email: "aaa@gmail.com",
      endereco: [{
      bairro: "Sé",
      cep: "01001000",
      cidade: "São Paulo",
      complemento: "lado ímpar",
      descricaoEndereco: "casa 1",
      logradouro: "Praça da Sé",
      id: 0,
      numero: "21",
      pais: "Brasil",
      tipoEndereco: "cobranca",
      uf: "SP"
      }],
      nome: "João",
      nascimento: '12/05/2000',
      senha: "AAAaaa@123",
      cartao: this.listaCartoes,
      sexo: "M",
      telefone: "21315654655",
      tipoTelefone: "CA"
    }
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
    let endereco = this.dadosCliente.endereco.findIndex(c => c.id == id);
    this.dadosCliente.endereco.splice(endereco, 1);
  }

  onEnderecoAlterado(dados: Endereco) {

  }

  onSubmitPerfil(){
    if(this.perfilForm.valid){
      this.dadosCliente.nome = this.perfilForm.get('nome').value;
      this.dadosCliente.sexo = this.perfilForm.get('sexo').value;
      this.dadosCliente.telefone = this.perfilForm.get('telefone').value;
      this.dadosCliente.tipoTelefone = this.perfilForm.get('tipoTelefone').value;
      this.dadosCliente.nascimento = this.perfilForm.get('nascimento').value;
    }
  }


  /** SENHA */
  onAlteraSenha(event){
    if(event){
      this.dadosCliente.senha = event.controls['senhaNova'].value;      
    }
  }

  /** CARTÃO */
  addCartao(){
    let index = this.dadosCliente.cartao.length;
    this.dadosCliente.cartao.push(new Cartao(index, null, null, null, 'novo', null));
  }

  onCartaoDeleted(cartaoId){
    let cartao = this.dadosCliente.cartao.findIndex(c => c.id == cartaoId);
    this.dadosCliente.cartao.splice(cartao, 1);
  }
  
  onCartaoAlterado(cartaoAlterado){
    let idxCartao = this.dadosCliente.cartao.findIndex(c => c.id == cartaoAlterado.id);    
    this.dadosCliente.cartao[idxCartao] = cartaoAlterado;
  }
}
