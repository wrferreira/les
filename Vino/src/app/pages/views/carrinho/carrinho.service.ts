import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  public listaCompras = new BehaviorSubject<any>('');
  public autenticado = new BehaviorSubject<any>('');
  constructor() { }

  getLista(){
    return this.listaCompras.asObservable();
  }
  setLista(lista){
    this.listaCompras.next(lista);
  }

  setAutenticado(cliente: boolean){
    this.autenticado.next(cliente);
  }
  getAutenticado(){
    return this.autenticado.asObservable();
  }
}
