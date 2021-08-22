import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meu-cartao',
  templateUrl: './meu-cartao.component.html',
  styleUrls: ['./meu-cartao.component.scss']
})
export class MeuCartaoComponent implements OnInit {

  @Input('cartao') cartao; 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.cartaoForm = this.formBuilder.group({
    //   titular: ['', [Validators.required, Validators.name]],
    //   numero: ['', [Validators.required]],
    //   cvv: ['', Validators.maxLength(4), Validators.minLength(3)]
    // });
  }

  // aplicaCssErro(field){  
  //   let touched = this.cartaoForm.get(field).touched;
  //   let isValid = touched ? this.cartaoForm.get(field).valid ? 'is-valid' : 'is-invalid' : '';
  //   return field ? isValid : '';
  // }

}
