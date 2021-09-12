import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-endereco-cartao',
  templateUrl: './endereco-cartao.component.html',
  styleUrls: ['./endereco-cartao.component.scss']
})
export class EnderecoCartaoComponent implements OnInit {

  public endereco = true;
  public cartao = true;

  constructor(    
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  showModal(content){
    this.modalService.open(content);
  }
}
