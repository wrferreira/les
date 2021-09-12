import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cartao } from 'src/app/shared/models/cartao.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { EnderecoComponent } from '../dialogs/endereco/endereco.component';

@Component({
  selector: 'app-endereco-cartao',
  templateUrl: './endereco-cartao.component.html',
  styleUrls: ['./endereco-cartao.component.scss']
})
export class EnderecoCartaoComponent implements OnInit {

  public hasEndereco = true;
  public hasCartao = true;
  
  public formEndereco: FormGroup;
  public formCartao: FormGroup;
  
  public cartao: Cartao;
  public endereco: Endereco;
  public endereco2: Endereco;
  public enderecos: Endereco[] = [];
  
  public carrinho = {
    valorTotal: 0,
    valorCompras: 0,
    valorFrete: 0,
    cupomDesconto: 0,
    listaFrete: [],
    infoCupom: '',
    cupom: '',
    listaCompras: [],
    enderecos: []
  }

  constructor(    
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCliente();
    this.loadEndereco();
  }

  getCliente(){
    if(this.hasEndereco){
      this.endereco = new Endereco(12, "Casa", "Brasil", "Rua São Jose", "01001000", "444", "Casa azul", "Centro", "São Paulo", "SP", "entrega", 22);
      this.endereco2 = new Endereco(15, "Apartamento", "Brasil", "Rua Criciuma", "07500000", "45644", "Casa de praia", "Jaguari", "Cruzeiro", "SP", "cobranca", 7);
      this.enderecos.push(this.endereco)
      this.enderecos.push(this.endereco2)
    }else{
      this.endereco = new Endereco();
    }
  }

  loadEndereco(){
    this.formEndereco = this.formBuilder.group({
      id: [this.endereco.id ?? ''],
      cep: [this.endereco.cep ?? '', [Validators.required]],
      numero: [this.endereco.numero ?? '', Validators.required],
      logradouro: [this.endereco.logradouro ?? '', Validators.required],
      complemento: [this.endereco.complemento ?? ''],
      bairro: [this.endereco.bairro ?? '', Validators.required],
      cidade: [this.endereco.cidade ?? '', Validators.required],
      uf: [this.endereco.uf ?? '', Validators.required],
      pais: ['Brasil', Validators.required],
      descricaoEndereco: [this.endereco.descricaoEndereco ?? '', Validators.required],
      tipoEndereco: [this.endereco.tipoEndereco ?? '', Validators.required]
    });
  }

  loadCartao(){
    this.formCartao = this.formBuilder.group({
      id: [this.cartao.id ?? ''],
      bandeira: [this.cartao.bandeira ?? '', Validators.required],
      titular: [this.cartao.titular ?? '', Validators.required],
      numero: [this.cartao.numero ?? '', Validators.required],
      cvv: [this.cartao.cvv ?? '', Validators.required],
      dataValidade: [this.cartao.dataValidade ?? '', Validators.required]
    });
  }

  showModalEndereco(tipo: boolean){
    let modalRef = this.modalService.open(EnderecoComponent);
    modalRef.componentInstance.endereco = tipo ? this.endereco : new Endereco();

    modalRef.result.then(result => {
      console.log(result);
      this.enderecos.push(result)
    });
  }

  showModalTroca(modal){
    this.modalService.open(modal);
  }
  
  setEndereco(){
    this.modalService.dismissAll();
    this.hasEndereco = true;
    
    /**
     * TODO: Salvar endereço
    */
  }

  setCartao(){
    this.modalService.dismissAll();
    this.hasCartao = true;
    
    /**
     * TODO: Salvar cartao
    */
  }

}