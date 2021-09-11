import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carrinho } from 'src/app/shared/models/carrinho.model';
import { SandBoxService } from 'src/app/shared/services/carrinho.service';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {
  
  public carrinho = {
    valorTotal: 0,
    valorCompras: 0,
    valorFrete: 0,
    cupomDesconto: 0,
    listaFrete: [],
    infoCupom: ''
  }
  public carrinhoForm: FormGroup;
  public cupomForm: FormGroup;
  //public listaCarrinho: Carrinho[] = [];

  public listaCarrinho: Carrinho[] = [
    {
      id: 1,
      codigo: '38783781',
      titulo: 'Cruz Del Sur Malbec', 
      imagem: 'https://statics.divvino.com.br/divvino/files/3764064/3764064_1_large.jpg', 
      precoDe: 32.90,
      precoPor: 21.51,
      quantidadeML: 750,
      tempoGuarda: '3',
      classificacao: 'Meio seco',
      tipo: 'Tinto',
      teorAlcolico: 12.50,
      paisCodigo: 'ar',
      pais: 'Argentina',
      descricao: 'Cor uma coloração extremamente avermelhada que lembra rubi, é encantador com aromas de morango e ervas frescas. Já no paladar, possui tanino presentes e macios. Ideal para um agradável encontro entre amigos no final da tarde.',
      qtd: 1
    },
    {
      id: 2,
      codigo: '38783781',
      titulo: 'El Bravo', 
      imagem: 'https://statics.divvino.com.br/divvino/files/3585850/3585850_1%20(1)_large.jpg', 
      precoDe: 49.90,
      precoPor: 26.51,
      quantidadeML: 750,
      tempoGuarda: '3',
      classificacao: 'Seco',
      tipo: 'Tinto',
      teorAlcolico: 12.50,
      paisCodigo: 'es',
      pais: 'Espanha',
      descricao: 'De consumo jovem, este Espanhol é elaborado a partir da uva Tempranillo, cultivada na região de Valência e sem passagem em barrica de carvalho, o que faz dele um vinho equilibrado, de paladar leve com taninos suaves. Apresenta o tom rubi médio e brilhante. O aroma frutado fica por conta das frutas vermelhas frescas, com notas florais. Harmoniza com pizzas variadas e lasanha à bolonhesa. É um vinho que vai combinar perfeitamente com aquela noite de pizzas em casa com os amigos!',
      qtd: 1
    },
    {
      id: 3,
      codigo: '38783781',
      titulo: 'Fonte da Serrana Tinto', 
      imagem: 'https://statics.divvino.com.br/divvino/files/3866805/3866805_1_large.jpg', 
      precoDe: 59.90,
      precoPor: 44.91,
      quantidadeML: 750,
      tempoGuarda: '4',
      classificacao: 'Seco',
      tipo: 'Tinto',
      teorAlcolico: 13.50,
      paisCodigo: 'pt',
      pais: 'Portugal',
      descricao: 'Fonte da Serrana é um vinho Português viniculado na região de Alentejo, local onde é realizado o assemblage das uvas Aragonês e Trincadeira que dão forma e cor para este exemplar. Possui uma cor vermelha e brilhante com tons violáceos, acompanhada de um aroma de frutas vermelhas, flores e especiarias. Enquanto o seu paladar entrega taninos que são delicados e macios. Harmoniza perfeitamente com carnes vermelhas assadas.',
      qtd: 2
    },
    {
      id: 4,
      codigo: '38783781',
      titulo: 'Cruz Del Sur Malbec', 
      imagem: 'https://statics.divvino.com.br/divvino/files/3764064/3764064_1_large.jpg', 
      precoDe: 32.90,
      precoPor: 21.51,
      quantidadeML: 750,
      tempoGuarda: '5',
      classificacao: 'Meio seco',
      tipo: 'Tinto',
      teorAlcolico: 12.50,
      paisCodigo: 'ar',
      pais: 'Argentina',
      descricao: 'Cor uma coloração extremamente avermelhada que lembra rubi, é encantador com aromas de morango e ervas frescas. Já no paladar, possui tanino presentes e macios. Ideal para um agradável encontro entre amigos no final da tarde.',
      qtd: 1
    },
  ];

  constructor(
    private carrinhoService: CarrinhoService,
    private formBuilder: FormBuilder,
    private sandBox: SandBoxService,
  ) { }

  ngOnInit(): void {
    //this.getListaCarrinho();
    this.carrinhoForm = this.formBuilder.group({      
      cep: ['', Validators.required]      
    });

    this.cupomForm = this.formBuilder.group({      
      cupom: ['', Validators.required]
    });
  }

  removeCarrinho(item){
    this.listaCarrinho.splice(this.listaCarrinho.findIndex(i => i.id === item.id), 1);
    this.updateValorCompras();    
  }

  updateQtd(item, valor){
    this.listaCarrinho.filter(i => i.id === item.id)[0].qtd += valor;    
    this.updateValorCompras();
  }

  updateValorCompras(){
    return this.carrinho.valorCompras = this.listaCarrinho.reduce((acc, item) => { return acc + (item.precoPor * item.qtd) }, 0);
  }

  updateValorTotal(){
    return this.carrinho.valorTotal = ((this.carrinho.valorCompras + parseFloat(this.carrinho.valorFrete.toString())) - this.carrinho.cupomDesconto );
  }

  calcularFrete(){
    this.sandBox.calculaFrete(this.carrinhoForm.get('cep').value).subscribe( (res:any) => {
      res.forEach(element => {
        if(element.price){
          if(element.name == ".Com"){
            element.price = element.price - element.discount;
          }
          this.carrinho.listaFrete.push(element)
        }
      });
    });
  }

  validaCupom(){
    /**
     * TODO: Construir a validação de cupom
     */
    let cupom = this.cupomForm.get('cupom').value;
    if(cupom == 'DIADASMAES'){
      this.carrinho.cupomDesconto = 35;
      this.carrinho.infoCupom = 'Cupom incluído com sucesso.'
      this.updateValorCompras();
    }else{
      this.carrinho.infoCupom = 'Cupom inválido.'
    }
  }

  getListaCarrinho(){
    this.carrinhoService.getLista().subscribe( lista => {
      this.listaCarrinho = lista;
      console.log(this.listaCarrinho)
    });
  }
}
