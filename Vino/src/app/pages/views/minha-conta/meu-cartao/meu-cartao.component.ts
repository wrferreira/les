import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meu-cartao',
  templateUrl: './meu-cartao.component.html',
  styleUrls: ['./meu-cartao.component.scss']
})
export class MeuCartaoComponent implements OnInit {

  @Input('cartao') cartao; 
  public meuCartaoForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.cartao)

    this.meuCartaoForm = this.formBuilder.group({
      titular: [this.cartao.titular ?? '', Validators.required],
      numero: [this.cartao.numero ?? '', Validators.required],
      cvv: [this.cartao.cvv ?? '', Validators.required],
      validade: [this.cartao.validade ?? '', Validators.required],
    });
  }
}
