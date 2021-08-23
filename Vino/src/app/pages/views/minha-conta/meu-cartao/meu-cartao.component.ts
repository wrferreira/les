import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meu-cartao',
  templateUrl: './meu-cartao.component.html',
  styleUrls: ['./meu-cartao.component.scss']
})
export class MeuCartaoComponent implements OnInit {

  @Input('cartao') cartao;
  @Output() deleteEvent = new EventEmitter();
  @Output() alterarEvent = new EventEmitter();

  public meuCartaoForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.cartao)

    this.meuCartaoForm = this.formBuilder.group({
      id: [this.cartao.id ?? ''],
      bandeira: [this.cartao.bandeira ?? '', Validators.required],
      titular: [this.cartao.titular ?? '', Validators.required],
      numero: [this.cartao.numero ?? '', Validators.required],
      cvv: [this.cartao.cvv ?? '', Validators.required],
      dataValidade: [this.cartao.dataValidade ?? '', Validators.required],
    });
  }

  aplicaCssErro(field, form){
    let touched = this[form].get(field).touched;      
    let isValid = touched ? ( this[form].get(field).valid ? 'is-valid' : 'is-invalid' ) : '';
    
    return field ? isValid : '';
  }

  onDelete(){    
    this.deleteEvent.emit(this.meuCartaoForm.controls['id'].value);
  }

  onSubmit(){
    console.log(this.meuCartaoForm.value)
    let numero = this.meuCartaoForm.get('numero').value;
    this.meuCartaoForm.get('bandeira').setValue(this.getCardFlag(numero));

    this.alterarEvent.emit(this.meuCartaoForm.value);
  }

  getCardFlag(cardnumber){    
    cardnumber.replace(/[^0-9]+/g, '');

    let cards = {
        visa      : /^4[0-9]{12}(?:[0-9]{3})/,
        mastercard : /^5[1-5][0-9]{14}/,
        diners    : /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
        amex      : /^3[47][0-9]{13}/,
        discover  : /^6(?:011|5[0-9]{2})[0-9]{12}/,
        hipercard  : /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
        elo        : /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
        jcb        : /^(?:2131|1800|35\d{3})\d{11}/,       
        aura      : /^(5078\d{2})(\d{2})(\d{11})$/     
    };

    for (var flag in cards) {
        if(cards[flag].test(cardnumber)) {
            return flag;
        }
    }

    return false;
  }
}