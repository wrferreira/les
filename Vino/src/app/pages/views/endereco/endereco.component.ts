import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { countryList } from 'src/app/shared/models/country.model';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Output() dadosEndereco = new EventEmitter();
  @Input() dadosEntrada;
  public enderecoForm: FormGroup;
  public countryList: Array<String>;
  
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { }


  ngOnInit(): void {
    this.countryList = countryList;

    this.enderecoForm = this.formBuilder.group({
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      endereco: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      pais: ['Brasil', Validators.required],

    });
  }

  onCEPChange() {
    let cep = this.enderecoForm.get('cep');
    console.log(cep.errors);
    if(cep.valid) {
      this.clienteService.getViaCep(cep.value.toString().replace('-','')).subscribe((dados) => {
        this.enderecoForm.get('endereco').setValue(dados['logradouro']);
        this.enderecoForm.get('cidade').setValue(dados['localidade']);
        this.enderecoForm.get('bairro').setValue(dados['bairro']);
        this.enderecoForm.get('complemento').setValue(dados['complemento']);
        this.enderecoForm.get('uf').setValue(dados['uf']);
      });
    }
  }

  onEmit(){
    this.dadosEndereco.emit(this.enderecoForm);
  }
  
}
