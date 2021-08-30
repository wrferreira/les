import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialog } from 'src/app/shared/dialogs/aviso/aviso-dialog';
import { ConfirmacaoDialog } from 'src/app/shared/dialogs/confirm/confirmacao-dialog';
import { Cartao } from 'src/app/shared/models/cartao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

  private storage;
  public dadosCliente: Cliente = new Cliente();
  public perfilForm: FormGroup;  
  public cardAtivo = 1;
  public showLoad: boolean;
  public clienteId: number;
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

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private clienteService: ClienteService
    ) {
      this.storage = window.localStorage;
      this.clienteId = JSON.parse(this.storage.getItem('clienteId'));
    }

  ngOnInit(): void {
    this.showLoad = true;
    this.getCliente();  
    this.getEndereco();
  }

  getCliente(){
    this.clienteService.getCliente(this.clienteId).subscribe( (result:any) => {
      this.carregaObjCliente(result.cliente);
      console.log(result.cliente)
    });
  }
  getEndereco(){
    this.clienteService.getEndereco(this.clienteId).subscribe( (result:any) => {
      this.dadosCliente.endereco = result.endereco;
    });
  }

  carregaForm(){
    this.perfilForm = this.formBuilder.group({
      nome: [this.dadosCliente.nome ?? '', Validators.required],
      cpf: [this.dadosCliente.cpf],
      email: [this.dadosCliente.email],
      telefone: [this.dadosCliente.telefone ?? '', Validators.required],
      tipoTelefone: [this.dadosCliente.tipoTelefone ?? '', Validators.required],
      sexo: [this.dadosCliente.sexo ?? '0', Validators.required],
      dataNasc: [this.dadosCliente.dataNasc ?? '', Validators.required]
    });
    this.showLoad = false;
    this.verificaCliente();
  }

  carregaObjCliente(dados){
    this.dadosCliente.nome = dados.nome;
    this.dadosCliente.dataNasc = dados.dataNasc;
    this.dadosCliente.cpf = dados.cpf;
    this.dadosCliente.tipoTelefone = dados.tipoTelefone;
    this.dadosCliente.telefone = dados.telefone;
    this.dadosCliente.sexo = dados.sexo;
    this.dadosCliente.email = dados.email;
    this.dadosCliente.senha = dados.senha;

    this.carregaForm();      
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
  
  /** PERFIL */
  onSubmitPerfil(){
    if(this.perfilForm.valid){      
      this.clienteService.updateCliente(this.clienteId, this.perfilForm.value).subscribe( result => {
        this.showModalSucesso('Atenção', 'Cadastrado alterado com sucesso!');
      })
    }
  }

  showModalSucesso(title, message){
    this.dialog.open(AvisoDialog,{
      data: {
        title: title,
        message: message
      }
    });
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
    this.showModalSucesso('Atenção', 'Cartão alterado com sucesso!');
  }

  /** STORAGE */
  updateStorage(){     
    this.storage.setItem('cliente', JSON.stringify(this.dadosCliente));
  }

  /** ENDEREÇO */
  onEnderecoDeleted(id: number) {    
    let indexEnd = this.dadosCliente.endereco.findIndex(e => e.id == id);
    this.dadosCliente.endereco.splice(indexEnd, 1);      
  }
}
