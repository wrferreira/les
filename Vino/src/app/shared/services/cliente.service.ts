import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
