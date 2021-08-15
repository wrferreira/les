import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ClienteComponent implements OnInit {

  public step1Form: FormGroup;

  public countryList: Array<String> = [
  "África do Sul",
  "Albânia",
  "Alemanha",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua",
  "Arábia Saudita",
  "Argentina",
  "Armênia",
  "Aruba",
  "Austrália",
  "Áustria",
  "Azerbaijão",
  "Bahamas",
  "Bahrein",
  "Bangladesh",
  "Barbados",
  "Bélgica",
  "Benin",
  "Bermudas",
  "Botsuana",
  "Brasil",
  "Brunei",
  "Bulgária",
  "Burkina Fasso",
  "Butão",
  "Cabo Verde",
  "Camarões",
  "Camboja",
  "Canadá",
  "Cazaquistão",
  "Chade",
  "Chile",
  "China",
  "Cidade do Vaticano",
  "Colômbia",
  "Congo",
  "Coréia do Sul",
  "Costa do Marfim",
  "Costa Rica",
  "Croácia",
  "Dinamarca",
  "Djibuti",
  "Dominica",
  "EUA",
  "Egito",
  "El Salvador",
  "Emirados Árabes",
  "Equador",
  "Eritréia",
  "Escócia",
  "Eslováquia",
  "Eslovênia",
  "Espanha",
  "Estônia",
  "Etiópia",
  "Fiji",
  "Filipinas",
  "Finlândia",
  "França",
  "Gabão",
  "Gâmbia",
  "Gana",
  "Geórgia",
  "Gibraltar",
  "Granada",
  "Grécia",
  "Guadalupe",
  "Guam",
  "Guatemala",
  "Guiana",
  "Guiana Francesa",
  "Guiné-bissau",
  "Haiti",
  "Holanda",
  "Honduras",
  "Hong Kong",
  "Hungria",
  "Iêmen",
  "Ilhas Cayman",
  "Ilhas Cook",
  "Ilhas Curaçao",
  "Ilhas Marshall",
  "Ilhas Turks & Caicos",
  "Ilhas Virgens (brit.)",
  "Ilhas Virgens(amer.)",
  "Ilhas Wallis e Futuna",
  "Índia",
  "Indonésia",
  "Inglaterra",
  "Irlanda",
  "Islândia",
  "Israel",
  "Itália",
  "Jamaica",
  "Japão",
  "Jordânia",
  "Kuwait",
  "Latvia",
  "Líbano",
  "Liechtenstein",
  "Lituânia",
  "Luxemburgo",
  "Macau",
  "Macedônia",
  "Madagascar",
  "Malásia",
  "Malaui",
  "Mali",
  "Malta",
  "Marrocos",
  "Martinica",
  "Mauritânia",
  "Mauritius",
  "México",
  "Moldova",
  "Mônaco",
  "Montserrat",
  "Nepal",
  "Nicarágua",
  "Niger",
  "Nigéria",
  "Noruega",
  "Nova Caledônia",
  "Nova Zelândia",
  "Omã",
  "Palau",
  "Panamá",
  "Papua-nova Guiné",
  "Paquistão",
  "Peru",
  "Polinésia Francesa",
  "Polônia",
  "Porto Rico",
  "Portugal",
  "Qatar",
  "Quênia",
  "Rep. Dominicana",
  "Rep. Tcheca",
  "Reunion",
  "Romênia",
  "Ruanda",
  "Rússia",
  "Saipan",
  "Samoa Americana",
  "Senegal",
  "Serra Leone",
  "Seychelles",
  "Singapura",
  "Síria",
  "Sri Lanka",
  "St. Kitts & Nevis",
  "St. Lúcia",
  "St. Vincent",
  "Sudão",
  "Suécia",
  "Suiça",
  "Suriname",
  "Tailândia",
  "Taiwan",
  "Tanzânia",
  "Togo",
  "Trinidad & Tobago",
  "Tunísia",
  "Turquia",
  "Ucrânia",
  "Uganda",
  "Uruguai",
  "Venezuela",
  "Vietnã",
  "Zaire",
  "Zâmbia",
  "Zimbábue"];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.step1Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmaSenha: ['', Validators.required]
    })
  }

  verificaValidTouched(field){
    if(this.step1Form.get(field).touched){
      return this.step1Form.get(field).valid ? 'is-valid' : 'is-invalid';      
    }
    return '';
  }

  aplicaCssErro(field){
    return this.verificaValidTouched(field);
  }

  verificarErro(field){
    const listErros = this.step1Form.get(field).errors;
    if(listErros){
      if(listErros['required']){
        return listErros['required'] ? 'Senha obrigatória' : '';
      }
      if(listErros['pattern']){
        return listErros['pattern'] ? 'Senha inválida' : '';
      }
    }
  }

  onPasswordChange() {
    if (this.step1Form.get('senha').value === this.step1Form.get('confirmaSenha').value) {
      this.step1Form.get('confirmaSenha').setErrors(null);
    } else {
      this.step1Form.get('confirmaSenha').setErrors({ mismatch: true });      
    }
  }
}
