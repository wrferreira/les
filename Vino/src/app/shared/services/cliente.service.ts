import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = environment.baseUrl;
  
  constructor(
    private http: HttpClient
  ) { }
  
  getViaCep(cep: String) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }


  //CLIENTE
  getCliente(clienteId: number){
    return this.http.get(this.baseUrl + `/cliente/${clienteId}`)
  }
  setCliente(cliente){
    return this.http.post(this.baseUrl + '/cliente', cliente);
  }
  updateCliente(clienteId, cliente){
    return this.http.put(this.baseUrl + `/cliente/${clienteId}`, cliente)
  }
  
  //ENDEREÇO
  getEndereco(clienteId: number){
    return this.http.get(this.baseUrl + `/cliente/${clienteId}/endereco`)
  }
  setEndereco(clienteId: number, endereco){    
    delete endereco.id;
    delete endereco.clienteId;
    
    console.log(clienteId)
    console.log(endereco)
    return this.http.post(this.baseUrl + `/cliente/${clienteId}/endereco`, endereco);
  }
  updateEndereco(endereco, enderecoId){
    return this.http.put(this.baseUrl + `/cliente/endereco/${enderecoId}`, endereco)
  }
  deleteEndereco(enderecoId){
    return this.http.delete(this.baseUrl + `/cliente/endereco/${enderecoId}`)
  }

  //CARTÃO
  cadastrarCartao(clienteId: number){
    return this.http.get(this.baseUrl + `/cliente/${clienteId}/cartao`)
  }
  
  //SENHA
  setSenha(clienteId, senhaAtual, novaSenha){
    return this.http.post(this.baseUrl + `/cliente/${clienteId}/alterar-senha`, { senha: senhaAtual, novaSenha: novaSenha });
  }  
}
