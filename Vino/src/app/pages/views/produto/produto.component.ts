import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  public cards = [
    { title: 'Vinho 1', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 2', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 3', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 4', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 5', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 6', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 1', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 2', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 3', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 4', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 5', text: 'zzzzxzxzxzx' },
    { title: 'Vinho 6', text: 'zzzzxzxzxzx' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
