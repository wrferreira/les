import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Cartao } from 'src/app/shared/models/cartao.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.scss']
})
export class IdentificacaoComponent implements OnInit {
  
  @Input() step: MatHorizontalStepper;

  public loginForm: FormGroup;
  public storage;
  public showLoad: boolean;
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
    cartaoPagamento: new Cartao(),
    clienteId: 0
  }

  constructor(
    private cliente: ClienteService,
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService
  ) { }
  
  ngOnInit(): void {
    this.storage = window.localStorage;

    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'senha': ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });

    this.carrinhoService.getLista().subscribe( ret => {
      this.carrinho = ret;
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.showLoad = true;
      this.cliente.login(this.loginForm.get('email').value, this.loginForm.get('senha').value).subscribe((res: any) => {
        if(res.result) {
          this.storage.setItem('clienteId', JSON.stringify([...res.result.toString()]))
          this.carrinho.clienteId = res.result;
          this.carrinhoService.setLista(this.carrinho);
          this.step.next();
        } else {
          console.log("erro login")
          console.log(res.message);
        }
        this.showLoad = false;
      });
    }
  }
}
