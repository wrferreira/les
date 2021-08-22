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

  // verifyValidade(){
  //   let atual = this.meuCartaoForm.get('validade').value;

  //   return atual == this.senha ? true : false;
  // }

  onDelete(){    
    this.deleteEvent.emit(this.meuCartaoForm.controls['id'].value);
  }

  onAltera(){
    console.log(this.meuCartaoForm.value)
    this.alterarEvent.emit(this.meuCartaoForm.value);
  }
}