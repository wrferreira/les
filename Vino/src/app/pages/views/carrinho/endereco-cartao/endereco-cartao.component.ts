import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cartao } from 'src/app/shared/models/cartao.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { CarrinhoService } from '../carrinho.service';
import { CartaoComponent } from '../dialogs/cartao/cartao.component';
import { EnderecoComponent } from '../dialogs/endereco/endereco.component';

@Component({
  selector: 'app-endereco-cartao',
  templateUrl: './endereco-cartao.component.html',
  styleUrls: ['./endereco-cartao.component.scss']
})
export class EnderecoCartaoComponent implements OnInit {
  
  public formEndereco: FormGroup;
  public formCartao: FormGroup;   
  
  public enderecoTroca;
  public cartaoTroca;

  public carrinho = {
    valorTotal: 0,
    valorCompras: 0,
    valorFrete: 0,
    cupomDesconto: 0,
    listaFrete: [],
    infoCupom: '',
    cupom: '',
    listaCompras: [],
    enderecos: [],
    enderecoEntrega: new Endereco(),
    cartoes: [],
    cartaoPagamento: new Cartao()
  }

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.getCliente();
    this.loadEndereco();    
    this.loadCarrinho();
  }

  loadCarrinho(){
    this.carrinhoService.getLista().subscribe( ret => {
      this.carrinho = ret;
    });
  }

  getCliente(){
    /**
     * Carrega Cliente do BD
     */
    console.log('get cliente')
    if(this.carrinho.enderecos.length){
      this.carrinho.enderecos.push(new Endereco(1, "Casa", "Brasil", "Rua São Jose", "01001000", "444", "Casa azul", "Centro", "São Paulo", "SP", "entrega", 22))
      this.carrinho.enderecos.push(new Endereco(2, "Apartamento", "Brasil", "Rua Criciuma", "07500000", "45644", "Casa de praia", "Jaguari", "Cruzeiro", "SP", "cobranca", 7))      
      this.setEnderecoEntrega();
    }else{      
      this.carrinho.enderecoEntrega = new Endereco();
    }
  }

  setEnderecoEntrega(){    
    if(this.carrinho.enderecoEntrega.id == undefined){
      let entrega = this.carrinho.enderecos.filter(end => end.tipoEndereco == 'entrega')[0];
      this.carrinho.enderecoEntrega = entrega ? entrega : this.carrinho.enderecos[0];
    }
  }

  setCartaoPagamento(){    
    if(this.carrinho.cartaoPagamento.id == undefined){      
      this.carrinho.cartaoPagamento = this.carrinho.cartoes[0];
    }
  }
  
  loadEndereco(){
    this.formEndereco = this.formBuilder.group({
      id: [this.carrinho.enderecoEntrega.id ?? ''],
      cep: [this.carrinho.enderecoEntrega.cep ?? '', [Validators.required]],
      numero: [this.carrinho.enderecoEntrega.numero ?? '', Validators.required],
      logradouro: [this.carrinho.enderecoEntrega.logradouro ?? '', Validators.required],
      complemento: [this.carrinho.enderecoEntrega.complemento ?? ''],
      bairro: [this.carrinho.enderecoEntrega.bairro ?? '', Validators.required],
      cidade: [this.carrinho.enderecoEntrega.cidade ?? '', Validators.required],
      uf: [this.carrinho.enderecoEntrega.uf ?? '', Validators.required],
      pais: ['Brasil', Validators.required],
      descricaoEndereco: [this.carrinho.enderecoEntrega.descricaoEndereco ?? '', Validators.required],
      tipoEndereco: [this.carrinho.enderecoEntrega.tipoEndereco ?? '', Validators.required]
    });
  }

  loadCartao(){
    this.formCartao = this.formBuilder.group({
      id: [this.carrinho.cartaoPagamento.id ?? ''],
      bandeira: [this.carrinho.cartaoPagamento.bandeira ?? '', Validators.required],
      titular: [this.carrinho.cartaoPagamento.titular ?? '', Validators.required],
      numero: [this.carrinho.cartaoPagamento.numero ?? '', Validators.required],
      cvv: [this.carrinho.cartaoPagamento.cvv ?? '', Validators.required],
      dataValidade: [this.carrinho.cartaoPagamento.dataValidade ?? '', Validators.required]
    });
  }

  showModalEndereco(tipo: boolean){    
    let modalRef = this.modalService.open(EnderecoComponent);
    modalRef.componentInstance.endereco = tipo ? this.carrinho.enderecoEntrega : new Endereco();

    modalRef.result.then(result => {
      if(tipo){
        this.carrinho.enderecoEntrega = result;
        this.carrinho.enderecos[this.carrinho.enderecos.findIndex( e => e.id == result.id)] = result;
      }else{
        result.id = this.carrinho.enderecos.length + 1;
        this.carrinho.enderecos.push(result)
        this.setEnderecoEntrega();
      }
    });
  }

  showModalCartao(tipo: boolean){
    let modalRef = this.modalService.open(CartaoComponent);
    modalRef.componentInstance.cartao = tipo ? this.carrinho.cartaoPagamento : new Cartao();

    modalRef.result.then(result => {
      if(tipo){
        this.carrinho.cartaoPagamento = result;
        this.carrinho.cartoes[this.carrinho.cartoes.findIndex( c => c.id == result.id)] = result;
      }else{
        result.id = this.carrinho.cartoes.length + 1;
        this.carrinho.cartoes.push(result)
        this.setCartaoPagamento();
      }
    });
  }

  showModalTroca(modal){
    this.modalService.open(modal);
  }

  setTrocaEndereco(){
    this.modalService.dismissAll();
    let idx = this.carrinho.enderecos.findIndex( e => e.id == this.enderecoTroca);
    this.carrinho.enderecoEntrega = this.carrinho.enderecos[idx];    
  }

  setTrocaCartao(){
    this.modalService.dismissAll();
    let idx = this.carrinho.cartoes.findIndex( c => c.id == this.cartaoTroca);
    this.carrinho.cartaoPagamento = this.carrinho.cartoes[idx];
  }

  setCarrinho(){
    this.carrinhoService.setLista(this.carrinho);
  }
}