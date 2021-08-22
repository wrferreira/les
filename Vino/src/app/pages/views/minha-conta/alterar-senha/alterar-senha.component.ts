import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {

  alterarSenhaForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.alterarSenhaForm = this.formBuilder.group({
      atual: ['', Validators.required],
      senhaNova: ['', Validators.required],
      confirmaSenha: ['', Validators.required]
    });
  }

}
